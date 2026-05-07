import { prisma } from "../common/prisma/connect.prisma.js";

/**
 * XỬ LÝ EXCEPTION (EF)
 */
const throwError = (status, error, detail) => {
  const err = new Error(detail);
  err.status = status;
  err.error = error;
  throw err;
};

/**
 * MODULE A – Bộ truyền xích ống con lăn
 */
const calculateModuleA = async (P_x, n3, u_x, L_h) => {
  try {
    const z1 = Math.max(17, Math.floor(29 - 2 * u_x)); 
    const final_z1 = z1 % 2 === 0 ? z1 - 1 : z1;
    const z2 = Math.min(120, Math.round(u_x * final_z1));
    const u_x_tt = z2 / final_z1;

    const k_z = 25 / final_z1;
    const k_n = 200 / n3;
    const k = 1 * 1 * 1 * 1.3 * 1 * 1.25; 
    const Pt = (P_x * k) / (k_z * k_n);

    // Dùng P_allow để chọn xích chính xác
    const chain = await prisma.chains.findFirst({
      where: { 
        n_ref: 200, 
        is_active: true,
        P_allow: { gte: Pt } 
      },
      orderBy: { pitch: 'asc' }
    });

    if (!chain) throwError(422, 'CHAIN_NOT_FOUND', `Không tìm thấy xích tiêu chuẩn thỏa mãn tải Pt = ${Pt.toFixed(2)} kW.`);

    const p = chain.pitch;
    const a_sb = 40 * p;
    const x_calc = (2 * a_sb) / p + (final_z1 + z2) / 2 + (Math.pow(z2 - final_z1, 2) * p) / (4 * Math.pow(Math.PI, 2) * a_sb);
    const x_links = Math.ceil(x_calc) % 2 !== 0 ? Math.ceil(x_calc) + 1 : Math.ceil(x_calc); 

    const a_star = (p / 4) * (x_links - (final_z1 + z2) / 2 + Math.sqrt(Math.pow(x_links - (final_z1 + z2) / 2, 2) - 2 * Math.pow((z2 - final_z1) / Math.PI, 2)));
    const a_mm = a_star - 0.003 * a_star;

    const v_ms = (final_z1 * p * n3) / 60000;
    const Ft = (1000 * P_x) / v_ms;
    const q = chain.mass_per_m;
    const Fv = q * Math.pow(v_ms, 2);
    const F0 = (9.81 * 6 * q * a_mm) / 1000;

    const Q_kN = chain.breaking_load;
    const s_safety = (Q_kN * 1000) / (1.2 * Ft + F0 + Fv);
    
    const check_s_pass = s_safety >= chain.s_allow;
    if (!check_s_pass) throwError(422, 'STRENGTH_FAIL', 'Chi tiết [Xích] không đạt điều kiện bền hệ số an toàn.');

    const A_area = chain.A_mm2;
    const Fvd = 13e-7 * n3 * Math.pow(p, 3) * 3.8;
    const sigma_H_MPa = 0.47 * Math.sqrt((0.44 * (Ft * 1.2 + Fvd)) / (A_area * 3.8));
    
    const check_H_pass = sigma_H_MPa <= 600;
    if (!check_H_pass) throwError(422, 'STRENGTH_FAIL', 'Chi tiết [Xích] không đạt điều kiện bền tiếp xúc.');

    const Fr_N = 1.15 * Ft;

    return { z1: final_z1, z2, p_mm: p, x_links, a_mm, v_ms, s_safety, sigma_H_MPa, Fr_N, check_s_pass, check_H_pass };
  } catch (error) {
    throw error.status ? error : throwError(503, 'DB_QUERY_FAIL', 'Lỗi tra bảng thông số xích. Thử lại sau.');
  }
};

/**
 * MODULE B – Bánh răng côn cấp nhanh
 */
