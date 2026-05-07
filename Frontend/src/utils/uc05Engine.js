/**
 * UC-05 Calculation Engine
 * Pipeline: Module A (Chain) → B (Bevel Gear) → C (Spur Gear) → D (Shafts) → E (Keys) → F (Bearings)
 * Ref: readme UC05 spec.md
 */

// ============================================================
// LOOKUP DATA (Tiêu chuẩn cơ khí)
// ============================================================
export const MATERIAL_GRADES = [
  { name: 'Thép 45',  HB: 215, sigma_b: 750, sigma_ch: 450, sigma_Hlim: 500, sigma_Flim: 387 },
  { name: 'Thép 40X', HB: 245, sigma_b: 850, sigma_ch: 550, sigma_Hlim: 560, sigma_Flim: 441 },
  { name: 'Thép 40XH',HB: 265, sigma_b: 800, sigma_ch: 600, sigma_Hlim: 600, sigma_Flim: 477 },
  { name: 'Thép 35XM',HB: 241, sigma_b: 900, sigma_ch: 800, sigma_Hlim: 552, sigma_Flim: 433 },
  { name: 'Thép 20X', HB: 480, sigma_b: 650, sigma_ch: 400, sigma_Hlim: 1150, sigma_Flim: 750 },
];

export const CHAIN_PARAMS = [
  { p: 12.70, Q: 18.2, q: 0.65, A: 39.6,  s_allow: 7.8, n_ref: 200 },
  { p: 15.875,Q: 22.7, q: 0.80, A: 51.5,  s_allow: 7.8, n_ref: 200 },
  { p: 19.05, Q: 31.8, q: 1.90, A: 106,   s_allow: 8.2, n_ref: 200 },
  { p: 25.40, Q: 56.7, q: 2.60, A: 180,   s_allow: 8.2, n_ref: 200 },
  { p: 31.75, Q: 88.5, q: 3.80, A: 262,   s_allow: 8.5, n_ref: 200 },
  { p: 38.10, Q: 127.0,q: 5.50, A: 395,   s_allow: 8.5, n_ref: 200 },
  { p: 44.45, Q: 172.4,q: 7.50, A: 473,   s_allow: 8.5, n_ref: 200 },
  { p: 50.80, Q: 226.8,q: 9.70, A: 645,   s_allow: 8.5, n_ref: 200 },
];

export const STANDARD_MODULES = [1, 1.25, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10];
export const STANDARD_CENTER_DISTANCES = [80, 100, 125, 140, 160, 180, 200, 225, 250, 280, 315];
export const STANDARD_SHAFT_DIAMS = [10,12,14,16,18,20,22,25,28,30,32,35,38,40,45,50,55,60,65,70,75,80,90,100,110,120];

// Bảng then tiêu chuẩn TCVN
export const KEY_TABLE = [
  { d_min: 17, d_max: 22, b: 6,  h: 6,  t1: 3.5 },
  { d_min: 22, d_max: 30, b: 8,  h: 7,  t1: 4.0 },
  { d_min: 30, d_max: 38, b: 10, h: 8,  t1: 5.0 },
  { d_min: 38, d_max: 44, b: 12, h: 8,  t1: 5.0 },
  { d_min: 44, d_max: 50, b: 14, h: 9,  t1: 5.5 },
  { d_min: 50, d_max: 58, b: 16, h: 10, t1: 6.0 },
  { d_min: 58, d_max: 65, b: 18, h: 11, t1: 7.0 },
  { d_min: 65, d_max: 75, b: 20, h: 12, t1: 7.5 },
  { d_min: 75, d_max: 85, b: 22, h: 14, t1: 9.0 },
  { d_min: 85, d_max:95,  b: 25, h: 14, t1: 9.0 },
];

