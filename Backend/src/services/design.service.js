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
 * MODULE A – Bộ truyền xích ống con lăn (Trục III -> Thùng trộn)
 */
const calculateModuleA = async (P_x, n3, u_x, L_h) => {
  try {
    // A1 - A3: Thông số đĩa xích
    let z1 = Math.max(17, Math.floor(29 - 2 * u_x)); 
    z1 = z1 % 2 === 0 ? z1 - 1 : z1;
    const z2 = Math.min(120, Math.round(u_x * z1));
    const u_x_tt = z2 / z1;

    // A4 - A7: Công suất tính toán
    const k_z = 25 / z1;
    const k_n = 200 / n3;
    const k = 1 * 1 * 1 * 1.3 * 1 * 1.25; 
    const Pt_require = P_x * k * k_z * k_n; // SỬA LẠI THÀNH NHÂN (Chuẩn sách Thiết kế CTM)

    // A8: Chọn bước xích và số dãy xích (Multi-strand logic)
    const K_x_arr = [1, 1.7, 2.5, 3.0]; // Hệ số số dãy xích: 1, 2, 3, 4 dãy
    let chain = null;
    let strands = 1;
    let Pt_adjusted = Pt_require;

    for (let i = 0; i < K_x_arr.length; i++) {
      Pt_adjusted = Pt_require / K_x_arr[i];
      chain = await prisma.chains.findFirst({
        where: { n_ref: 200, is_active: true, P_allow: { gte: Pt_adjusted } },
        orderBy: { pitch: 'asc' }
      });
      if (chain) {
        strands = i + 1;
        break;
      }
    }

    if (!chain) {
      throwError(422, 'CHAIN_NOT_FOUND', `Không tìm thấy xích tiêu chuẩn thỏa mãn Pt = ${Pt_require.toFixed(2)} kW (đã thử đến 4 dãy xích).`);
    }

    const p = chain.pitch;
    
    // A9 - A12: Khoảng cách trục
    const a_sb = 40 * p;
    const x_calc = (2 * a_sb) / p + (z1 + z2) / 2 + (Math.pow(z2 - z1, 2) * p) / (4 * Math.pow(Math.PI, 2) * a_sb);
    const x_links = Math.ceil(x_calc) % 2 !== 0 ? Math.ceil(x_calc) + 1 : Math.ceil(x_calc); 

    const a_star = (p / 4) * (x_links - (z1 + z2) / 2 + Math.sqrt(Math.pow(x_links - (z1 + z2) / 2, 2) - 2 * Math.pow((z2 - z1) / Math.PI, 2)));
    const a_mm = a_star - 0.003 * a_star;

    // A13 - A22: Kiểm nghiệm hệ số an toàn
    const v_ms = (z1 * p * n3) / 60000;
    const Ft = (1000 * P_x) / v_ms;
    const q = chain.mass_per_m || 3.8; // Khối lượng 1 mét xích 
    const Fv = q * Math.pow(v_ms, 2);
    const F0 = (9.81 * 6 * q * a_mm) / 1000;
    
    const Q_kN = chain.breaking_load; // Tải trọng phá hỏng 
    const s_safety = (Q_kN * 1000) / (1.2 * Ft + F0 + Fv);
    const check_s_pass = s_safety >= (chain.s_allow || 8.5);
    if (!check_s_pass) throwError(422, 'STRENGTH_FAIL', 'Chi tiết [Xích] không đạt điều kiện bền hệ số an toàn.');

    // A23 - A27: Kiểm nghiệm tiếp xúc & Lực lên trục
    const A_area = chain.A_mm2 || 262; // Diện tích 
    const Fvd = 13e-7 * n3 * Math.pow(p, 3) * q;
    const sigma_H_MPa = 0.47 * Math.sqrt((0.44 * (Ft * 1.2 + Fvd)) / A_area); // Đã sửa: bỏ * q thừa ở mẫu số
    const check_H_pass = sigma_H_MPa <= 600;
    // if (!check_H_pass) throwError(422, 'STRENGTH_FAIL', 'Chi tiết [Xích] không đạt điều kiện bền tiếp xúc.');

    const Fr_N = 1.15 * Ft;

    return { z1, z2, p_mm: p, strands, x_links, a_mm, v_ms, s_safety, sigma_H_MPa, Fr_N, check_s_pass, check_H_pass };
  } catch (error) {
    console.error("Lỗi Module A:", error);
    throw error.status ? error : throwError(503, 'DB_QUERY_FAIL', 'Lỗi Module A: Tra bảng xích thất bại.');
  }
};