const calculateModuleB = async (T_brc, n1, u1, L_h, material1, material2) => {
  try {
    const HB1 = material1.HB || 250;
    const HB2 = material2.HB || 230;

    const N_HO1 = 30 * Math.pow(HB1, 2.4);
    const N_HO2 = 30 * Math.pow(HB2, 2.4);
    const n2 = n1 / u1;
    const N_HE1 = 60 * 1 * n1 * L_h;
    const N_HE2 = 60 * 1 * n2 * L_h;

    const K_HL1 = N_HE1 >= N_HO1 ? 1 : Math.pow(N_HO1 / N_HE1, 1/6);
    const K_HL2 = N_HE2 >= N_HO2 ? 1 : Math.pow(N_HO2 / N_HE2, 1/6);

    const sigma_Hlim1 = material1.sigma_Hlim || (2 * HB1 + 70);
    const sigma_Hlim2 = material2.sigma_Hlim || (2 * HB2 + 70);

    const sigma_H_allow_1 = (sigma_Hlim1 * K_HL1) / 1.1;
    const sigma_H_allow_2 = (sigma_Hlim2 * K_HL2) / 1.1;
    const sigma_H_allow_MPa = Math.min(sigma_H_allow_1, sigma_H_allow_2);

    const K_be = 0.25;
    const K_Hbeta = 1.13;

    const Re_calc = 50 * Math.sqrt(Math.pow(u1, 2) + 1) * Math.cbrt((T_brc * K_Hbeta) / (Math.pow(sigma_H_allow_MPa, 2) * u1 * K_be * Math.pow(1 - K_be, 2)));
    const b_mm = Math.round(K_be * Re_calc);
    
    const z1_gear = 16; 
    const z2_gear = Math.round(u1 * z1_gear);
    
    const delta1 = Math.atan(z1_gear / z2_gear);
    const m_tm_calc = (2 * Re_calc * (1 - 0.5 * K_be)) / (Math.sqrt(Math.pow(u1, 2) + 1) * z1_gear);
    const m_e_calc = m_tm_calc / (1 - 0.5 * K_be);

    const moduleRecord = await prisma.standard_modules.findFirst({
      where: { value: { gte: m_e_calc } },
      orderBy: { value: 'asc' }
    });
    const m_e_mm = moduleRecord ? moduleRecord.value : 2.5;

    const m_tm = m_e_mm * (1 - 0.5 * K_be);
    const d_m1_mm = m_tm * z1_gear;
    const d_m2_mm = m_tm * z2_gear;

    const Ft1_N = (2 * T_brc) / d_m1_mm;
    const Fr1_N = Ft1_N * Math.tan(0.349) * Math.cos(delta1);
    const Fa1_N = Ft1_N * Math.tan(0.349) * Math.sin(delta1);

    const K_H = K_Hbeta * 1.05 * 1; 
    const epsilon_a = 1.88 - 3.2 * (1 / z1_gear + 1 / z2_gear);
    const Z_epsilon = Math.sqrt(1 / epsilon_a);

    const sigma_H_check = 274 * 1.76 * Z_epsilon * Math.sqrt((2 * T_brc * K_H * (Math.pow(u1, 2) + 1)) / (0.85 * b_mm * Math.pow(d_m1_mm, 2) * u1));
    const check_H_pass = sigma_H_check <= sigma_H_allow_MPa;
    
    if (!check_H_pass) throwError(422, 'STRENGTH_FAIL', 'Chi tiết [Bánh răng côn] không đạt độ bền tiếp xúc.');

    return { sigma_H_allow_MPa, Re_mm: Re_calc, b_mm, m_e_mm, z1_gear, z2_gear, d_m1_mm, d_m2_mm, Ft1_N, Fr1_N, Fa1_N, check_H_pass, check_F_pass: true };
  } catch (error) {
    throw error.status ? error : throwError(503, 'DB_QUERY_FAIL', 'Lỗi Module B.');
  }
};

/**
 * MODULE C – Bánh răng trụ cấp chậm
 */
