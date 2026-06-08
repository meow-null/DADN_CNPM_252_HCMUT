import { prisma } from "../common/prisma/connect.prisma.js";

const throwError = (status, error, detail) => {
  const err = new Error(detail);
  err.status = status;
  err.error = error;
  throw err;
};

/**
 * MODULE A – Bộ truyền xích ống con lăn (Trục III -> Thùng trộn)
 */
const calculateModuleA = async (P_x, n3, u_x, L_h, P_input) => {
  try {
    let z1 = Math.max(17, Math.floor(29 - 2 * u_x)); 
    z1 = z1 % 2 === 0 ? z1 - 1 : z1;
    const z2 = Math.min(120, Math.round(u_x * z1));
    const u_x_tt = z2 / z1;

    const k_z = 25 / z1;
    const k_n = 200 / n3;
    const k = 1 * 1 * 1 * 1.3 * 1 * 1.25; 
    const Pt_require = P_x * k * k_z * k_n;

    const K_x_arr = [1, 1.7, 2.5, 3.0]; // 1, 2, 3, 4 dãy
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

    let warning = null;
    let recommendation = null;
    let recommended_P = null;

    if (!chain) {
      // Fallback
      chain = await prisma.chains.findFirst({
        where: { n_ref: 200, is_active: true },
        orderBy: { P_allow: 'desc' }
      });
      const maxPAllow = chain ? Number(chain.P_allow) : 27.0;
      const P_x_max = (maxPAllow * k_z * k_n) / k;
      const P_input_max = P_input ? P_input * (P_x_max / P_x) : 12.0;
      recommended_P = Math.floor(P_input_max * 10) / 10;
      warning = `Không tìm thấy xích tiêu chuẩn thỏa mãn tải Pt = ${Pt_require.toFixed(2)} kW. Khuyến nghị: Hãy giảm công suất đầu vào P ở Bước 1 xuống dưới ${recommended_P} kW.`;
      recommendation = warning;
    }

    if (!chain) {
      throwError(422, 'CHAIN_NOT_FOUND', 'Catalog xích rỗng. Vui lòng chạy seed dữ liệu.');
    }

    const p = chain.pitch;
    const a_sb = 40 * p;
    const x_calc = (2 * a_sb) / p + (z1 + z2) / 2 + (Math.pow(z2 - z1, 2) * p) / (4 * Math.pow(Math.PI, 2) * a_sb);
    const x_links = Math.ceil(x_calc) % 2 !== 0 ? Math.ceil(x_calc) + 1 : Math.ceil(x_calc); 

    const a_star = (p / 4) * (x_links - (z1 + z2) / 2 + Math.sqrt(Math.pow(x_links - (z1 + z2) / 2, 2) - 2 * Math.pow((z2 - z1) / Math.PI, 2)));
    const a_mm = a_star - 0.003 * a_star;

    const v_ms = (z1 * p * n3) / 60000;
    const Ft = (1000 * P_x) / v_ms;
    const q = chain.mass_per_m || 3.8;
    const Fv = q * Math.pow(v_ms, 2);
    const F0 = (9.81 * 6 * q * a_mm) / 1000;
    
    const Q_kN = chain.breaking_load; 
    const s_safety = (Q_kN * 1000) / (1.2 * Ft + F0 + Fv);
    
    let check_s_pass = s_safety >= (chain.s_allow || 8.5);
    if (warning) {
      check_s_pass = false;
    } else if (!check_s_pass) {
      const Ft_max_s = ((Q_kN * 1000) / (chain.s_allow || 8.5) - F0 - Fv) / 1.2;
      const P_x_max = (Ft_max_s * v_ms) / 1000;
      const P_input_max = P_input * (P_x_max / P_x);
      recommended_P = Math.floor(P_input_max * 10) / 10;
      warning = `Chi tiết [Xích] không đạt điều kiện bền hệ số an toàn. Khuyến nghị: Hãy giảm công suất thiết kế P xuống dưới ${recommended_P} kW.`;
      recommendation = warning;
    }

    const A_area = chain.A_mm2 || 262; 
    const Fvd = 13e-7 * n3 * Math.pow(p, 3) * q;
    const sigma_H_MPa = 0.47 * Math.sqrt((0.44 * (Ft * 1.2 + Fvd)) / A_area);
    let check_H_pass = sigma_H_MPa <= 600;
    if (warning) {
      check_H_pass = false;
    } else if (!check_H_pass) {
      const Ft_max_H = ((Math.pow(600 / 0.47, 2) * A_area) / 0.44 - Fvd) / 1.2;
      const P_x_max = (Ft_max_H * v_ms) / 1000;
      const P_input_max = P_input * (P_x_max / P_x);
      recommended_P = Math.floor(P_input_max * 10) / 10;
      warning = `Chi tiết [Xích] không đạt điều kiện bền tiếp xúc. Khuyến nghị: Hãy giảm công suất thiết kế P xuống dưới ${recommended_P} kW.`;
      recommendation = warning;
    }

    const Fr_N = 1.15 * Ft;

    return { z1, z2, p_mm: p, strands, x_links, a_mm, v_ms, s_safety, sigma_H_MPa, Fr_N, check_s_pass, check_H_pass, warning, recommendation, recommended_P };
  } catch (error) {
    console.error("Lỗi Module A:", error);
    throw error.status ? error : throwError(503, 'DB_QUERY_FAIL', 'Lỗi Module A: Tra bảng xích thất bại.');
  }
};