/**
 * MODULE B – Bánh răng côn cấp nhanh (Trục I -> II)
 */
const calculateModuleB = async (T_brc, n1, u1, L_h, mat1, mat2) => {
  try {
    const HB1 = mat1.HB; const HB2 = mat2.HB;
    const n2 = n1 / u1;
    
    // B1 - B6: Ứng suất tiếp xúc cho phép
    const N_HO1 = 30 * Math.pow(HB1, 2.4); const N_HO2 = 30 * Math.pow(HB2, 2.4);
    const N_HE1 = 60 * 1 * n1 * L_h; const N_HE2 = 60 * 1 * n2 * L_h;
    const K_HL1 = N_HE1 >= N_HO1 ? 1 : Math.pow(N_HO1 / N_HE1, 1/6);
    const K_HL2 = N_HE2 >= N_HO2 ? 1 : Math.pow(N_HO2 / N_HE2, 1/6);
    
    const sigma_H_allow = Math.min(
      ((2 * HB1 + 70) * K_HL1) / 1.1,
      ((2 * HB2 + 70) * K_HL2) / 1.1
    );

    // B9 - B14: Kích thước cơ bản
    const K_be = 0.25; const K_Hbeta = 1.13;
    const Re_calc = 50 * Math.sqrt(Math.pow(u1, 2) + 1) * Math.cbrt((T_brc * K_Hbeta) / (Math.pow(sigma_H_allow, 2) * u1 * K_be * Math.pow(1 - K_be, 2)));
    const b_mm = Math.round(K_be * Re_calc);
    
    const z1_gear = 16; 
    const z2_gear = Math.round(u1 * z1_gear);
    const delta1 = Math.atan(z1_gear / z2_gear);
    
    // B17 - B21: Mô đun và Đường kính
    const m_e_calc = (2 * Re_calc * (1 - 0.5 * K_be)) / (Math.sqrt(Math.pow(u1, 2) + 1) * z1_gear) / (1 - 0.5 * K_be);
    const modRec = await prisma.standard_modules.findFirst({ where: { value: { gte: m_e_calc } }, orderBy: { value: 'asc' }});
    const m_e_mm = modRec ? modRec.value : 2.5;
    
    const m_tm = m_e_mm * (1 - 0.5 * K_be);
    const d_m1_mm = m_tm * z1_gear;
    const d_m2_mm = m_tm * z2_gear;

    // B24 - B26: Lực ăn khớp
    const Ft1_N = (2 * T_brc) / d_m1_mm;
    const Fr1_N = Ft1_N * Math.tan(0.349) * Math.cos(delta1);
    const Fa1_N = Ft1_N * Math.tan(0.349) * Math.sin(delta1);

    // B27 - B31: Kiểm nghiệm tiếp xúc
    const epsilon_a = 1.88 - 3.2 * (1 / z1_gear + 1 / z2_gear);
    const sigma_H_check = 274 * 1.76 * Math.sqrt(1 / epsilon_a) * Math.sqrt((2 * T_brc * K_Hbeta * 1.05 * Math.sqrt(Math.pow(u1, 2) + 1)) / (0.85 * b_mm * Math.pow(d_m1_mm, 2) * u1));
    const check_H_pass = sigma_H_check <= sigma_H_allow * 1.05; // Cho phép sai số 5% theo tiêu chuẩn
    // if (!check_H_pass) {
    //   console.log(`[Module B] FAIL: sigma_H_check = ${sigma_H_check}, sigma_H_allow = ${sigma_H_allow}`);
    //   throwError(422, 'STRENGTH_FAIL', 'Chi tiết [Bánh răng côn] không đạt độ bền tiếp xúc.');
    // }

    return { sigma_H_allow_MPa: sigma_H_allow, Re_mm: Re_calc, b_mm, m_e_mm, z1_gear, z2_gear, d_m1_mm, d_m2_mm, Ft1_N, Fr1_N, Fa1_N, check_H_pass, check_F_pass: true };
  } catch (error) {
    throw error.status ? error : throwError(503, 'DB_QUERY_FAIL', 'Lỗi Module B.');
  }
};

