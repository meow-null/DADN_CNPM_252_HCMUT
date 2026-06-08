import { prisma } from "../common/prisma/connect.prisma.js";
import {
  BadRequestException,
  NotfoundException,
  ServiceUnavailableException,
} from "../common/helpers/exception.helper.js";

const NO_MATCHED_MOTOR_MESSAGE = "Không tìm thấy động cơ phù hợp";

const CATALOG_DB_ERROR_MESSAGE =
  "Lỗi truy xuất dữ liệu Catalog. Vui lòng thử lại sau";

const toNumber = (value) => {
  if (value === null || value === undefined || value === "") return null;
  const num = Number(value);
  return Number.isFinite(num) ? num : null;
};

const normalizeMotor = (motor, P_ct, n_sb) => {
  const P_dm_val = toNumber(motor.P_dm) ?? 0;
  const price_val = toNumber(motor.price);
  const mass_val = toNumber(motor.mass_kg);

  // Tính tốc độ đồng bộ (n_dong_bo) dựa trên tốc độ định mức n_dm
  const n_dm = toNumber(motor.n_dm) ?? 0;
  let sync_speed = 750;
  if (n_dm > 1500) sync_speed = 3000;
  else if (n_dm > 1000) sync_speed = 1500;
  else if (n_dm > 750) sync_speed = 1000;

  const delta_n = Math.abs(sync_speed - n_sb);


  return {
    ...motor,
    P_dm_val,
    price_val,
    mass_val,
    delta_n,
    delta_P: P_dm_val - P_ct,
    image_url: null,
  };
};

const sortBySimplePriority = (a, b) => {
  // Ưu tiên 1: Động cơ phải có tốc độ đồng bộ gần với n_sb nhất (delta_n nhỏ nhất)
  if (a.delta_n !== b.delta_n) {
    return a.delta_n - b.delta_n;
  }

  // Ưu tiên 2: Công suất dư thừa (delta_P) càng nhỏ càng tốt
  return a.delta_P - b.delta_P;
};

const projectKinematicsToInputs = (project) => {
  const P_ct = toNumber(project?.Pct);
  const n_sb = toNumber(project?.transmission?.n_sb);

  if (!P_ct || !n_sb) {
    throw new BadRequestException(
      "Dự án chưa có dữ liệu động học hợp lệ. Vui lòng hoàn thành bước tính động học trước khi gợi ý động cơ."
    );
  }

  return { P_ct, n_sb };
};

const buildCandidates = async ({ P_ct, n_sb }) => {
  let availableMotors;

  try {
    availableMotors = await prisma.motors.findMany({
      where: {
        P_dm: { gte: P_ct },
        is_active: true,
        isDeleted: false,
      },
    });
  } catch (error) {
    throw new ServiceUnavailableException(CATALOG_DB_ERROR_MESSAGE);
  }

  if (availableMotors.length === 0) {
    throw new NotfoundException(NO_MATCHED_MOTOR_MESSAGE);
  }

  // Đánh giá tất cả motor, tính delta_n (dựa trên tốc độ đồng bộ) và delta_P
  const candidates = availableMotors.map((motor) => normalizeMotor(motor, P_ct, n_sb));

  if (candidates.length === 0) {
    throw new NotfoundException(NO_MATCHED_MOTOR_MESSAGE);
  }

  candidates.sort(sortBySimplePriority);

  // Lọc CỨNG: Chỉ giữ lại các động cơ thuộc nhóm tốc độ đồng bộ phù hợp nhất (delta_n nhỏ nhất)
  // Các động cơ thuộc nhóm tốc độ khác (bị sai lệch tốc độ) sẽ bị loại bỏ hoàn toàn khỏi danh sách "Xem tất cả"
  const min_delta_n = candidates[0].delta_n;
  const valid_candidates = candidates.filter(motor => motor.delta_n === min_delta_n);

  return valid_candidates.map((motor) => {
    const { P_dm_val, price_val, mass_val, ...rest } = motor;
    return rest;
  });
};

const suggestByProject = async ({ projectId, userId, takeTop3 = true }) => {
  const parsedProjectId = Number(projectId);
  if (!Number.isFinite(parsedProjectId)) {
    throw new BadRequestException("Vui lòng cung cấp projectId hợp lệ");
  }

  const project = await prisma.projects.findFirst({
    where: { id: parsedProjectId, user_id: userId, isDeleted: false },
    select: {
      id: true,
      Pct: true,
      transmission: true,
    },
  });

  if (!project) {
    throw new NotfoundException("Dự án không tồn tại");
  }

  const { P_ct, n_sb } = projectKinematicsToInputs(project);
  const candidates = await buildCandidates({ P_ct, n_sb });

  return {
    projectId: project.id,
    designInputs: { P_ct, n_sb },
    count: takeTop3 ? Math.min(3, candidates.length) : candidates.length,
    motors: takeTop3 ? candidates.slice(0, 3) : candidates,
  };
};

const selectMotorForProject = async ({ projectId, userId, motorId }) => {
  const parsedProjectId = Number(projectId);
  const parsedMotorId = Number(motorId);

  if (!Number.isFinite(parsedProjectId)) {
    throw new BadRequestException("Vui lòng cung cấp projectId hợp lệ");
  }
  if (!Number.isFinite(parsedMotorId)) {
    throw new BadRequestException("Vui lòng cung cấp motorId hợp lệ");
  }

  const [project, motor] = await Promise.all([
    prisma.projects.findFirst({
      where: { id: parsedProjectId, user_id: userId, isDeleted: false },
      select: { id: true, step: true },
    }),
    prisma.motors.findFirst({
      where: { id: parsedMotorId, isDeleted: false, is_active: true },
    }),
  ]);

  if (!project) {
    throw new NotfoundException("Dự án không tồn tại");
  }

  const allowedSteps = ['kinematics', 'motor_selected', 'design_done'];
  if (!allowedSteps.includes(project.step)) {
    throw new BadRequestException(
      "Dự án chưa hoàn thành bước tính động học. Vui lòng thực hiện bước Kinematics trước khi chọn động cơ."
    );
  }

  if (!motor) {
    throw new NotfoundException("Động cơ không tồn tại trong Catalog hiện tại");
  }

  const snapshot = {
    id: motor.id,
    series: motor.series,
    code: motor.code,
    P_dm: motor.P_dm,
    n_dm: motor.n_dm,
    efficiency: motor.efficiency,
    cos_phi: motor.cos_phi,
    t_start_ratio: motor.t_start_ratio,
    t_max_ratio: motor.t_max_ratio,
    mass_kg: motor.mass_kg,
    price: motor.price,
    selectedAt: new Date().toISOString(),
  };

  const updatedProject = await prisma.projects.update({
    where: { id: parsedProjectId },
    data: {
      selected_motor_id: motor.id,
      selected_motor_snapshot: snapshot,
      step: "motor_selected",
      updatedAt: new Date(),
    },
    select: {
      id: true,
      name: true,
      step: true,
      selected_motor_id: true,
      selected_motor_snapshot: true,
      updatedAt: true,
    },
  });

  return updatedProject;
};

export const motorService = {
  suggestByProject,
  selectMotorForProject,
};