import { BadRequestException, NotfoundException, UnprocessableEntityException } from "../common/helpers/exception.helper.js";
import { prisma } from "../common/prisma/connect.prisma.js";
export const projectService = {

  async create(req) {
    const userId = req.user.id;
    const { name, input_P, input_n_ct, input_L } = req.body;
    const errors = [];
    if (!name) errors.push('Vui lòng nhập tên dự án');
    if (!input_P || input_P <= 0) errors.push('Vui lòng nhập công suất dương hợp lệ');
    if (!input_n_ct || input_n_ct <= 0) errors.push('Vui lòng nhập số vòng quay dương hợp lệ');
    if (!input_L || input_L <= 0) errors.push('Vui lòng nhập thời gian phục vụ dương hợp lệ');

    if (errors.length > 0) {
      throw new BadRequestException(errors.join('; ')); 
    }

    const newProject = await prisma.projects.create({
      data: {
        name:       name,
        user_id:    userId,
        input_P:    Number(input_P),
        input_n_ct: Number(input_n_ct),
        input_L:    Number(input_L),
        step:       'inputs',
      },
      select: {
        id:         true,
        name:       true,
        input_P:    true,
        input_n_ct: true,
        input_L:    true,
        step:       true,
      },
    });

    return newProject;
  },

  async findAll(req) {
    const userId = req.user.id;
    const projects = await prisma.projects.findMany({
      where: { user_id: userId, isDeleted: false },
      select: { id: true, name: true, input_P: true, input_n_ct: true, input_L: true, step: true },
      orderBy: { createdAt: 'desc' } 
    });

    return projects;
  },

  async findOne(req) {
    const { projectId } = req.params;
    const userId = req.user.id;

    const project = await prisma.projects.findFirst({
      where: { id: Number(projectId), user_id: userId, isDeleted: false },
      select: { id: true, name: true, input_P: true, input_n_ct: true, input_L: true, step: true },
    });

    if (!project) throw new NotfoundException('Dự án không tồn tại hoặc không thuộc về bạn');
    return project;
  },

  async update(req) {
    const { projectId } = req.params;
    const userId = req.user.id;
    const { name, input_P, input_n_ct, input_L } = req.body;

    const errors = [];
    if (name !== undefined) {
      if (!name || name.trim().length < 3 || name.trim().length > 50)
        errors.push('Tên dự án phải dài từ 3 đến 50 ký tự');
    }
    if (input_P === '') {
      errors.push('Vui lòng nhập Công suất P');
    } else if (input_P !== undefined && input_P !== null) {
      const p = Number(input_P);
      if (p < 0.01 || p > 55) errors.push('Công suất P phải nằm trong khoảng 0.01 kW đến 55.0 kW');
    }
    if (input_n_ct === '') {
      errors.push('Vui lòng nhập Số vòng quay n');
    } else if (input_n_ct !== undefined && input_n_ct !== null) {
      const n = Number(input_n_ct);
      if (n < 1 || n > 1000) errors.push('Số vòng quay n phải nằm trong khoảng 1 đến 1000 v/p');
    }
    if (input_L === '') {
      errors.push('Vui lòng nhập Thời gian phục vụ L');
    } else if (input_L !== undefined && input_L !== null) {
      const l = Number(input_L);
      if (l < 1 || l > 100) errors.push('Thời gian phục vụ L phải nằm trong khoảng 1 đến 100 năm');
    }

    if (errors.length > 0) throw new BadRequestException(errors.join('; '));

    if (name) {
      const existingProject = await prisma.projects.findFirst({
        where: { user_id: userId, name, isDeleted: false, id: { not: Number(projectId) } },
      });
      if (existingProject)
        throw new BadRequestException('Tên dự án đã tồn tại. Vui lòng chọn tên khác.');
    }

    const project = await prisma.projects.findFirst({
      where: { id: Number(projectId), user_id: userId, isDeleted: false },
    });
    if (!project) throw new NotfoundException('Dự án không tồn tại hoặc không thuộc về bạn');

    // So sánh để kiểm tra xem các thông số đầu vào có thay đổi hay không
    const oldP = project.input_P ? Number(project.input_P) : null;
    const newP = input_P !== undefined && input_P !== null && input_P !== '' ? Number(input_P) : null;
    const hasPChanged = input_P !== undefined && newP !== oldP;

    const oldN = project.input_n_ct ? Number(project.input_n_ct) : null;
    const newN = input_n_ct !== undefined && input_n_ct !== null && input_n_ct !== '' ? Number(input_n_ct) : null;
    const hasNChanged = input_n_ct !== undefined && newN !== oldN;

    const oldL = project.input_L ? Number(project.input_L) : null;
    const newL = input_L !== undefined && input_L !== null && input_L !== '' ? Number(input_L) : null;
    const hasLChanged = input_L !== undefined && newL !== oldL;

    const shouldReset = hasPChanged || hasNChanged || hasLChanged;

    const resetData = shouldReset ? {
      efficiency: null,
      Pct: null,
      total_ratio: null,
      transmission: null,
      shafts: null,
      selected_motor_id: null,
      selected_motor_snapshot: null,
      design_result: null,
      step: 'inputs'
    } : {};

    const updatedProject = await prisma.projects.update({
      where: { id: Number(projectId) },
      data: {
        ...(input_P && { input_P: Number(input_P) }),
        ...(input_n_ct && { input_n_ct: Number(input_n_ct) }),
        ...(input_L && { input_L: Number(input_L) }),
        ...resetData,
        updatedAt: new Date(),
      },
      select: { id: true, name: true, input_P: true, input_n_ct: true, input_L: true, step: true },
    });

    return updatedProject;
  },

  async delete(req) {
    const { projectId } = req.params;
    const userId = req.user.id;

    const project = await prisma.projects.findFirst({
      where: { id: Number(projectId), user_id: userId, isDeleted: false },
    });
    if (!project) throw new NotfoundException('Dự án không tồn tại hoặc đã bị xóa');

    await prisma.projects.update({
      where: { id: Number(projectId) },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
        deletedBy: userId
      }
    });

    return { id: projectId, status: "Đã xóa thành công" };
  }
};