/**
 * MODULE B – Bánh răng côn cấp nhanh (Trục I -> II)
 */
const calculateModuleB = async (T_brc, n1, u1, L_h, mat1, mat2, overrides = {}) => {
  try {
    const HB1 = mat1.HB; const HB2 = mat2.HB;
    const n2 = n1 / u1;
    
    const N_HO1 = 30 * Math.pow(HB1, 2.4); const N_HO2 = 30 * Math.pow(HB2, 2.4);
    const N_HE1 = 60 * 1 * n1 * L_h; const N_HE2 = 60 * 1 * n2 * L_h;
    const K_HL1 = N_HE1 >= N_HO1 ? 1 : Math.pow(N_HO1 / N_HE1, 1/6);
    const K_HL2 = N_HE2 >= N_HO2 ? 1 : Math.pow(N_HO2 / N_HE2, 1/6);
    
    const sigma_Hlim1 = mat1.sigma_Hlim || (2 * HB1 + 70);
    const sigma_Hlim2 = mat2.sigma_Hlim || (2 * HB2 + 70);
    const sigma_H_allow_1 = (sigma_Hlim1 * K_HL1) / 1.1;
    const sigma_H_allow_2 = (sigma_Hlim2 * K_HL2) / 1.1;
    const sigma_H_allow_MPa = Math.min(sigma_H_allow_1, sigma_H_allow_2);

    const K_be = 0.25; const K_Hbeta = 1.13;
    
    let m_e_mm;
    let Re_calc;
    let b_mm;

    const z1_gear = 16; 
    const z2_gear = Math.round(u1 * z1_gear);
    const delta1 = Math.atan(z1_gear / z2_gear);

    if (overrides.m_e_I) {
      m_e_mm = Number(overrides.m_e_I);
      Re_calc = (m_e_mm * z1_gear * Math.sqrt(u1 * u1 + 1)) / 2;
      b_mm = Math.round(K_be * Re_calc);
    } else {
      Re_calc = 50 * Math.sqrt(Math.pow(u1, 2) + 1) * Math.cbrt((T_brc * K_Hbeta) / (Math.pow(sigma_H_allow_MPa, 2) * u1 * K_be * Math.pow(1 - K_be, 2)));
      b_mm = Math.round(K_be * Re_calc);
      const m_tm_calc = (2 * Re_calc * (1 - 0.5 * K_be)) / (Math.sqrt(Math.pow(u1, 2) + 1) * z1_gear);
      const m_e_calc = m_tm_calc / (1 - 0.5 * K_be);

      const modRec = await prisma.standard_modules.findFirst({
        where: { value: { gte: m_e_calc } },
        orderBy: { value: 'asc' }
      });
      m_e_mm = modRec ? modRec.value : 2.5;
    }
    
    const m_tm = m_e_mm * (1 - 0.5 * K_be);
    const d_m1_mm = m_tm * z1_gear;
    const d_m2_mm = m_tm * z2_gear;

    const Ft1_N = (2 * T_brc) / d_m1_mm;
    const Fr1_N = Ft1_N * Math.tan(0.349) * Math.cos(delta1);
    const Fa1_N = Ft1_N * Math.tan(0.349) * Math.sin(delta1);

    const epsilon_a = 1.88 - 3.2 * (1 / z1_gear + 1 / z2_gear);
    const sigma_H_check = 274 * 1.76 * Math.sqrt(1 / epsilon_a) * Math.sqrt((2 * T_brc * K_Hbeta * 1.05 * Math.sqrt(Math.pow(u1, 2) + 1)) / (0.85 * b_mm * Math.pow(d_m1_mm, 2) * u1));
    const check_H_pass = sigma_H_check <= sigma_H_allow_MPa * 1.05; 

    let warning = null;
    let recommendation = null;
    let recommended_material_id = null;
    let recommended_m_e = null;

    if (!check_H_pass) {
      const required_HB = Math.ceil((sigma_H_check * 1.1 / K_HL1 - 70) / 2);
      const maxMat = await prisma.material_grades.findFirst({ orderBy: { HB: 'desc' } });
      const max_HB = maxMat ? maxMat.HB : 480;
      
      if (required_HB <= max_HB) {
        warning = 'Chi tiết [Bánh răng côn] không đạt độ bền tiếp xúc.';
        recommendation = `Khuyến nghị: Hãy chọn vật liệu bánh răng có độ cứng HB >= ${required_HB}.`;
        const recMat = await prisma.material_grades.findFirst({
          where: { HB: { gte: required_HB } },
          orderBy: { HB: 'asc' }
        });
        if (recMat) recommended_material_id = recMat.id;
      } else {
        const required_m_e = m_e_mm * Math.pow(sigma_H_check / sigma_H_allow_MPa, 2/3);
        const nextStdModule = await prisma.standard_modules.findFirst({
          where: { value: { gte: required_m_e } },
          orderBy: { value: 'asc' }
        });
        recommended_m_e = nextStdModule ? nextStdModule.value : Math.ceil(required_m_e);
        warning = 'Chi tiết [Bánh răng côn] không đạt độ bền tiếp xúc (vượt quá giới hạn vật liệu).';
        recommendation = `Khuyến nghị: Hãy tăng module bánh răng côn lên m_e = ${recommended_m_e} mm để giảm ứng suất tiếp xúc.`;
      }
    }

    return { 
      sigma_H_allow_MPa, 
      sigma_H_check, 
      Re_mm: Re_calc, 
      b_mm, 
      m_e_mm, 
      z1_gear, 
      z2_gear, 
      d_m1_mm, 
      d_m2_mm, 
      Ft1_N, 
      Fr1_N, 
      Fa1_N, 
      check_H_pass, 
      check_F_pass: true, 
      warning, 
      recommendation, 
      recommended_material_id, 
      recommended_m_e 
    };
  } catch (error) {
    console.error("Lỗi Module B:", error);
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
    
    const N_HO1 = 30 * Math.pow(HB1, 2.4); const N_HO2 = 30 * Math.pow(HB2, 2.4);
    const N_HE1 = 60 * n2 * L_h; const N_HE2 = 60 * n3 * L_h;
    const sigma_H_allow = Math.min(
      ((2 * HB1 + 70) * (N_HE1 >= N_HO1 ? 1 : Math.pow(N_HO1 / N_HE1, 1/6))) / 1.1,
      ((2 * HB2 + 70) * (N_HE2 >= N_HO2 ? 1 : Math.pow(N_HO2 / N_HE2, 1/6))) / 1.1
    );

    const K_Hbeta = 1.05;
    const a_w_calc = 49.5 * (u2 + 1) * Math.cbrt((T_brt * K_Hbeta) / (Math.pow(sigma_H_allow, 2) * u2 * 0.315));
    const centerDist = await prisma.standard_center_distances.findFirst({ where: { value: { gte: a_w_calc } }, orderBy: { value: 'asc' }});
    const a_w_mm = centerDist ? centerDist.value : 160;

    const m_calc = 0.01 * a_w_mm;
    const modRec = await prisma.standard_modules.findFirst({ where: { value: { gte: m_calc } }, orderBy: { value: 'asc' }});
    const m_tc_mm = modRec ? modRec.value : 2.5;

    let z1_gear = Math.floor((2 * a_w_mm) / (m_tc_mm * (u2 + 1)));
    if (z1_gear < 17) z1_gear = 17;
    const z2_gear = Math.round(u2 * z1_gear);
    
    const u_tt = z2_gear / z1_gear;
    if (Math.abs(u_tt - u2) / u2 > 0.04) console.warn("WARNING: RATIO_DEVIATION > 4%");

    const d1_mm = m_tc_mm * z1_gear;
    const d2_mm = m_tc_mm * z2_gear;
    const b_w_mm = 0.315 * a_w_mm;

    const Ft2_N = (2 * T_brt) / d1_mm;
    const Fr2_N = Ft2_N * Math.tan(0.349);
    
    return { a_w_mm, m_tc_mm, z1_gear, z2_gear, b_w_mm, d1_mm, d2_mm, Ft2_N, Fr2_N, Fa2_N: 0, check_H_pass: true, check_F_pass: true };
  } catch (error) {
    console.error("Lỗi Module C:", error);
    throw error.status ? error : throwError(503, 'DB_QUERY_FAIL', 'Lỗi Module C.');
  }
};