// Catalog ổ lăn đơn giản hóa (ổ bi đỡ một dãy)
export const BEARING_CATALOG = [
  { code: '6204', d: 20, D: 47,  B: 14, C: 12.8, C0: 7.35 },
  { code: '6205', d: 25, D: 52,  B: 15, C: 14.0, C0: 8.50 },
  { code: '6206', d: 30, D: 62,  B: 16, C: 19.5, C0: 11.2 },
  { code: '6207', d: 35, D: 72,  B: 17, C: 25.5, C0: 15.3 },
  { code: '6208', d: 40, D: 80,  B: 18, C: 29.0, C0: 18.0 },
  { code: '6308', d: 40, D: 90,  B: 23, C: 41.0, C0: 22.4 },
  { code: '6209', d: 45, D: 85,  B: 19, C: 32.5, C0: 21.2 },
  { code: '6309', d: 45, D: 100, B: 25, C: 52.7, C0: 30.0 },
  { code: '6210', d: 50, D: 90,  B: 20, C: 35.0, C0: 23.2 },
  { code: '6310', d: 50, D: 110, B: 27, C: 62.0, C0: 36.0 },
  { code: '6211', d: 55, D: 100, B: 21, C: 43.5, C0: 29.0 },
  { code: '6311', d: 55, D: 120, B: 29, C: 71.5, C0: 44.0 },
  { code: '6212', d: 60, D: 110, B: 22, C: 52.0, C0: 36.0 },
  { code: '6312', d: 60, D: 130, B: 31, C: 81.9, C0: 50.0 },
];

// ============================================================
// HELPER FUNCTIONS
// ============================================================
function roundUpToEven(n) { return Math.ceil(n) % 2 === 0 ? Math.ceil(n) : Math.ceil(n) + 1; }
function roundDownToOdd(n) { let v = Math.floor(n); return v % 2 === 0 ? v - 1 : v; }
function nextStandard(arr, minVal) { return arr.find(v => v >= minVal) ?? arr[arr.length - 1]; }

// ============================================================
// MODULE A – BỘ TRUYỀN XÍCH ỐNG CON LĂN
// ============================================================
export function calcChain({ Px, n3, ux, Lh }) {
  // Số răng
  let z1 = roundDownToOdd(29 - 2 * ux);
  if (z1 < 17) z1 = 17;
  const z2 = Math.round(ux * z1);

  // Khoảng cách trục sơ bộ (khuyến nghị 30-50p, chọn 40p)
  const chainData = CHAIN_PARAMS[3]; // p=25.4 làm mặc định
  const p = chainData.p;
  const a_sb = 40 * p;

  // Số mắt xích (làm tròn lên số chẵn)
  const x_raw = (2 * a_sb) / p + (z1 + z2) / 2 + Math.pow(z2 - z1, 2) * p / (4 * Math.PI * Math.PI * a_sb);
  const x = roundUpToEven(x_raw);

  // Khoảng cách trục chính xác
  const delta = x - (z1 + z2) / 2;
  const a_star = (p / 4) * (delta + Math.sqrt(delta * delta - 2 * Math.pow((z2 - z1) / Math.PI, 2)));
  const a = a_star * 0.997; // Giảm 0.3% tránh quá căng

  // Lực vòng Ft và kiểm tra
  const v = (z1 * p * n3) / (60 * 1000); // m/s
  const Ft = Px * 1000 / v;
  const F0 = 9.81 * 6 * chainData.q * a / 1000; // Lực căng do trọng lượng
  const Fv = chainData.q * v * v;
  const s = (chainData.Q * 1000) / (1.2 * Ft + F0 + Fv);

  // Ứng suất tiếp xúc
  const sigmaH = 0.47 * Math.sqrt(0.44 * (1.2 * Ft + Fv) / (chainData.A * chainData.q));

  // Lực tác dụng lên trục
  const Fr_chain = 1.15 * Ft; // Hệ số tải trọng động k_d = 1.15

  return {
    z1: Math.round(z1), z2: Math.round(z2),
    p: chainData.p, x: Math.round(x),
    a: Math.round(a), s: s.toFixed(2),
    sigmaH: sigmaH.toFixed(1), s_allow: chainData.s_allow,
    Fr: Math.round(Fr_chain),
    status: s >= chainData.s_allow && sigmaH <= 600 ? 'success' : 'error',
    note: s < chainData.s_allow ? `s = ${s.toFixed(2)} < [s] = ${chainData.s_allow}` : 'Đạt điều kiện an toàn',
  };
}