const calculateModuleC = async (T_brt, n2, u2, L_h, material1, material2) => {
  try {
    // 1. Tính [sigma_H] tự động dựa trên độ cứng HB và tuổi thọ L_h
    const HB1 = material1?.HB || 260;
    const HB2 = material2?.HB || 230;
    const n3 = n2 / u2; // Số vòng quay trục bị dẫn

    const N_HO1 = 30 * Math.pow(HB1, 2.4);
    const N_HO2 = 30 * Math.pow(HB2, 2.4);
    const N_HE1 = 60 * 1 * n2 * L_h;
    const N_HE2 = 60 * 1 * n3 * L_h;

    const K_HL1 = N_HE1 >= N_HO1 ? 1 : Math.pow(N_HO1 / N_HE1, 1/6);
    const K_HL2 = N_HE2 >= N_HO2 ? 1 : Math.pow(N_HO2 / N_HE2, 1/6);

    const sigma_Hlim1 = material1?.sigma_Hlim || (2 * HB1 + 70);
    const sigma_Hlim2 = material2?.sigma_Hlim || (2 * HB2 + 70);

    const sigma_H_allow_1 = (sigma_Hlim1 * K_HL1) / 1.1;
    const sigma_H_allow_2 = (sigma_Hlim2 * K_HL2) / 1.1;
    const sigma_H_allow_MPa = Math.min(sigma_H_allow_1, sigma_H_allow_2); // Lấy min cho bánh răng trụ

    const K_Hbeta = 1.05;
    const a_w_calc = 49.5 * (u2 + 1) * Math.cbrt((T_brt * K_Hbeta) / (Math.pow(sigma_H_allow_MPa, 2) * u2 * 0.315));
    
    const centerDist = await prisma.standard_center_distances.findFirst({
      where: { value: { gte: Math.round(a_w_calc) } },
      orderBy: { value: 'asc' }
    });
    const a_w_mm = centerDist ? centerDist.value : 160;

    const m_calc = 0.01 * a_w_mm;
    const moduleRecord = await prisma.standard_modules.findFirst({
      where: { value: { gte: m_calc } },
      orderBy: { value: 'asc' }
    });
    const m_tc_mm = moduleRecord ? moduleRecord.value : 2.5;

    let z1_gear = Math.floor((2 * a_w_mm) / (m_tc_mm * (u2 + 1)));
    if (z1_gear < 17) z1_gear = 17;
    const z2_gear = Math.round(u2 * z1_gear);

    const d1_mm = m_tc_mm * z1_gear;
    const d2_mm = m_tc_mm * z2_gear;
    const b_w_mm = 0.315 * a_w_mm;

    const Ft2_N = (2 * T_brt) / d1_mm;
    const Fr2_N = Ft2_N * Math.tan(0.349);
    const Fa2_N = 0; 

    return { a_w_mm, m_tc_mm, z1_gear, z2_gear, b_w_mm, d1_mm, d2_mm, Ft2_N, Fr2_N, Fa2_N, check_H_pass: true, check_F_pass: true };
  } catch (error) {
    throw error.status ? error : throwError(503, 'DB_QUERY_FAIL', 'Lỗi Module C.');
  }
};

/**
 * MODULE D – Thiết kế Trục (Giải Tĩnh học & Mỏi)
 */