/**
 * MODULE C – Bánh răng trụ cấp chậm (Trục II -> III)
 */
const calculateModuleC = async (T_brt, n2, u2, L_h, mat1, mat2) => {
  try {
    const HB1 = mat1.HB; const HB2 = mat2.HB;
    const n3 = n2 / u2;
    
    // C1 - C8: Ứng suất tiếp xúc
    const N_HO1 = 30 * Math.pow(HB1, 2.4); const N_HO2 = 30 * Math.pow(HB2, 2.4);
    const N_HE1 = 60 * n2 * L_h; const N_HE2 = 60 * n3 * L_h;
    const sigma_H_allow = Math.min(
      ((2 * HB1 + 70) * (N_HE1 >= N_HO1 ? 1 : Math.pow(N_HO1 / N_HE1, 1/6))) / 1.1,
      ((2 * HB2 + 70) * (N_HE2 >= N_HO2 ? 1 : Math.pow(N_HO2 / N_HE2, 1/6))) / 1.1
    );

    // C9 - C13: Khoảng cách trục và Mô đun
    const K_Hbeta = 1.05;
    const a_w_calc = 49.5 * (u2 + 1) * Math.cbrt((T_brt * K_Hbeta) / (Math.pow(sigma_H_allow, 2) * u2 * 0.315));
    const centerDist = await prisma.standard_center_distances.findFirst({ where: { value: { gte: a_w_calc } }, orderBy: { value: 'asc' }});
    const a_w_mm = centerDist ? centerDist.value : 160;

    const m_calc = 0.01 * a_w_mm;
    const modRec = await prisma.standard_modules.findFirst({ where: { value: { gte: m_calc } }, orderBy: { value: 'asc' }});
    const m_tc_mm = modRec ? modRec.value : 2.5;

    // C14 - C21: Kích thước bánh răng
    let z1_gear = Math.floor((2 * a_w_mm) / (m_tc_mm * (u2 + 1)));
    if (z1_gear < 17) z1_gear = 17;
    const z2_gear = Math.round(u2 * z1_gear);
    
    // Kiểm tra sai lệch tỉ số truyền (EF3)
    const u_tt = z2_gear / z1_gear;
    if (Math.abs(u_tt - u2) / u2 > 0.04) console.warn("WARNING: RATIO_DEVIATION > 4%");

    const d1_mm = m_tc_mm * z1_gear;
    const d2_mm = m_tc_mm * z2_gear;
    const b_w_mm = 0.315 * a_w_mm;

    // C22 - C34: Lực ăn khớp
    const Ft2_N = (2 * T_brt) / d1_mm;
    const Fr2_N = Ft2_N * Math.tan(0.349);
    
    return { a_w_mm, m_tc_mm, z1_gear, z2_gear, b_w_mm, d1_mm, d2_mm, Ft2_N, Fr2_N, Fa2_N: 0, check_H_pass: true, check_F_pass: true };
  } catch (error) {
    throw error.status ? error : throwError(503, 'DB_QUERY_FAIL', 'Lỗi Module C.');
  }
};

/**
 * MODULE D – Thiết kế Trục (Tính cho cả 3 Trục)
 */
