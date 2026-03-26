import { prisma } from "../common/prisma/connect.prisma.js";
import { BadRequestException, NotfoundException } from "../common/helpers/exception.helper.js";

const ETA = {
  kn: 1.00,   // khớp nối
  ol: 0.99,   // 1 cặp ổ lăn (dùng ^4 cho 4 cặp)
  brc: 0.96,   // bánh răng côn
  brt: 0.97,   // bánh răng trụ
  x: 0.91,   // xích
};

const U_SB = {
  u_h: 13,   // hộp giảm tốc sơ bộ
  u_x: 3,    // bộ truyền xích sơ bộ
  u_1: 3.45, // cấp nhanh (bánh răng côn)
};

const round3 = (v) => Math.round(v * 1000) / 1000;

export const kinematicsService = {

  async calculate(req) {
    const { projectId } = req.params;
    const userId = req.user.id;
    const project = await prisma.projects.findFirst({
      where: { id: Number(projectId), user_id: userId, isDeleted: false },
    });
    if (!project) throw new NotfoundException('Dự án không tồn tại');

    if (!project.input_P || !project.input_n_ct || !project.input_L)
      throw new BadRequestException('Dữ liệu đầu vào bị gián đoạn. Vui lòng nhập lại thông số');

    const P = Number(project.input_P);   
    const n = Number(project.input_n_ct);
    const eta_ol4 = Math.pow(ETA.ol, 4);

    // ① η = η_kn × η_ol^4 × η_brc × η_brt × η_x
    const eta = round3(ETA.kn * eta_ol4 * ETA.brc * ETA.brt * ETA.x);

    // ② P_ct = P / η
    const P_ct = round3(P / eta);

    // ③ u_ch sơ bộ = u_h × u_x
    const u_ch_sb = U_SB.u_h * U_SB.u_x; // = 39

    // ④ n_sb = n × u_ch
    const n_sb = round3(n * u_ch_sb);

    // ⑤ Shaft powers — tính ngược từ trục công tác lên trục động cơ
    const P_out = P;
    const P_x   = round3(P_out / (ETA.x   * ETA.ol));
    const P_brt = round3(P_x   / (ETA.brt * ETA.ol));
    const P_brc = round3(P_brt / (ETA.brc * ETA.ol));
    const P_ct2 = round3(P_brc / ETA.ol);

    // ⑥ u_2 = u_h / u_1
    const u_2 = round3(U_SB.u_h / U_SB.u_1);

    // ⑦ Momen xoắn trục công tác (T_out = 9.55e6 × P / n)
    const T_out = round3(9.55e6 * P / n);

    const updated = await prisma.projects.update({
      where: { id: Number(projectId) },
      data: {
        efficiency:  eta,
        Pct:         P_ct,
        total_ratio: u_ch_sb,
        step:        'kinematics',
        transmission: { n_sb, u_h: U_SB.u_h, u_x: U_SB.u_x, u_1: U_SB.u_1, u_2 },
        shafts:       { P_out, P_x, P_brt, P_brc, T_out },
        updatedAt:   new Date(),
      },
      select: {
        id: true, name: true, step: true,
        input_P: true, input_n_ct: true, input_L: true,
        efficiency: true, Pct: true, total_ratio: true,
        transmission: true, shafts: true,
      },
    });

    return {
      project: updated,
      kinematics: {
        eta,
        P_ct,
        n_sb,

        u_ch_sb,
        u_h_sb: U_SB.u_h,
        u_x_sb: U_SB.u_x,
        u_1: U_SB.u_1,
        u_2,

        shaft_powers: {
          P_out,   // trục công tác (đầu vào)
          P_x,     // sau xích
          P_brt,   // sau bánh răng trụ
          P_brc,   // sau bánh răng côn
          P_ct: P_ct2,
        },

        // Momen trục công tác
        T_out,

        note: 'Bảng momen đầy đủ tính sau khi chọn động cơ ',
        unit: { P: 'kW', n: 'rpm', T: 'N.mm', eta: 'không thứ nguyên' },
      },
    };
  },

  async findOne(req) {
    const { projectId } = req.params;
    const userId = req.user.id;

    const project = await prisma.projects.findFirst({
      where: { id: Number(projectId), user_id: userId, isDeleted: false },
      select: {
        id: true, name: true, step: true,
        input_P: true, input_n_ct: true,
        efficiency: true, Pct: true, total_ratio: true,
        transmission: true, shafts: true,
      },
    });

    if (!project) throw new NotfoundException('Dự án không tồn tại');
    return project;
  },
};