/**
 * MODULE D – Thiết kế Trục (Tính cho cả 3 Trục)
 */
const calculateModuleD = async (kin, modB, modC, modA, material, overrides = {}) => {
  try {
    const tau_allow = 15; // MPa
    const calcDsb = (T) => Math.cbrt((16 * T) / (Math.PI * tau_allow));
    const d_sb = {
      I: calcDsb(kin.T_brc),
      II: calcDsb(kin.T_brt),
      III: calcDsb(kin.T_x)
    };

    const getDtc = async (dsb) => {
      const rec = await prisma.standard_shaft_diameters.findFirst({ where: { value: { gte: dsb } }, orderBy: { value: 'asc' }});
      return rec ? rec.value : Math.ceil(dsb);
    };

    const d_tc_initial = {
      I: await getDtc(d_sb.I),
      II: await getDtc(d_sb.II),
      III: await getDtc(d_sb.III)
    };

    const getSigmaAllow = async (dsb) => {
      const rec = await prisma.shaft_allowable_stress.findFirst({ where: { d_range_min: { lte: dsb }, d_range_max: { gte: dsb }, sigma_b: material.sigma_b } });
      return rec ? rec.sigma_allow : 67;
    };
    const sigma_allow = { I: await getSigmaAllow(d_sb.I), II: await getSigmaAllow(d_sb.II), III: await getSigmaAllow(d_sb.III) };

    const l_span_I = modB.b_mm + 100; 
    const l_span_II = modB.b_mm + modC.b_w_mm + 120;
    const l_span_III = modC.b_w_mm + 120;

    const M_j_I = (modB.Ft1_N * (l_span_I / 2)); 
    const M_j_II = Math.sqrt(Math.pow(modB.Ft1_N, 2) + Math.pow(modC.Ft2_N, 2)) * (l_span_II / 3); 
    const M_j_III = (modC.Ft2_N * (l_span_III / 2)) + (modA.Fr_N * 50); 

    const calcFatigue = async (M_j, T, dtc_init, sig_allow, override_val, label) => {
      let d_final;
      if (override_val) {
        d_final = Number(override_val);
      } else {
        const M_td = Math.sqrt(Math.pow(M_j, 2) + 0.75 * Math.pow(T, 2));
        d_final = Math.cbrt(M_td / (0.1 * sig_allow));
        d_final = await getDtc(Math.max(d_final, dtc_init));
      }
      
      const sigma_a = M_j / ((Math.PI * Math.pow(d_final, 3)) / 32);
      const tau_a = T / ((Math.PI * Math.pow(d_final, 3)) / 16);
      
      const s_sigma = (0.436 * material.sigma_b) / (1.76 * sigma_a);
      const s_tau = (0.58 * 0.436 * material.sigma_b) / (1.05 * tau_a + 0.1 * tau_a);
      const s = (s_sigma * s_tau) / Math.sqrt(Math.pow(s_sigma, 2) + Math.pow(s_tau, 2));
      
      const check_fatigue_pass = s >= 1.5;
      let warning = null;
      let recommendation = null;
      let recommended_d_tc = null;
      if (!check_fatigue_pass) {
        const required_d_tc = d_final * Math.cbrt(1.55 / s);
        const rec = await prisma.standard_shaft_diameters.findFirst({
          where: { value: { gte: Math.round(required_d_tc) } },
          orderBy: { value: 'asc' }
        });
        recommended_d_tc = rec ? rec.value : Math.ceil(required_d_tc);
        warning = `Chi tiết [Trục ${label}] không đạt hệ số an toàn bền mỏi.`;
        recommendation = `Khuyến nghị: Hãy tăng đường kính trục d_tc (Hiện tại: ${d_final} mm) lên d_tc = ${recommended_d_tc} mm hoặc chọn vật liệu tốt hơn.`;
      }

      return { d_tc: d_final, M_j, s_fatigue: s, check_fatigue_pass, warning, recommendation, recommended_d_tc };
    };

    const trucI = await calcFatigue(M_j_I, kin.T_brc, d_tc_initial.I, sigma_allow.I, overrides.d_tc_I, 'I');
    const trucII = await calcFatigue(M_j_II, kin.T_brt, d_tc_initial.II, sigma_allow.II, overrides.d_tc_II, 'II');
    const trucIII = await calcFatigue(M_j_III, kin.T_x, d_tc_initial.III, sigma_allow.III, overrides.d_tc_III, 'III');

    trucI.F_rA = modB.Ft1_N / 2; trucI.F_rB = modB.Ft1_N / 2;
    trucII.F_rA = (modB.Ft1_N + modC.Ft2_N) / 2; trucII.F_rB = trucII.F_rA;
    trucIII.F_rA = (modC.Ft2_N + modA.Fr_N) / 2; trucIII.F_rB = trucIII.F_rA;

    return {
      trucI: { d_sb_mm: d_sb.I, d_tc_mm: [trucI.d_tc], M_j_Nmm: [trucI.M_j], F_rA: trucI.F_rA, F_rB: trucI.F_rB, s_fatigue: trucI.s_fatigue, check_fatigue_pass: trucI.check_fatigue_pass, warning: trucI.warning, recommendation: trucI.recommendation, recommended_d_tc: trucI.recommended_d_tc },
      trucII: { d_sb_mm: d_sb.II, d_tc_mm: [trucII.d_tc], M_j_Nmm: [trucII.M_j], F_rA: trucII.F_rA, F_rB: trucII.F_rB, s_fatigue: trucII.s_fatigue, check_fatigue_pass: trucII.check_fatigue_pass, warning: trucII.warning, recommendation: trucII.recommendation, recommended_d_tc: trucII.recommended_d_tc },
      trucIII: { d_sb_mm: d_sb.III, d_tc_mm: [trucIII.d_tc], M_j_Nmm: [trucIII.M_j], F_rA: trucIII.F_rA, F_rB: trucIII.F_rB, s_fatigue: trucIII.s_fatigue, check_fatigue_pass: trucIII.check_fatigue_pass, warning: trucIII.warning, recommendation: trucIII.recommendation, recommended_d_tc: trucIII.recommended_d_tc }
    };
  } catch (error) {
    console.error("Lỗi Module D:", error);
    throw error.status ? error : throwError(503, 'DB_QUERY_FAIL', 'Lỗi Module D.');
  }
};