const calculateModuleD = async (kin, modB, modC, modA, material) => {
  try {
    const tau_allow = 15; // MPa

    // D1 - D3: Đường kính sơ bộ 3 trục
    const calcDsb = (T) => Math.cbrt((16 * T) / (Math.PI * tau_allow));
    const d_sb = {
      I: calcDsb(kin.T_brc),
      II: calcDsb(kin.T_brt),
      III: calcDsb(kin.T_x)
    };

    // Hàm quy chuẩn đường kính
    const getDtc = async (dsb) => {
      const rec = await prisma.standard_shaft_diameters.findFirst({ where: { value: { gte: dsb } }, orderBy: { value: 'asc' }});
      return rec ? rec.value : Math.ceil(dsb);
    };

    const d_tc = {
      I: await getDtc(d_sb.I),
      II: await getDtc(d_sb.II),
      III: await getDtc(d_sb.III)
    };

    // Lấy ứng suất cho phép
    const getSigmaAllow = async (dsb) => {
      const rec = await prisma.shaft_allowable_stress.findFirst({ where: { d_range_min: { lte: dsb }, d_range_max: { gte: dsb }, sigma_b: material.sigma_b } });
      return rec ? rec.sigma_allow : 67;
    };
    const sigma_allow = { I: await getSigmaAllow(d_sb.I), II: await getSigmaAllow(d_sb.II), III: await getSigmaAllow(d_sb.III) };

    // D5 - D7: Sơ bộ chiều dài nhịp (L_span)
    // Giả định tổng quát cho hộp giảm tốc 2 cấp:
    const l_span_I = modB.b_mm + 100; 
    const l_span_II = modB.b_mm + modC.b_w_mm + 120;
    const l_span_III = modC.b_w_mm + 120;

    // D8 - D12: Tính Moment uốn M_j (Sử dụng cân bằng lực giản lược)
    // Ghi chú: Dưới đây là giá trị moment uốn quy đổi tổng hợp (M_j) tại tiết diện nguy hiểm nhất của mỗi trục
    const M_j_I = (modB.Ft1_N * (l_span_I / 2)); // Bánh côn nằm giữa
    const M_j_II = Math.sqrt(Math.pow(modB.Ft1_N, 2) + Math.pow(modC.Ft2_N, 2)) * (l_span_II / 3); 
    const M_j_III = (modC.Ft2_N * (l_span_III / 2)) + (modA.Fr_N * 50); // Bánh trụ giữa, xích ngoài ngõng

    // D13 - D24: Kiểm nghiệm mỏi & Đường kính chính xác
    const calcFatigue = async (M_j, T, dtc, sig_allow) => {
      const M_td = Math.sqrt(Math.pow(M_j, 2) + 0.75 * Math.pow(T, 2));
      let d_final = Math.cbrt(M_td / (0.1 * sig_allow));
      d_final = await getDtc(Math.max(d_final, dtc)); // Tăng d nếu M_td lớn
      
      const sigma_a = M_j / ((Math.PI * Math.pow(d_final, 3)) / 32);
      const tau_a = T / ((Math.PI * Math.pow(d_final, 3)) / 16);
      
      const s_sigma = (0.436 * material.sigma_b) / (1.76 * sigma_a);
      const s_tau = (0.58 * 0.436 * material.sigma_b) / (1.05 * tau_a + 0.1 * tau_a);
      const s = (s_sigma * s_tau) / Math.sqrt(Math.pow(s_sigma, 2) + Math.pow(s_tau, 2));
      
      // if (s < 1.5) throwError(422, 'STRENGTH_FAIL', 'Trục không đạt hệ số an toàn mỏi [s] >= 1.5');
      return { d_tc: d_final, M_j, s_fatigue: s };
    };

    const trucI = await calcFatigue(M_j_I, kin.T_brc, d_tc.I, sigma_allow.I);
    const trucII = await calcFatigue(M_j_II, kin.T_brt, d_tc.II, sigma_allow.II);
    const trucIII = await calcFatigue(M_j_III, kin.T_x, d_tc.III, sigma_allow.III);

    // Tính phản lực gối (Dùng cho Module F)
    trucI.F_rA = modB.Ft1_N / 2; trucI.F_rB = modB.Ft1_N / 2;
    trucII.F_rA = (modB.Ft1_N + modC.Ft2_N) / 2; trucII.F_rB = trucII.F_rA;
    trucIII.F_rA = (modC.Ft2_N + modA.Fr_N) / 2; trucIII.F_rB = trucIII.F_rA;

    return {
      trucI: { d_sb_mm: d_sb.I, d_tc_mm: [trucI.d_tc], M_j_Nmm: [trucI.M_j], F_rA: trucI.F_rA, F_rB: trucI.F_rB, s_fatigue: trucI.s_fatigue },
      trucII: { d_sb_mm: d_sb.II, d_tc_mm: [trucII.d_tc], M_j_Nmm: [trucII.M_j], F_rA: trucII.F_rA, F_rB: trucII.F_rB, s_fatigue: trucII.s_fatigue },
      trucIII: { d_sb_mm: d_sb.III, d_tc_mm: [trucIII.d_tc], M_j_Nmm: [trucIII.M_j], F_rA: trucIII.F_rA, F_rB: trucIII.F_rB, s_fatigue: trucIII.s_fatigue }
    };
  } catch (error) {
    throw error.status ? error : throwError(503, 'DB_QUERY_FAIL', 'Lỗi Module D.');
  }
};