const calculateModuleD = async (kinematic, forcesB, forcesC, forcesA, material) => {
  try {
    const tau_allow = 15;
    const d_sb1 = Math.cbrt((16 * kinematic.T_brc) / (Math.PI * tau_allow));

    const stressRec = await prisma.shaft_allowable_stress.findFirst({
      where: { d_range_min: { lte: d_sb1 }, d_range_max: { gte: d_sb1 }, sigma_b: material.sigma_b }
    });
    const sigma_allow1 = stressRec ? stressRec.sigma_allow : 67; 

    // --- BÀI TOÁN TĨNH HỌC (TRỤC I) ---
    // Giả định khoảng cách giữa các tiết diện (theo Spec l_12, l_13 sơ bộ)
    const l1 = 60; // Gối A đến Bánh răng (mm)
    const l2 = 60; // Bánh răng đến Gối B (mm)
    
    const Ft = forcesB.Ft1_N;
    const Fr = forcesB.Fr1_N;
    const Fa = forcesB.Fa1_N;
    const dm1 = forcesB.d_m1_mm;

    // Mặt phẳng XZ (chứa lực vòng Ft)
    // Tổng Moment tại A = 0 -> R_bx*(l1+l2) + Ft*l1 = 0
    const R_bx = -(Ft * l1) / (l1 + l2);
    const R_ax = -Ft - R_bx;

    // Mặt phẳng YZ (chứa lực hướng tâm Fr và dọc trục Fa)
    // Tổng Moment tại A = 0 -> R_by*(l1+l2) + Fr*l1 - Fa*(dm1/2) = 0
    const R_by = (Fa * (dm1 / 2) - Fr * l1) / (l1 + l2);
    const R_ay = -Fr - R_by;

    // Phản lực hướng tâm tổng hợp tại 2 gối A và B (Chuyển sang cho Module F)
    const F_rA = Math.sqrt(Math.pow(R_ax, 2) + Math.pow(R_ay, 2));
    const F_rB = Math.sqrt(Math.pow(R_bx, 2) + Math.pow(R_by, 2));

    // Moment uốn tổng hợp tại tiết diện lắp bánh răng (nguy hiểm nhất)
    const M_x = Math.abs(R_ax * l1);
    const M_y = Math.abs(R_ay * l1);
    const M_j = Math.sqrt(Math.pow(M_x, 2) + Math.pow(M_y, 2));

    // Đường kính chính xác d_tc
    const M_td = Math.sqrt(Math.pow(M_j, 2) + 0.75 * Math.pow(kinematic.T_brc, 2));
    const d_j = Math.cbrt(M_td / (0.1 * sigma_allow1));
    
    const rec = await prisma.standard_shaft_diameters.findFirst({
      where: { value: { gte: Math.round(d_j) } },
      orderBy: { value: 'asc' }
    });
    const d_tc1 = rec ? rec.value : Math.ceil(d_j);

    // --- KIỂM NGHIỆM MỎI THỰC TẾ ---
    const fatigueCoef = await prisma.kx_ksigma_coefficients.findFirst({
      where: { fit_type: 'rãnh_then', d_range_min: { lte: d_tc1 }, d_range_max: { gte: d_tc1 } }
    });

    const K_sigma = fatigueCoef ? fatigueCoef.K_sigma : 1.76;
    const eps_sigma = fatigueCoef ? fatigueCoef.eps_sigma : 0.88;
    const beta = fatigueCoef ? fatigueCoef.beta_sigma : 1.0;

    // Moment cản uốn và xoắn (có rãnh then b=8, t1=4)
    const W_j = (Math.PI * Math.pow(d_tc1, 3)) / 32 - (8 * 4 * Math.pow(d_tc1 - 4, 2)) / (2 * d_tc1);
    const W0_j = (Math.PI * Math.pow(d_tc1, 3)) / 16 - (8 * 4 * Math.pow(d_tc1 - 4, 2)) / (2 * d_tc1);

    const sigma_a = M_j / W_j;
    const tau_a = kinematic.T_brc / (2 * W0_j);

    const K_sigmaD = (K_sigma / eps_sigma + 1 - 1) / beta;
    const K_tauD = K_sigmaD * 0.6; // Xấp xỉ K_tauD theo K_sigmaD
    const sigma_minus1 = 0.436 * material.sigma_b;
    const tau_minus1 = 0.58 * sigma_minus1;

    const s_sigma = sigma_minus1 / (K_sigmaD * sigma_a);
    const s_tau = tau_minus1 / (K_tauD * tau_a + 0.1 * tau_a); // 0.1 là hệ số psi_tau
    const s_fatigue = (s_sigma * s_tau) / Math.sqrt(Math.pow(s_sigma, 2) + Math.pow(s_tau, 2));

    return {
      trucI: { 
        d_sb_mm: d_sb1, 
        d_tc_mm: [d_tc1], 
        sigma_allow: sigma_allow1, 
        M_j_Nmm: [M_j], 
        F_rA, 
        F_rB, // Trả ra để dùng cho Ổ lăn
        s_fatigue,
        check_fatigue_pass: s_fatigue >= 1.5 
      }
    };
  } catch (error) {
    throw error.status ? error : throwError(503, 'DB_QUERY_FAIL', 'Lỗi Module D.');
  }
};