// ============================================================
// MODULE B – BÁNH RĂNG CÔN (CẤP NHANH)
// ============================================================
export function calcBevelGear({ T1, n1, u1, Lh, material, module: m_tc }) {
  const z1 = 16;
  const z2 = Math.round(u1 * z1);
  const sigma_Hlim = material.sigma_Hlim;
  const sigma_H_allow = sigma_Hlim * 0.9; // Hệ số tuổi thọ đơn giản hóa

  // Hệ số phân bố tải K_be
  const K_be = 0.3;
  // K_Hβ (hệ số tải trọng động, phân bố tải)
  const K_Hbeta = 1.15;

  // Chiều dài côn ngoài
  const Re = 50 * Math.sqrt(u1 * u1 + 1) * Math.cbrt(
    (T1 * K_Hbeta) / (sigma_H_allow * sigma_H_allow * u1 * K_be * Math.pow(1 - K_be, 2))
  );

  // Module vòng ngoài (Ưu tiên dùng module người dùng chọn, nếu không có mới lấy theo tính toán)
  const m_te_calc = Re / (z1 * Math.sqrt(u1 * u1 + 1) / 2);
  const m_te = m_tc ? m_tc : nextStandard(STANDARD_MODULES, m_te_calc);


  // Chiều rộng vành
  const b = Math.round(K_be * Re);
  // Đường kính vòng chia ngoài
  const de1 = m_te * z1;
  // Đường kính trung bình
  const dm1 = de1 * (1 - K_be / 2);

  // Lực tác dụng lên trục (lực vòng, hướng tâm, dọc trục)
  const delta1 = Math.atan(1 / u1); // Góc côn chia bánh nhỏ (rad)
  const Ft = 2 * T1 / dm1; // N (T1 tính bằng N.mm, dm1 tính bằng mm)
  const Fr = Ft * Math.tan(20 * Math.PI / 180) * Math.cos(delta1);
  const Fa = Ft * Math.tan(20 * Math.PI / 180) * Math.sin(delta1);

  // Kiểm nghiệm ứng suất tiếp xúc
  const Ze = 274; const Zepsilon = 0.88; const Zv = 1.76;
  const K_H = 1.15 * 1.05; // K_Hbeta * K_Hv
  const sigmaH = Ze * Zv * Zepsilon * Math.sqrt(
    (2 * T1 * K_H * (u1 * u1 + 1)) / (0.85 * b * dm1 * dm1 * u1)
  );

  return {
    z1, z2, m_te, Re: Re.toFixed(1), de1: de1.toFixed(1), b: Math.round(b),
    sigmaH: sigmaH.toFixed(1), sigma_H_allow: sigma_H_allow.toFixed(0),
    Ft: Math.round(Ft), Fr: Math.round(Fr), Fa: Math.round(Fa),
    status: sigmaH <= sigma_H_allow ? 'success' : 'error',
    message: sigmaH <= sigma_H_allow
      ? `Đạt bền tiếp xúc: σH = ${sigmaH.toFixed(0)} ≤ [σH] = ${sigma_H_allow.toFixed(0)} MPa`
      : `KHÔNG ĐẠT: σH = ${sigmaH.toFixed(0)} > [σH] = ${sigma_H_allow.toFixed(0)} MPa`,
  };
}

// ============================================================
// MODULE C – BÁNH RĂNG TRỤ (CẤP CHẬM)
// ============================================================
export function calcSpurGear({ T2, n2, u2, Lh, material, module: m_tc }) {
  const sigma_H_allow = material.sigma_Hlim * 0.9;

  // Khoảng cách trục sơ bộ
  const K_Hbeta = 1.1; const psi_ba = 0.315;
  const aw_calc = 49.5 * (u2 + 1) * Math.cbrt(
    (T2 * K_Hbeta) / (sigma_H_allow * sigma_H_allow * u2 * psi_ba)
  );
  const aw = m_tc 
    ? (m_tc * (Math.floor((2 * aw_calc) / (m_tc * (u2 + 1))) + Math.round(u2 * Math.floor((2 * aw_calc) / (m_tc * (u2 + 1)))))) / 2
    : nextStandard(STANDARD_CENTER_DISTANCES, aw_calc);


  // Số răng
  let z1 = Math.floor((2 * aw) / (m_tc * (u2 + 1)));
  if (z1 < 17) z1 = 17;
  const z2 = Math.round(u2 * z1);
  const u_actual = z2 / z1;

  // Khoảng cách trục thực tế
  const aw_actual = (m_tc * (z1 + z2)) / 2;
  const bw = Math.round(psi_ba * aw_actual);

  // Đường kính vòng chia
  const d1 = m_tc * z1;
  const d2 = m_tc * z2;

  // Lực tác dụng
  const Ft = (2 * T2) / d1; // T2 (N.mm), d1 (mm)
  const Fr = Ft * Math.tan(20 * Math.PI / 180);

  // Kiểm nghiệm ứng suất tiếp xúc
  const Ze = 274; const Zepsilon = 0.88; const Zv = 1.76;
  const K_H = 1.1 * 1.05;
  const sigmaH = Ze * Zv * Zepsilon * Math.sqrt(
    (2 * T2 * K_H * (u_actual + 1)) / (bw * d1 * d1 * u_actual)
  );

  const ratioDeviation = Math.abs(u_actual - u2) / u2;

  return {
    aw: Math.round(aw_actual), m: m_tc, z1, z2,
    d1: d1.toFixed(1), d2: d2.toFixed(1), bw: Math.round(bw),
    sigmaH: sigmaH.toFixed(1), sigma_H_allow: sigma_H_allow.toFixed(0),
    Ft: Math.round(Ft), Fr: Math.round(Fr), Fa: 0,
    u_actual: u_actual.toFixed(3), ratioDeviation: (ratioDeviation * 100).toFixed(1),
    status: sigmaH <= sigma_H_allow ? 'success' : 'error',
    warning: ratioDeviation > 0.04 ? `Sai lệch tỉ số truyền: ${(ratioDeviation * 100).toFixed(1)}% > 4%` : null,
    message: sigmaH <= sigma_H_allow
      ? `Đạt bền: σH = ${sigmaH.toFixed(0)} ≤ [σH] = ${sigma_H_allow.toFixed(0)} MPa`
      : `KHÔNG ĐẠT: σH = ${sigmaH.toFixed(0)} > [σH] = ${sigma_H_allow.toFixed(0)} MPa`,
  };
}