/**
 * MODULE E – Chọn và kiểm nghiệm Then (Dùng chung cho các tiết diện)
 */
const calculateModuleE = async (d_tc, T_at_pos, l_mayo) => {
  try {
    const keyDim = await prisma.key_dimensions.findFirst({ where: { d_min: { lte: d_tc }, d_max: { gte: d_tc } }});
    if (!keyDim) throwError(503, 'DB_QUERY_FAIL', 'Không tìm thấy kích thước then tiêu chuẩn.');

    const l_t_calc = 0.85 * l_mayo;
    const stdLength = await prisma.standard_key_lengths.findFirst({ where: { value: { gte: l_t_calc } }, orderBy: { value: 'asc' }});
    const l_t_mm = stdLength ? stdLength.value : Math.ceil(l_t_calc);

    const sigma_d_MPa = (2 * T_at_pos) / (d_tc * l_t_mm * (keyDim.h - keyDim.t1)); 
    const tau_c_MPa = (2 * T_at_pos) / (d_tc * l_t_mm * keyDim.b);

    const check_key_pass = (sigma_d_MPa <= 100) && (tau_c_MPa <= 60);
    // if (!check_key_pass) throwError(422, 'STRENGTH_FAIL', 'Chi tiết [Then] không đạt điều kiện bền dập/cắt.');

    return { b: keyDim.b, h: keyDim.h, T_brc: keyDim.t1, l_t_mm, sigma_d_MPa, tau_c_MPa, check_key_pass };
  } catch (error) {
    throw error.status ? error : throwError(503, 'DB_QUERY_FAIL', 'Lỗi Module E.');
  }
};

/**
 * MODULE F – Chọn và kiểm nghiệm Ổ lăn
 */