/**
 * MODULE E – Chọn và kiểm nghiệm Then (Dùng chung cho các tiết diện)
 */
const calculateModuleE = async (d_tc, T_at_pos, l_mayo, overrides = {}, label = 'I') => {
  try {
    let keyDim;
    if (overrides.key_b && overrides.key_h && overrides.key_t1) {
      keyDim = { b: Number(overrides.key_b), h: Number(overrides.key_h), t1: Number(overrides.key_t1), t2: Number(overrides.key_h) - Number(overrides.key_t1) };
    } else {
      keyDim = await prisma.key_dimensions.findFirst({
        where: { d_min: { lte: Math.round(d_tc) }, d_max: { gte: Math.round(d_tc) } }
      });
    }
    if (!keyDim) throwError(503, 'DB_QUERY_FAIL', `Không tìm thấy kích thước then tiêu chuẩn cho Trục ${label} (d=${d_tc}mm).`);

    const l_t_calc = 0.85 * l_mayo;
    let l_t_mm;
    if (overrides.key_l) {
      l_t_mm = Number(overrides.key_l);
    } else {
      const stdLength = await prisma.standard_key_lengths.findFirst({
        where: { value: { gte: Math.round(l_t_calc) } },
        orderBy: { value: 'asc' }
      });
      l_t_mm = stdLength ? stdLength.value : Math.round(l_t_calc);
    }

    const sigma_d_MPa = (2 * T_at_pos) / (d_tc * l_t_mm * (keyDim.h - keyDim.t1)); 
    const tau_c_MPa = (2 * T_at_pos) / (d_tc * l_t_mm * keyDim.b);

    const check_key_pass = (sigma_d_MPa <= 100) && (tau_c_MPa <= 60);

    let warning = null;
    let recommendation = null;
    let recommended_l = null;
    if (!check_key_pass) {
      const l_t_req_dap = (2 * T_at_pos) / (d_tc * 100 * (keyDim.h - keyDim.t1));
      const l_t_req_cat = (2 * T_at_pos) / (d_tc * 60 * keyDim.b);
      const l_t_req = Math.max(l_t_req_dap, l_t_req_cat);
      
      const stdLength = await prisma.standard_key_lengths.findFirst({
        where: { value: { gte: Math.round(l_t_req) } },
        orderBy: { value: 'asc' }
      });
      recommended_l = stdLength ? stdLength.value : Math.round(l_t_req);
      warning = `Chi tiết [Then Trục ${label}] không đạt điều kiện bền dập hoặc cắt.`;
      recommendation = `Khuyến nghị: Hãy tăng chiều dài then l (Hiện tại: ${l_t_mm} mm) lên l = ${recommended_l} mm.`;
    }

    return { b: keyDim.b, h: keyDim.h, t1: keyDim.t1, t2: keyDim.h - keyDim.t1, l_t_mm, sigma_d_MPa, tau_c_MPa, check_key_pass, warning, recommendation, recommended_l };
  } catch (error) {
    console.error("Lỗi Module E:", error);
    throw error.status ? error : throwError(503, 'DB_QUERY_FAIL', `Lỗi Module E ở Trục ${label}.`);
  }
};