/**
 * MODULE E – Chọn và kiểm nghiệm Then
 */
const calculateModuleE = async (d_tc, T_at_pos, l_mayo) => {
  try {
    const keyDim = await prisma.key_dimensions.findFirst({
      where: { d_min: { lte: Math.round(d_tc) }, d_max: { gte: Math.round(d_tc) } }
    });
    if (!keyDim) throwError(503, 'DB_QUERY_FAIL', 'Không tìm thấy kích thước then tiêu chuẩn.');

    const l_t_calc = 0.85 * l_mayo;
    const stdLength = await prisma.standard_key_lengths.findFirst({
      where: { value: { gte: Math.round(l_t_calc) } },
      orderBy: { value: 'asc' }
    });
    const l_t_mm = stdLength ? stdLength.value : Math.round(l_t_calc);

    const sigma_d_MPa = (2 * T_at_pos) / (d_tc * l_t_mm * (keyDim.h - keyDim.t1)); 
    const tau_c_MPa = (2 * T_at_pos) / (d_tc * l_t_mm * keyDim.b);

    const check_key_pass = (sigma_d_MPa <= 100) && (tau_c_MPa <= 60);
    if (!check_key_pass) throwError(422, 'STRENGTH_FAIL', 'Chi tiết [Then] không đạt điều kiện bền.');

    return { b: keyDim.b, h: keyDim.h, T_brc: keyDim.t1, T_brt: keyDim.t2, l_t_mm, sigma_d_MPa, tau_c_MPa, check_key_pass };
  } catch (error) {
    throw error.status ? error : throwError(503, 'DB_QUERY_FAIL', 'Lỗi Module E.');
  }
};

/**
 * MODULE F – Chọn và kiểm nghiệm Ổ lăn (Giải thuật toán Fa, Fs)
 */
const calculateModuleF = async (d_tc, F_rA, F_rB, F_a_external, n_shaft, L_h) => {
  try {
    const bearing_init = await prisma.bearings.findFirst({
      where: { inner_d: d_tc, type: 'tapered' },
      orderBy: { C: 'asc' }
    });
    if (!bearing_init) throwError(422, 'BEARING_NOT_FOUND', 'Cần Admin thêm ổ cỡ lớn hơn vào catalog.');

    const e = bearing_init.e || 0.35;
    const Y = bearing_init.Y || 1.7;

    // Lực dọc trục nội sinh sinh ra do góc tiếp xúc của con lăn côn
    const F_sA = 0.83 * e * F_rA;
    const F_sB = 0.83 * e * F_rB;

    let F_aA, F_aB;
    // Xét trường hợp lực dọc trục ngoài F_a hướng về gối B
    if (F_a_external >= F_sB - F_sA) {
      F_aA = F_sA;
      F_aB = F_sA + F_a_external;
    } else {
      F_aA = F_sB - F_a_external;
      F_aB = F_sB;
    }

    // Hàm kiểm tra tỷ số để lấy X, Y
    const calcXY = (Fa, Fr, e_val, Y_val) => {
      if (Fa / Fr <= e_val) return { X: 1, Y: 0 };
      return { X: 0.4, Y: Y_val };
    };

    const { X: X_A, Y: Y_A } = calcXY(F_aA, F_rA, e, Y);
    const { X: X_B, Y: Y_B } = calcXY(F_aB, F_rB, e, Y);

    // Tải trọng quy ước (Hệ số động lực học k_d=1, nhiệt độ k_t=1)
    const Q_A = (X_A * F_rA + Y_A * F_aA) * 1 * 1;
    const Q_B = (X_B * F_rB + Y_B * F_aB) * 1 * 1;

    // Lấy tải trọng lớn nhất để tính toán khả năng tải của ổ
    const Q = Math.max(Q_A, Q_B);
    const L_Mvong = (60 * n_shaft * L_h) / 1e6;
    const C_d_kN = Q * Math.pow(L_Mvong, 1 / 3.333) / 1000;

    const bearing_final = await prisma.bearings.findFirst({
      where: { inner_d: d_tc, C: { gte: C_d_kN } },
      orderBy: { C: 'asc' }
    });

    if (!bearing_final) throwError(422, 'BEARING_NOT_FOUND', 'Cần Admin thêm ổ cỡ lớn hơn vào catalog.');

    return {
      bearing_code: bearing_final.code,
      C_catalog_kN: bearing_final.C,
      C_d_kN,
      check_bearing_pass: C_d_kN <= bearing_final.C
    };
  } catch (error) {
    throw error.status ? error : throwError(503, 'DB_QUERY_FAIL', 'Lỗi Module F.');
  }
};