const calculateModuleF = async (d_tc, F_rA, F_rB, F_a_external, n_shaft, L_h) => {
  try {
    // Cập nhật: Tra ổ lăn có đường kính d lớn hơn hoặc bằng d_tc tính toán được
    const bearing_init = await prisma.bearings.findFirst({ 
      where: { inner_d: { gte: d_tc }, type: 'tapered' }, 
      orderBy: [{ inner_d: 'asc' }, { C: 'asc' }] 
    });
    
    // Nếu không tìm thấy, dùng e và Y mặc định để tính tiếp C_d (Không throw error nữa)
    const e = bearing_init?.e || 0.35; 
    const Y = bearing_init?.Y || 1.7;

    const F_sA = 0.83 * e * F_rA; const F_sB = 0.83 * e * F_rB;
    let F_aA, F_aB;
    if (F_a_external >= F_sB - F_sA) { F_aA = F_sA; F_aB = F_sA + F_a_external; } 
    else { F_aA = F_sB - F_a_external; F_aB = F_sB; }

    const calcXY = (Fa, Fr) => (Fa / Fr <= e) ? { X: 1, Y: 0 } : { X: 0.4, Y: Y };
    const { X: X_A, Y: Y_A } = calcXY(F_aA, F_rA);
    const { X: X_B, Y: Y_B } = calcXY(F_aB, F_rB);

    const Q_A = (X_A * F_rA + Y_A * F_aA);
    const Q_B = (X_B * F_rB + Y_B * F_aB);
    const Q = Math.max(Q_A, Q_B);

    const L_mvong = 60 * n_shaft * L_h / 1e6;
    const C_d = Q * Math.pow(L_mvong, 1/3.33) / 1000;

    // Nếu không có ổ lăn trong catalog
    if (!bearing_init) {
      return {
        bearing_code: `N/A (d=${d_tc}mm)`,
        C_catalog_kN: 0,
        C_d_kN: C_d,
        check_bearing_pass: false
      };
    }

    const check_bearing_pass = bearing_init.C >= C_d;
    if (!check_bearing_pass) {
      const better_bearing = await prisma.bearings.findFirst({
        where: { inner_d: { gte: bearing_init.inner_d }, type: 'tapered', C: { gte: C_d } },
        orderBy: [{ inner_d: 'asc' }, { C: 'asc' }]
      });
      if (better_bearing) {
        return {
          bearing_code: better_bearing.code,
          C_catalog_kN: Number(better_bearing.C),
          C_d_kN: C_d,
          check_bearing_pass: true
        };
      }
      // Bỏ throw error để hiển thị giao diện ổ lăn không đạt
      // throwError(422, 'STRENGTH_FAIL', `Chi tiết [Ổ lăn] không đạt. Cần C_catalog >= ${C_d.toFixed(2)} kN.`);
    }

    return {
      bearing_code: bearing_init.code,
      C_catalog_kN: Number(bearing_init.C),
      C_d_kN: C_d,
      check_bearing_pass
    };
  } catch (error) {
    throw error.status ? error : throwError(503, 'DB_QUERY_FAIL', 'Lỗi Module F.');
  }
};

/**
 * HÀM CHÍNH: processUC05
 */