// ============================================================
// MODULE D – THIẾT KẾ TRỤC
// ============================================================
export function calcShaft({ T, tau_allow = 25 }) {
  // Đường kính sơ bộ theo công thức tiêu chuẩn
  const dsb = Math.cbrt((16 * T) / (Math.PI * tau_allow));
  const dtc = nextStandard(STANDARD_SHAFT_DIAMS, dsb);

  // Moment tương đương (giả định momen uốn ≈ 0.8 * T cho thiết kế sơ bộ)
  const Muon = 0.8 * T;
  const Mtd = Math.sqrt(Muon * Muon + 0.75 * T * T);
  const sigma_allow = 60; // MPa - ứng suất uốn cho phép
  const d_exact = Math.cbrt(Mtd / (0.1 * sigma_allow));
  const dtc_exact = nextStandard(STANDARD_SHAFT_DIAMS, d_exact);

  // Hệ số an toàn mỏi (đơn giản hóa)
  const s_sigma = 2.5;
  const s_tau = 3.0;
  const s = (s_sigma * s_tau) / Math.sqrt(s_sigma * s_sigma + s_tau * s_tau);

  return {
    dsb: dsb.toFixed(1), dtc, dtc_exact,
    Mtd: Math.round(Mtd), s: s.toFixed(2),
    status: s >= 1.5 ? 'success' : 'error',
  };
}

// ============================================================
// MODULE E – KIỂM NGHIỆM THEN
// ============================================================
export function calcKey({ d_tc, T, l_mayo = null }) {
  const key = KEY_TABLE.find(k => d_tc >= k.d_min && d_tc < k.d_max);
  if (!key) return { status: 'error', message: 'Không tìm thấy then tiêu chuẩn cho đường kính này.' };

  const lt = l_mayo ? Math.max(Math.round(0.85 * l_mayo), key.b * 2) : Math.round(d_tc * 0.8);

  // Ứng suất dập
  const sigma_d = (2 * T) / (d_tc * lt * (key.h - key.t1));
  // Ứng suất cắt
  const tau_c = (2 * T) / (d_tc * lt * key.b);

  return {
    b: key.b, h: key.h, t1: key.t1, lt,
    sigma_d: sigma_d.toFixed(1), tau_c: tau_c.toFixed(1),
    sigma_d_allow: 100, tau_c_allow: 60,
    status: sigma_d <= 100 && tau_c <= 60 ? 'success' : 'error',
    message: sigma_d <= 100 && tau_c <= 60
      ? `Đạt bền dập và cắt`
      : `KHÔNG ĐẠT: ${sigma_d > 100 ? `σd=${sigma_d.toFixed(0)}MPa>100` : ''} ${tau_c > 60 ? `τc=${tau_c.toFixed(0)}MPa>60` : ''}`,
  };
}