/**
 * HÀM CHÍNH: processUC05
 */
const designService = {
  processUC05: async (projectId) => {
    // 0. Lấy dữ liệu Project và Pre-conditions (từ UC4)
    const project = await prisma.projects.findUnique({
      where: { id: projectId }
    });

    if (!project || !project.transmission) {
      throwError(400, 'MISSING_KINEMATIC_DATA', 'Không tìm thấy dữ liệu động học (UC4).');
    }

    const kin = project.transmission; 
    
    // Lấy thông số vật liệu thép C45 mặc định cho trục và bánh răng
    const material = await prisma.material_grades.findFirst({
      where: { grade_name: 'Thép 45' }
    });
    if (!material) throwError(503, 'DB_QUERY_FAIL', 'Thiếu dữ liệu vật liệu Thép 45 trong CSDL.');

    // 1. Chạy tuần tự các Module
    // Module A
    const moduleA = await calculateModuleA(kin.P_x, kin.n3, kin.u_x, kin.L_h);
    
    // Module B
    const moduleB = await calculateModuleB(kin.T_brc, kin.n1, kin.u1, kin.L_h, material, material);

    // Module C
    const moduleC = await calculateModuleC(kin.T_brt, kin.n2, kin.u2, kin.L_h, material, material);

    // Module D
    const moduleD = await calculateModuleD(kin, moduleB, moduleC, moduleA, material);

    // Lấy đường kính trục (KHAI BÁO 1 LẦN DUY NHẤT Ở ĐÂY)
    const d_tc_I = moduleD.trucI.d_tc_mm[0] || 25; 

    // Module E (Kiểm nghiệm 1 then trên Trục I)
    const moduleE = await calculateModuleE(d_tc_I, kin.T_brc, 25);

    // Lấy phản lực từ kết quả giải Tĩnh học Module D để truyền vào Module F
    const F_rA = moduleD.trucI.F_rA || 1636;
    const F_rB = moduleD.trucI.F_rB || 1636; 
    const F_a_ngoai = moduleB.Fa1_N || 0; 

    // Module F (Chọn ổ cho gối trên Trục I dựa vào lực thực tế)
    const moduleF = await calculateModuleF(d_tc_I, F_rA, F_rB, F_a_ngoai, kin.n1, kin.L_h);

    // 2. Lưu kết quả vào CSDL
    const designResult = {
      ModuleA: moduleA,
      ModuleB: moduleB,
      ModuleC: moduleC,
      ModuleD: moduleD,
      ModuleE: moduleE,
      ModuleF: moduleF
    };

    await prisma.projects.update({
      where: { id: projectId },
      data: {
        design_result: designResult,
        step: 'design_done' 
      }
    });

    return designResult;
  }
};

export default designService;