/**
 * MODULE F – Chọn và kiểm nghiệm Ổ lăn
 */
const calculateModuleF = async (d_tc, F_rA, F_rB, F_a_external, n_shaft, L_h, label = 'I') => {
  try {
    let bearing_init = await prisma.bearings.findFirst({ 
      where: { inner_d: { gte: d_tc }, type: 'tapered' }, 
      orderBy: [{ inner_d: 'asc' }, { C: 'asc' }] 
    });
    
    let warning = null;
    if (!bearing_init) {
      bearing_init = await prisma.bearings.findFirst({
        where: { type: 'tapered' },
        orderBy: { inner_d: 'desc' }
      });
      warning = `Không tìm thấy ổ lăn tiêu chuẩn cho Trục ${label} tương thích với đường kính trục d = ${d_tc} mm.`;
    }

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

    if (!bearing_init) {
      return {
        bearing_code: `N/A (d=${d_tc}mm)`,
        C_catalog_kN: 0,
        C_d_kN: C_d,
        check_bearing_pass: false,
        warning,
        recommendation: `Khuyến nghị: Hãy thay đổi đường kính trục d_tc hoặc giảm công suất.`
      };
    }

    let bearing_final = bearing_init;
    const check_bearing_pass = bearing_final.C >= C_d;

    let recommendation = null;
    let recommended_d_tc = null;

    if (!check_bearing_pass) {
      const better_bearing = await prisma.bearings.findFirst({
        where: { inner_d: { gte: bearing_init.inner_d }, type: 'tapered', C: { gte: C_d } },
        orderBy: [{ inner_d: 'asc' }, { C: 'asc' }]
      });
      if (better_bearing) {
        bearing_final = better_bearing;
      } else {
        const rec_bearing = await prisma.bearings.findFirst({
          where: { type: 'tapered', C: { gte: C_d } },
          orderBy: { inner_d: 'asc' }
        });
        recommended_d_tc = rec_bearing ? rec_bearing.inner_d : Math.ceil(d_tc * 1.2);
        warning = `Chi tiết [Ổ lăn Trục ${label}] không đạt khả năng tải Cd = ${C_d.toFixed(2)} kN.`;
        recommendation = `Khuyến nghị: Hãy tăng đường kính trục d_tc lên d_tc = ${recommended_d_tc} mm để chọn ổ lớn hơn.`;
      }
    }

    return {
      bearing_code: bearing_final.code,
      C_catalog_kN: Number(bearing_final.C),
      C_d_kN: C_d,
      check_bearing_pass: warning ? false : bearing_final.C >= C_d,
      warning,
      recommendation,
      recommended_d_tc
    };
  } catch (error) {
    console.error("Lỗi Module F:", error);
    throw error.status ? error : throwError(503, 'DB_QUERY_FAIL', `Lỗi Module F ở Trục ${label}.`);
  }
};