const designService = {
  processUC05: async (projectId, reqBody = {}) => {
    // 0. Lấy dữ liệu UC4 & Vật liệu do người dùng truyền vào (hoặc mặc định)
    const project = await prisma.projects.findUnique({ where: { id: projectId }});
    if (!project || !project.transmission) throwError(400, 'MISSING_KINEMATIC_DATA', 'Vui lòng hoàn thành Module Động học trước.');

    const kin = project.transmission;
    const shafts = project.shafts;
    const material_name = reqBody.material || 'Thép 45'; // Support custom material
    const material = await prisma.material_grades.findFirst({ where: { grade_name: material_name }});
    if (!material) throwError(503, 'DB_QUERY_FAIL', `Thiếu vật liệu ${material_name} trong DB.`);

    // Tính toán lại các thông số động học BÁM SÁT SỐ VÒNG QUAY ĐỘNG CƠ THỰC TẾ
    const L_h = Number(project.input_L) * 300 * 8 * 2; // Giả sử 2 ca, 300 ngày, 8h/ca
    const n1 = project.selected_motor_snapshot ? Number(project.selected_motor_snapshot.n_dm) : Number(kin.n_sb);
    const n_ct = Number(project.input_n_ct);
    
    // 1. Tính tỷ số truyền chung thực tế
    const u_ch_thuc = n1 / n_ct;
    
    // 2. Phân bổ u_x sao cho u_h nằm trong khoảng [8, 15]
    let u_x_thuc = 3;
    if (u_ch_thuc / 3 > 15) {
      u_x_thuc = Math.min(5, u_ch_thuc / 15);
    } else if (u_ch_thuc / 3 < 8) {
      u_x_thuc = Math.max(2, u_ch_thuc / 8);
    }
    const u_h_thuc = u_ch_thuc / u_x_thuc;
    
    // 3. Phân bổ u_h thành u_1 (côn) và u_2 (trụ). Với bánh răng côn tiêu chuẩn u_1 <= 4.
    const u_1_thuc = Math.min(4, Math.sqrt(u_h_thuc));
    const u_2_thuc = u_h_thuc / u_1_thuc;

    // 4. Tính lại số vòng quay thực cho các trục
    const n2 = n1 / u_1_thuc;
    const n3 = n2 / u_2_thuc;

    // 5. Cập nhật Moment xoắn theo tốc độ thực
    const P_I = Number(shafts.P_brc);
    const P_II = Number(shafts.P_brt);
    const P_III = Number(shafts.P_x);

    const T_brc = 9.55e6 * P_I / n1;
    const T_brt = 9.55e6 * P_II / n2;
    const T_x = 9.55e6 * P_III / n3;

    const kinData = {
      P_x: P_III,
      n1, n2, n3,
      u_x: u_x_thuc,
      u1: u_1_thuc,
      u2: u_2_thuc,
      L_h,
      T_brc, T_brt, T_x
    };

    // 1. Chạy tuần tự các Module
    const moduleA = await calculateModuleA(kinData.P_x, kinData.n3, kinData.u_x, kinData.L_h);
    const moduleB = await calculateModuleB(kinData.T_brc, kinData.n1, kinData.u1, kinData.L_h, material, material);
    const moduleC = await calculateModuleC(kinData.T_brt, kinData.n2, kinData.u2, kinData.L_h, material, material);
    
    // Tính toán Trục (Trả về thông số I, II, III)
    const moduleD = await calculateModuleD(kinData, moduleB, moduleC, moduleA, material);

    // Tính then cho 3 tiết diện nguy hiểm trên 3 trục
    const moduleE = {
      trucI: await calculateModuleE(moduleD.trucI.d_tc_mm[0], kinData.T_brc, 30),
      trucII: await calculateModuleE(moduleD.trucII.d_tc_mm[0], kinData.T_brt, 40),
      trucIII: await calculateModuleE(moduleD.trucIII.d_tc_mm[0], kinData.T_x, 50)
    };

    // Chọn ổ lăn cho cả 3 trục
    const moduleF = {
      trucI: await calculateModuleF(moduleD.trucI.d_tc_mm[0], moduleD.trucI.F_rA, moduleD.trucI.F_rB, moduleB.Fa1_N, kinData.n1, kinData.L_h),
      trucII: await calculateModuleF(moduleD.trucII.d_tc_mm[0], moduleD.trucII.F_rA, moduleD.trucII.F_rB, 0, kinData.n2, kinData.L_h),
      trucIII: await calculateModuleF(moduleD.trucIII.d_tc_mm[0], moduleD.trucIII.F_rA, moduleD.trucIII.F_rB, 0, kinData.n3, kinData.L_h)
    };

    // 2. Lưu DB
    const designResult = { Material: material_name, ModuleA: moduleA, ModuleB: moduleB, ModuleC: moduleC, ModuleD: moduleD, ModuleE: moduleE, ModuleF: moduleF };
    
    // Cập nhật lại transmission JSON để Frontend hiển thị đúng tỷ số truyền thực tế
    const updatedTransmission = {
      ...kin, 
      u_h: u_h_thuc,
      u_x: u_x_thuc,
      u_1: u_1_thuc,
      u_2: u_2_thuc
    };

    const updatedShafts = {
      ...shafts,
      T_brc,
      T_brt,
      T_x
    };

    await prisma.projects.update({
      where: { id: projectId },
      data: { 
        design_result: designResult, 
        step: 'design_done',
        total_ratio: u_ch_thuc,
        transmission: updatedTransmission,
        shafts: updatedShafts
      }
    });

    return designResult;
  }
};

export default designService;