// ============================================================
// MODULE F – KIỂM NGHIỆM Ổ LĂN
// ============================================================
export function calcBearing({ d_tc, Fr, n, Lh }) {
  // Chọn ổ có đường kính lỗ = d_tc
  const candidates = BEARING_CATALOG.filter(b => b.d === d_tc);
  if (candidates.length === 0) {
    // Lấy ổ nhỏ nhất có d >= d_tc
    const fallback = BEARING_CATALOG.find(b => b.d >= d_tc);
    if (!fallback) return { status: 'error', message: `Không tìm thấy ổ lăn cho d=${d_tc}mm` };
    candidates.push(fallback);
  }

  // Khả năng tải động tính toán (ổ bi đỡ, m=3)
  const Lmvong = (n * Lh * 60) / 1000000; // triệu vòng
  const Cd = Fr * Math.cbrt(Lmvong) / 1000; // kN

  // Tải tĩnh
  const Qt = 0.6 * Fr / 1000; // kN (đơn giản hóa, không có lực dọc trục)

  // Chọn ổ thỏa mãn
  const selected = candidates.find(b => b.C >= Cd && b.C0 >= Qt) ?? candidates[candidates.length - 1];

  return {
    code: selected.code, d: selected.d, D: selected.D, B: selected.B,
    C_cat: selected.C, C0_cat: selected.C0,
    Cd: Cd.toFixed(2), Qt: Qt.toFixed(2),
    status: selected.C >= Cd && selected.C0 >= Qt ? 'success' : 'error',
    message: selected.C >= Cd
      ? `C = ${selected.C} kN ≥ Cd = ${Cd.toFixed(1)} kN. Đạt!`
      : `KHÔNG ĐẠT: C = ${selected.C} kN < Cd = ${Cd.toFixed(1)} kN`,
  };
}

// ============================================================
// PIPELINE ORCHESTRATOR (A → B → C → D → E → F)
// ============================================================
export function runPipeline({ kinematics, material, bevelModule, spurModule }) {
  const data = kinematics;
  const Lh = 2 * 300 * 8 * (data?.L_service ?? 10); // 2 ca, 300 ngày, 8h

  // ---- MODULE A ----
  const chainRes = calcChain({
    Px: data?.P_III ?? 4.5,
    n3: data?.n_III ?? 100,
    ux: data?.u_x_sb ?? 3.15,
    Lh,
  });

  // ---- MODULE B ----
  const bevelRes = calcBevelGear({
    T1: (data?.T_I ?? 45000),
    n1: data?.n_I ?? 900,
    u1: data?.u_1 ?? 2.5,
    Lh,
    material,
    module: bevelModule,
  });

  // ---- MODULE C ----
  const spurRes = calcSpurGear({
    T2: (data?.T_II ?? 142000),
    n2: data?.n_II ?? 360,
    u2: data?.u_2 ?? 3.15,
    Lh,
    material,
    module: spurModule,
  });

  // ---- MODULE D ----
  const shaftI   = calcShaft({ T: data?.T_I   ?? 45000,  tau_allow: 20 });
  const shaftII  = calcShaft({ T: data?.T_II  ?? 142000, tau_allow: 20 });
  const shaftIII = calcShaft({ T: data?.T_III ?? 450000, tau_allow: 20 });

  // ---- MODULE E ----
  const keyI   = calcKey({ d_tc: shaftI.dtc,   T: data?.T_I   ?? 45000  });
  const keyII  = calcKey({ d_tc: shaftII.dtc,  T: data?.T_II  ?? 142000 });
  const keyIII = calcKey({ d_tc: shaftIII.dtc, T: data?.T_III ?? 450000 });

  // ---- MODULE F ----
  const bearI   = calcBearing({ d_tc: shaftI.dtc,   Fr: bevelRes.Fr, n: data?.n_I   ?? 900,  Lh });
  const bearII  = calcBearing({ d_tc: shaftII.dtc,  Fr: spurRes.Fr,  n: data?.n_II  ?? 360,  Lh });
  const bearIII = calcBearing({ d_tc: shaftIII.dtc, Fr: chainRes.Fr, n: data?.n_III ?? 100,  Lh });

  return {
    chain: chainRes,
    bevel: bevelRes,
    spur:  spurRes,
    shafts: { I: shaftI, II: shaftII, III: shaftIII },
    keys:   { I: keyI,   II: keyII,   III: keyIII   },
    bearings: { I: bearI, II: bearII, III: bearIII  },
    allPassed: [chainRes, bevelRes, spurRes]
      .every(r => r.status === 'success') &&
      [shaftI, shaftII, shaftIII].every(r => r.status === 'success'),
  };
}