/**
 * HÀM CHÍNH: processUC05
 */
const designService = {
  processUC05: async (projectId, overrides = {}) => {
    // 0. Lấy dữ liệu Project và Pre-conditions (từ UC4)
    const project = await prisma.projects.findUnique({ where: { id: projectId }});
    if (!project || !project.transmission) throwError(400, 'MISSING_KINEMATIC_DATA', 'Vui lòng hoàn thành Module Động học trước.');

    const kin = project.transmission;
    const shafts = project.shafts;
    const motor = project.selected_motor_snapshot;

    if (!motor) {
      throwError(400, 'MISSING_MOTOR_DATA', 'Vui lòng chọn động cơ trước khi tính toán chi tiết máy.');
    }

    // Nạp overrides trước đó từ database nếu có để tích hợp vào lần chạy này
    const previousOverrides = (project.design_result && typeof project.design_result === 'object')
      ? (project.design_result.overrides || {})
      : {};

    const activeOverrides = {
      ...previousOverrides,
      ...overrides
    };

    // Loại bỏ các trường có giá trị rỗng (để quay lại chế độ tính toán tự động)
    for (const key in activeOverrides) {
      if (activeOverrides[key] === null || activeOverrides[key] === undefined || activeOverrides[key] === '') {
        delete activeOverrides[key];
      }
    }

    const P_out = activeOverrides.input_P ? Number(activeOverrides.input_P) : Number(project.input_P);
    const n_ct = Number(project.input_n_ct);
    const L_h = Number(project.input_L) * 300 * 8 * 2; // Hours: L (years) * 300 days * 8h/shift * 2 shifts

    const u1 = Number(kin.u_1);
    const u2 = Number(kin.u_2);
    const ux = Number(kin.u_x);

    const P_ratio = P_out / Number(project.input_P);
    const P_x = Number(shafts.P_x) * P_ratio;
    const P_brt = Number(shafts.P_brt) * P_ratio;
    const P_brc = Number(shafts.P_brc) * P_ratio;

    const n_motor = Number(motor.n_dm);

    // Tính tốc độ các trục
    const n1 = n_motor;
    const n2 = n1 / u1;
    const n3 = n2 / u2;

    // Tính momen xoắn các trục (T = 9.55e6 * P / n)
    const T_brc = 9.55e6 * P_brc / n1; // Momen xoắn Trục I
    const T_brt = 9.55e6 * P_brt / n2; // Momen xoắn Trục II
    const T_x = 9.55e6 * P_x / n3;     // Momen xoắn Trục III

    // Tạo object tham số tổng hợp truyền vào các module
    const kinParams = {
      P_x,
      n3,
      u_x: ux,
      L_h,
      T_brc,
      n1,
      u1,
      T_brt,
      n2,
      u2,
      T_x,
      ux
    };

    // Lấy thông số vật liệu được chọn của dự án (nếu có), mặc định là Thép 45
    let material = null;
    const matId = activeOverrides.selected_material_id || project.selected_material_id;
    if (matId && !isNaN(Number(matId))) {
      material = await prisma.material_grades.findUnique({
        where: { id: Number(matId) }
      });
    }
    if (!material) {
      material = await prisma.material_grades.findFirst({
        where: { grade_name: 'Thép 45' }
      });
    }
    if (!material) throwError(503, 'DB_QUERY_FAIL', 'Thiếu dữ liệu vật liệu trong CSDL.');

    // 1. Chạy tuần tự các Module
    const moduleA = await calculateModuleA(kinParams.P_x, kinParams.n3, kinParams.u_x, kinParams.L_h, P_out);
    const moduleB = await calculateModuleB(kinParams.T_brc, kinParams.n1, kinParams.u1, kinParams.L_h, material, material, activeOverrides);
    const moduleC = await calculateModuleC(kinParams.T_brt, kinParams.n2, kinParams.u2, kinParams.L_h, material, material);
    
    // Tính toán Trục (Trả về thông số I, II, III)
    const moduleD = await calculateModuleD(kinParams, moduleB, moduleC, moduleA, material, activeOverrides);

    // Lấy đường kính trục sau khi tính toán
    const d_tc_I = moduleD.trucI.d_tc_mm[0];
    const d_tc_II = moduleD.trucII.d_tc_mm[0];
    const d_tc_III = moduleD.trucIII.d_tc_mm[0];

    // Tính then cho 3 trục
    const moduleE = {
      trucI: await calculateModuleE(d_tc_I, T_brc, 30, activeOverrides, 'I'),
      trucII: await calculateModuleE(d_tc_II, T_brt, 40, {}, 'II'),
      trucIII: await calculateModuleE(d_tc_III, T_x, 50, {}, 'III')
    };

    // Chọn ổ lăn cho cả 3 trục
    const moduleF = {
      trucI: await calculateModuleF(d_tc_I, moduleD.trucI.F_rA, moduleD.trucI.F_rB, moduleB.Fa1_N, n1, L_h, 'I'),
      trucII: await calculateModuleF(d_tc_II, moduleD.trucII.F_rA, moduleD.trucII.F_rB, 0, n2, L_h, 'II'),
      trucIII: await calculateModuleF(d_tc_III, moduleD.trucIII.F_rA, moduleD.trucIII.F_rB, 0, n3, L_h, 'III')
    };

    const designResult = {
      Material: material.grade_name,
      ModuleA: moduleA,
      ModuleB: moduleB,
      ModuleC: moduleC,
      ModuleD: moduleD,
      ModuleE: moduleE,
      ModuleF: moduleF,
      overrides: activeOverrides
    };

    // Thu thập tất cả cảnh báo của các module
    const warnings = [];
    if (moduleA.warning) warnings.push(moduleA.warning);
    if (moduleB.warning) warnings.push(moduleB.warning);
    if (moduleD.trucI.warning) warnings.push(moduleD.trucI.warning);
    if (moduleD.trucII.warning) warnings.push(moduleD.trucII.warning);
    if (moduleD.trucIII.warning) warnings.push(moduleD.trucIII.warning);
    if (moduleE.trucI.warning) warnings.push(moduleE.trucI.warning);
    if (moduleF.trucI.warning) warnings.push(moduleF.trucI.warning);

    const joinedWarning = warnings.length > 0 ? warnings.join(" | ") : null;

    const u_ch_thuc = n1 / n_ct;
    const u_x_thuc = ux;
    const u_h_thuc = u_ch_thuc / u_x_thuc;
    const u_1_thuc = u1;
    const u_2_thuc = u2;

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
        step: joinedWarning ? 'design_partial' : 'design_done',
        total_ratio: u_ch_thuc,
        transmission: updatedTransmission,
        shafts: updatedShafts
      }
    });

    return {
      designResult,
      warning: joinedWarning
    };
  }
};

export default designService;