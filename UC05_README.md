# UC-05: Tính toán Thiết kế Chi tiết Máy

> **Đồ án Đa ngành – Nhóm 3**  
> Use Case 05 — Tự động hóa tính toán cụm chi tiết máy từ dữ liệu động học (UC4)

---

## Mục lục

1. [Tổng quan & Pre-conditions](#1-tổng-quan--pre-conditions)
2. [Thứ tự thực thi bắt buộc (Data Flow)](#2-thứ-tự-thực-thi-bắt-buộc-data-flow)
3. [Module A – Bộ truyền xích](#3-module-a--bộ-truyền-xích-trục-iii--thùng-trộn)
4. [Module B – Bánh răng côn cấp nhanh](#4-module-b--bánh-răng-côn-cấp-nhanh-trục-i--ii)
5. [Module C – Bánh răng trụ cấp chậm](#5-module-c--bánh-răng-trụ-cấp-chậm-trục-ii--iii)
6. [Module D – Thiết kế Trục](#6-module-d--thiết-kế-trục-i-ii-iii)
7. [Module E – Chọn và kiểm nghiệm Then](#7-module-e--chọn-và-kiểm-nghiệm-then)
8. [Module F – Chọn và kiểm nghiệm Ổ lăn](#8-module-f--chọn-và-kiểm-nghiệm-ổ-lăn)
9. [Exception Flows](#9-exception-flows)
10. [Database Schema tổng hợp](#10-database-schema-tổng-hợp)
11. [Ghi chú kỹ thuật & Design Patterns](#11-ghi-chú-kỹ-thuật--design-patterns)

---

## 1. Tổng quan & Pre-conditions

> ⚠️ **UC-05 KHÔNG có input thủ công từ người dùng.**  
> Toàn bộ dữ liệu đầu vào được đọc từ CSDL dựa trên `project_id` hiện tại, lấy từ kết quả của UC-04.

### Bảng input từ `kinematic_results`

| Biến     | Tên đại lượng              | Đơn vị | Cột DB                      |
|----------|----------------------------|--------|-----------------------------|
| `P_brc`  | Công suất trục I           | kW     | `kinematic_results.P_brc`   |
| `P_brt`  | Công suất trục II          | kW     | `kinematic_results.P_brt`   |
| `P_x`    | Công suất trục III         | kW     | `kinematic_results.P_x`     |
| `n1`     | Số vòng quay trục I        | vg/ph  | `kinematic_results.n1`      |
| `n2`     | Số vòng quay trục II       | vg/ph  | `kinematic_results.n2`      |
| `n3`     | Số vòng quay trục III      | vg/ph  | `kinematic_results.n3`      |
| `T_brc`  | Moment xoắn trục I         | N·mm   | `kinematic_results.T_brc`   |
| `T_brt`  | Moment xoắn trục II        | N·mm   | `kinematic_results.T_brt`   |
| `T_x`    | Moment xoắn trục III       | N·mm   | `kinematic_results.T_x`     |
| `u1`     | Tỉ số truyền bánh răng côn | —      | `kinematic_results.u1`      |
| `u2`     | Tỉ số truyền bánh răng trụ | —      | `kinematic_results.u2`      |
| `u_x`    | Tỉ số truyền bộ truyền xích| —      | `kinematic_results.u_x`     |
| `L_h`    | Thời gian phục vụ          | giờ    | `kinematic_results.L_h`     |

---

## 2. Thứ tự thực thi bắt buộc (Data Flow)

> ⚑ **Các module PHẢI chạy theo đúng thứ tự sau. Module sau phụ thuộc output của module trước.**

| Thứ tự | Module | Output bắt buộc trước khi tiếp tục |
|--------|--------|-------------------------------------|
| ① A, B, C | Bộ truyền & Bánh răng | `Ft`, `Fr`, `Fa` từ bánh răng côn & trụ; `Fr_chain` từ xích → input Module D |
| ② D.1–D.3 | Sơ bộ trục + Biểu đồ | `d_sb`, `M_j` tại mọi tiết diện → input D.4 |
| ③ D.4 | Đường kính chính xác | `d_tc` tại mỗi tiết diện → input E (then) và F (ổ lăn) |
| ④ E, F | Kiểm nghiệm | `σ_d`, `τ_c` (then), `C_d` (ổ lăn) — cuối cùng |

---

## 3. Module A – Bộ truyền xích (Trục III → Thùng trộn)

### A.1 API Contract

**Request Payload (từ UC4):**

| Trường JSON | Kiểu    | Mô tả                          |
|-------------|---------|--------------------------------|
| `P_x`       | Float   | Công suất trục III (kW)        |
| `n3`        | Float   | Số vòng quay trục III (vg/ph)  |
| `u_x`       | Float   | Tỉ số truyền bộ truyền xích    |
| `L_h`       | Integer | Thời gian phục vụ (giờ)        |

**Response Payload (lưu DB + trả FE):**

| Trường JSON    | Kiểu  | Giá trị mẫu | Mô tả                          |
|----------------|-------|-------------|--------------------------------|
| `z1`           | Int   | 23          | Số răng đĩa dẫn                |
| `z2`           | Int   | 66          | Số răng đĩa bị dẫn             |
| `p_mm`         | Float | 31.75       | Bước xích (mm)                 |
| `x_links`      | Int   | 106         | Số mắt xích (chẵn)             |
| `a_mm`         | Float | 948.65      | Khoảng cách trục chính xác (mm)|
| `v_ms`         | Float | 2.62        | Vận tốc xích (m/s)             |
| `s_safety`     | Float | 25.0        | Hệ số an toàn                  |
| `sigma_H_MPa`  | Float | 507.9       | Ứng suất tiếp xúc (MPa)        |
| `Fr_N`         | Float | 3150.7      | Lực tác dụng lên trục (N)      |
| `check_s_pass` | Bool  | true        | `s ≥ [s]`: đạt/không đạt       |
| `check_H_pass` | Bool  | true        | `σ_H ≤ 600 MPa`: đạt/không đạt|

### A.2 Database Dependencies

| Bảng DB             | Truy vấn (SELECT)                                     | Mục đích                                                    |
|---------------------|-------------------------------------------------------|-------------------------------------------------------------|
| `chain_params`      | `WHERE p = {p_chon} → Q, q, A, [s]`                  | Tải phá hủy Q, khối lượng q, diện tích A, hệ số an toàn cho phép |
| `kinematic_results` | `WHERE project_id = {id}`                             | Lấy `P_x`, `n3`, `u_x`, `L_h`                              |

### A.3 Step-by-Step Logic (Pseudo-code)

| Bước   | Phép tính / Điều kiện                                                                                                   | Đơn vị | Ghi chú                          |
|--------|-------------------------------------------------------------------------------------------------------------------------|--------|----------------------------------|
| **A1** | `z1 = 29 - 2 * u_x` → làm tròn xuống số lẻ gần nhất ≥ 17                                                              | răng   | Kết quả mẫu: `z1 = 23`          |
| **A2** | `z2 = round(u_x * z1)` (z2 ≤ 120)                                                                                      | răng   | Kết quả mẫu: `z2 = 66`          |
| **A3** | `u_x_tt = z2 / z1`                                                                                                      | —      | Tỉ số truyền thực tế             |
| **A4** | `k_z = 25 / z1`                                                                                                         | —      | Hệ số số răng                    |
| **A5** | `k_n = 200 / n3` (n01 = 200 vg/ph là hằng số)                                                                          | —      | Hệ số số vòng quay               |
| **A6** | `k = k0 * ka * kdc * kd * kc * kb` với: k0=1, ka=1, kdc=1, kd=1.3, kc=1, kb=1.25                                     | —      | k mẫu ≈ 2.11                     |
| **A7** | `Pt = P_x * k / (k_z * k_n)`                                                                                           | kW     | Công suất tính toán; mẫu ≈ 39.25 |
| **A8** | `SELECT p FROM chain_params WHERE [P] >= Pt AND n_ref = 200 ORDER BY p ASC LIMIT 1`                                     | mm     | Chọn p tiêu chuẩn nhỏ nhất thỏa mãn |
| **A9** | `a_sb = 40 * p`                                                                                                         | mm     | Khoảng cách trục sơ bộ           |
| **A10**| `x = 2*a_sb/p + (z1+z2)/2 + (z2-z1)^2 * p / (4 * PI^2 * a_sb)` → làm tròn lên số chẵn                               | mắt   | Số mắt xích                      |
| **A11**| `a_star = p/4 * (x - (z1+z2)/2 + SQRT((x-(z1+z2)/2)^2 - 2*((z2-z1)/PI)^2))`                                         | mm     | Khoảng cách chính xác            |
| **A12**| `a = a_star - 0.003 * a_star`                                                                                           | mm     | Giảm 0.3% để tránh quá căng      |
| **A13**| `v = z1 * p * n3 / 60000`                                                                                               | m/s    | Vận tốc xích; mẫu ≈ 2.62        |
| **A14**| `i = z1 * n3 / (60 * x)` — nếu `i > [i_max]`: WARNING                                                                 | 1/s    | Kiểm tra số va đập               |
| **A15**| `Ft = 1000 * P_x / v`                                                                                                   | N      | Lực vòng                         |
| **A16**| `q = SELECT q FROM chain_params WHERE p = {p_chon}`                                                                    | kg/m   | Khối lượng 1m xích               |
| **A17**| `Fv = q * v^2`                                                                                                          | N      | Lực ly tâm                       |
| **A18**| `F0 = 9.81 * 6 * q * a / 1000` (kf=6: trục nằm ngang)                                                                 | N      | Lực căng nhánh chùng             |
| **A19**| `Q = SELECT Q FROM chain_params WHERE p = {p_chon}`                                                                    | kN     | Tải phá hủy                      |
| **A20**| `s = Q*1000 / (1.2 * Ft + F0 + Fv)`                                                                                    | —      | Hệ số an toàn; mẫu ≈ 25.0       |
| **A21**| `s_allow = SELECT [s] FROM chain_params WHERE p = {p_chon}`                                                            | —      | [s] mẫu ≈ 8.5                    |
| **A22**| `IF s >= s_allow: check_s_pass = true ELSE: check_s_pass = false → EF1`                                                | —      |                                  |
| **A23**| `A_area = SELECT A FROM chain_params WHERE p = {p_chon}`                                                               | mm²    | Diện tích chiếu mắt xích         |
| **A24**| `Fvd = 13e-7 * n3 * p^3 * 3.8` (m=3.8 kg/m cho p=31.75, tra bảng)                                                    | N      | Lực va đập                       |
| **A25**| `sigma_H = 0.47 * SQRT(0.44 * (Ft*1.2 + Fvd) / (A_area * 3.8))`                                                      | MPa    | Ứng suất tiếp xúc; mẫu ≈ 507.9  |
| **A26**| `IF sigma_H <= 600: check_H_pass = true ELSE: check_H_pass = false → EF1` ([σ_H]=600 MPa thép tôi)                    | —      |                                  |
| **A27**| `Fr = 1.15 * Ft` (kx=1.15 nằm ngang)                                                                                   | N      | Lực lên trục; mẫu ≈ 3150.7      |

### A.4 Unit Test Data

**Input mẫu:** `P_x = 7.215 kW` | `n3 = 225.06 vg/ph` | `u_x = 2.873` | `L_h = 48000 h`

| Biến output    | Giá trị kỳ vọng | Điều kiện kiểm tra |
|----------------|-----------------|--------------------|
| `z1`           | **23**          |                    |
| `z2`           | **66**          |                    |
| `p_mm`         | **31.75**       |                    |
| `x_links`      | **106**         | Số chẵn            |
| `a_mm`         | **948.65**      |                    |
| `v_ms`         | **2.62**        |                    |
| `s_safety`     | **25.0**        | s ≥ 8.5 ✓          |
| `sigma_H_MPa`  | **507.9**       | ≤ 600 MPa ✓        |
| `Fr_N`         | **3150.7**      |                    |

---

## 4. Module B – Bánh răng côn cấp nhanh (Trục I → II)

### B.1 API Contract

**Request Payload:**

| Trường  | Kiểu  | Mô tả / Nguồn                                           |
|---------|-------|----------------------------------------------------------|
| `T_brc` | Float | Moment xoắn trục I (N·mm) — từ UC4                      |
| `n1`    | Float | Số vòng quay trục I (vg/ph) — từ UC4                    |
| `u1`    | Float | Tỉ số truyền cấp nhanh — từ UC4                         |
| `L_h`   | Int   | Thời gian phục vụ giờ — từ UC4                           |
| `HB1`   | Int   | Độ cứng bánh dẫn (mặc định 250) — từ `material_grades`  |
| `HB2`   | Int   | Độ cứng bánh bị dẫn (mặc định 230) — từ `material_grades`|

**Response Payload:**

| Trường JSON         | Kiểu  | Giá trị mẫu | Mô tả                              |
|---------------------|-------|-------------|------------------------------------|
| `sigma_H_allow_MPa` | Float | 481.82      | Ứng suất tiếp xúc cho phép (MPa)   |
| `Re_mm`             | Float | 111.95      | Chiều dài côn ngoài (mm)           |
| `b_mm`              | Float | 28.5        | Chiều rộng vành răng (mm)          |
| `m_e_mm`            | Float | 2.5         | Mô đun ngoài tiêu chuẩn (mm)       |
| `z1_gear`           | Int   | 16          | Số răng bánh nhỏ                   |
| `z2_gear`           | Int   | 55          | Số răng bánh lớn                   |
| `d_m1_mm`           | Float | 54.53       | Đường kính trung bình bánh nhỏ (mm)|
| `d_m2_mm`           | Float | 187.57      | Đường kính trung bình bánh lớn (mm)|
| `Ft1_N`             | Float | 943.5       | Lực vòng (N) — output sang Module D|
| `Fr1_N`             | Float | 329.8       | Lực hướng tâm (N)                  |
| `Fa1_N`             | Float | 95.9        | Lực dọc trục (N)                   |
| `check_H_pass`      | Bool  | true        | `σ_H ≤ [σ_H]`                      |
| `check_F_pass`      | Bool  | true        | `σ_F ≤ [σ_F]`                      |

### B.2 Database Dependencies

| Bảng DB               | Truy vấn                                           | Mục đích                                  |
|-----------------------|----------------------------------------------------|-------------------------------------------|
| `material_grades`     | `WHERE grade_name = 'C40XH'`                       | σ_b, HB, σ_Hlim = 2×HB+70, σ_Flim = 1.8×HB |
| `standard_modules`    | `ORDER BY value ASC`                               | Chọn m_e tiêu chuẩn ≥ m_tính             |
| `kinematic_results`   | `WHERE project_id = {id}`                          | T_brc, n1, u1, L_h                        |

### B.3 Step-by-Step Logic

| Bước   | Phép tính                                                                                                                  | Đơn vị | Ghi chú                                        |
|--------|----------------------------------------------------------------------------------------------------------------------------|--------|------------------------------------------------|
| **B1** | `N_HO = 30 * HB^2.4` (tính cho cả HB1 và HB2)                                                                             | chu kỳ |                                                |
| **B2** | `N_HE = 60 * 1 * n * L_h` (c=1 lần ăn khớp/vòng) — tính cho n1 và n2                                                     | chu kỳ |                                                |
| **B3** | `IF N_HE >= N_HO: K_HL = 1 ELSE: K_HL = (N_HO/N_HE)^(1/6)`                                                               | —      |                                                |
| **B4** | `sigma_Hlim = 2 * HB + 70` (cho cả bánh 1 và bánh 2)                                                                      | MPa    | Mẫu: HB1=250→570; HB2=230→530                 |
| **B5** | `sigma_H_allow_i = sigma_Hlim_i * K_HL_i / 1.1` (S_H=1.1)                                                                | MPa    | Mẫu: 518.18 và 481.82                          |
| **B6** | `sigma_H_allow = MIN(sigma_H_allow_1, sigma_H_allow_2)`                                                                   | MPa    | Bánh côn lấy min; mẫu = 481.82                |
| **B7** | `sigma_Flim = 1.8 * HB`                                                                                                    | MPa    | Mẫu: 450, 414                                  |
| **B8** | `sigma_F_allow_i = sigma_Flim_i * 1 * K_FL_i / 1.75` (K_FC=1, S_F=1.75)                                                  | MPa    |                                                |
| **B9** | `K_be = 0.25` (hằng số, hoặc lấy từ config)                                                                               | —      |                                                |
| **B10**| `K_Hbeta = 1.13` (bảng 6.21, HB≤350 — hằng số)                                                                           | —      |                                                |
| **B11**| `Re = 50 * SQRT(u1^2+1) * CBRT(T_BRC * K_Hbeta / (sigma_H_allow^2 * u1 * K_be * (1-K_be)^2))`                           | mm     | K_R=50; mẫu ≈ 111.95                           |
| **B12**| `b = K_be * Re` → làm tròn nguyên                                                                                          | mm     | Mẫu ≈ 28.5                                     |
| **B13**| `z1_gear = 16` (bảng 6.22, u≈3.45 → z1=16)                                                                                | răng   | Hằng số tra bảng theo u1                       |
| **B14**| `z2_gear = ROUND(u1 * z1_gear)`                                                                                            | răng   | Mẫu: 55                                        |
| **B15**| `delta1 = ATAN(z1_gear / z2_gear)` (radian)                                                                               | rad    | Góc côn chia bánh nhỏ                          |
| **B16**| `delta2 = PI/2 - delta1`                                                                                                   | rad    |                                                |
| **B17**| `m_tm_calc = 2*Re*(1-0.5*K_be) / (SQRT(u1^2+1) * z1_gear)`                                                               | mm     |                                                |
| **B18**| `m_e_calc = m_tm_calc / (1 - 0.5*K_be)`                                                                                   | mm     |                                                |
| **B19**| `m_e = SELECT value FROM standard_modules WHERE value >= m_e_calc ORDER BY value ASC LIMIT 1`                              | mm     | Mẫu: 2.5 mm                                    |
| **B20**| `m_tm = m_e * (1 - 0.5 * K_be)`                                                                                            | mm     | Mô đun trung bình sau khi chọn tiêu chuẩn      |
| **B21**| `d_m1 = m_tm * z1_gear; d_m2 = m_tm * z2_gear`                                                                            | mm     | Mẫu: 54.53, 187.57                             |
| **B22**| `v = PI * d_m1 * n1 / 60000`                                                                                               | m/s    | Vận tốc vòng; mẫu ≈ 8.38                       |
| **B23**| `IF v <= 3: cap_cx=9 ELIF v<=6: cap_cx=8 ELSE: cap_cx=7`                                                                  | —      | Cấp chính xác → tra K_Hv                       |
| **B24**| `Ft1 = 2*T_brc / d_m1`                                                                                                     | N      | Lực vòng; mẫu ≈ 943.5                          |
| **B25**| `Fr1 = Ft1 * TAN(0.349) * COS(delta1)` (α=20°=0.349 rad)                                                                  | N      | Mẫu ≈ 329.8                                    |
| **B26**| `Fa1 = Ft1 * TAN(0.349) * SIN(delta1)`                                                                                     | N      | Mẫu ≈ 95.9                                     |
| **B27**| `K_H = K_Hbeta * K_Hv * 1` (K_Hα=1 răng thẳng; K_Hv tra bảng theo cấp cx và v)                                          | —      |                                                |
| **B28**| `epsilon_a = 1.88 - 3.2*(1/z1_gear + 1/z2_gear)`                                                                         | —      |                                                |
| **B29**| `Z_epsilon = SQRT(1 / epsilon_a)`                                                                                          | —      |                                                |
| **B30**| `sigma_H_check = 274 * 1.76 * Z_epsilon * SQRT(2*T_BRC*K_H*(u1^2+1) / (0.85*b*d_m1^2*u1))`                              | MPa    | ZM=274, ZH=1.76                                |
| **B31**| `IF sigma_H_check <= sigma_H_allow: check_H_pass=true ELSE: false → EF1`                                                  | —      |                                                |
| **B32**| `Y_F1 = lookup(z_v1 = z1/COS(delta1))` qua bảng 6.18                                                                     | —      | z_v: số răng tương đương                       |
| **B33**| `K_F = 1.25 * K_Fv * 1` (K_Fbeta=1.25; K_Fα=1 răng thẳng)                                                               | —      |                                                |
| **B34**| `Y_epsilon = 1 / epsilon_a`                                                                                                | —      |                                                |
| **B35**| `sigma_F1 = 2 * T_brc * K_F * Y_F1 * Y_epsilon / (0.85 * b * d_m1 * m_tm)`                                               | MPa    |                                                |
| **B36**| `sigma_F2 = sigma_F1 * Y_F2 / Y_F1`                                                                                       | MPa    | Y_F2: tra bảng theo z_v2                       |
| **B37**| `IF sigma_F1<=sigma_F_allow_1 AND sigma_F2<=sigma_F_allow_2: check_F_pass=true ELSE: false → EF1`                         | —      |                                                |

### B.4 Unit Test Data

**Input mẫu:** `T_brc = 25722.83 N·mm` | `n1 = 2935 vg/ph` | `u1 = 3.44` | `HB1 = 250` | `HB2 = 230` | `L_h = 48000 h`

| Biến output         | Giá trị kỳ vọng    | Điều kiện / Ghi chú   |
|---------------------|--------------------|-----------------------|
| `sigma_H_allow_MPa` | **481.82**         | min(518.18, 481.82)   |
| `Re_mm`             | **≈ 103.44**       | Xấp xỉ (phụ thuộc K_be)|
| `b_mm`              | **≈ 25–28**        | = K_be × Re           |
| `m_e_mm`            | **2.5**            | Tiêu chuẩn            |
| `z1_gear`           | **16**             |                       |
| `z2_gear`           | **55**             | = ROUND(3.44 × 16)    |
| `d_m1_mm`           | **54.53**          | = 2.181 × 25          |
| `d_m2_mm`           | **187.57**         |                       |
| `Ft1_N`             | **943.5**          |                       |
| `Fr1_N`             | **329.8**          |                       |
| `Fa1_N`             | **95.9**           |                       |
| `check_H_pass`      | **true**           | σ_H ≤ 481.82 MPa ✓    |
| `check_F_pass`      | **true**           | ✓                     |

---

## 5. Module C – Bánh răng trụ cấp chậm (Trục II → III)

### C.1 API Contract

**Request Payload:**

| Trường  | Kiểu  | Mô tả                                    |
|---------|-------|------------------------------------------|
| `T_BRT` | Float | Moment xoắn trục II (N·mm) — từ UC4     |
| `n2`    | Float | Số vòng quay trục II (vg/ph) — từ UC4   |
| `u2`    | Float | Tỉ số truyền cấp chậm — từ UC4          |
| `L_h`   | Int   | Thời gian phục vụ (giờ)                  |
| `HB1`   | Int   | Độ cứng bánh dẫn (mặc định 260)          |
| `HB2`   | Int   | Độ cứng bánh bị dẫn (mặc định 230)       |

**Response Payload:**

| Trường JSON  | Kiểu  | Giá trị mẫu | Mô tả                              |
|--------------|-------|-------------|------------------------------------|
| `a_w_mm`     | Float | 160         | Khoảng cách trục tiêu chuẩn (mm)   |
| `m_tc_mm`    | Float | 2.5         | Mô đun tiêu chuẩn (mm)             |
| `z1_gear`    | Int   | 25          | Số răng bánh dẫn                   |
| `z2_gear`    | Int   | 99          | Số răng bánh bị dẫn                |
| `b_w_mm`     | Float | 50.4        | Chiều rộng vành răng (mm)          |
| `d1_mm`      | Float | 62.5        | Đường kính vòng chia bánh dẫn (mm) |
| `d2_mm`      | Float | 247.5       | Đường kính vòng chia bánh bị dẫn   |
| `Ft2_N`      | Float | 2699        | Lực vòng trục II (N)               |
| `Fr2_N`      | Float | 1164        | Lực hướng tâm (N)                  |
| `Fa2_N`      | Float | 0           | Lực dọc trục = 0 (răng thẳng)      |
| `check_H_pass`| Bool | true        | `σ_H ≤ [σ_H]`                      |
| `check_F_pass`| Bool | true        | `σ_F ≤ [σ_F]`                      |

### C.2 Database Dependencies

| Bảng DB                      | Truy vấn                                                  | Mục đích                         |
|------------------------------|-----------------------------------------------------------|----------------------------------|
| `material_grades`            | `WHERE grade_name IN ('40X', 'C40XH')`                    | HB, σ_Hlim, σ_Flim               |
| `standard_modules`           | `ORDER BY value ASC`                                      | Chọn m tiêu chuẩn                |
| `standard_center_distances`  | `WHERE value >= a_calc ORDER BY value ASC`                | Dãy: 140, 150, 160, 170, 180...  |

### C.3 Step-by-Step Logic

> ⚑ Phần tính ứng suất cho phép (C1–C8) **giống hệt Module B (B1–B8)**, chỉ thay n1→n2 cho bánh dẫn, n2→n3 cho bánh bị dẫn, HB theo vật liệu mới.

| Bước    | Phép tính                                                                                                                | Đơn vị | Ghi chú                                                        |
|---------|--------------------------------------------------------------------------------------------------------------------------|--------|----------------------------------------------------------------|
| **C1–C8** | → Tính σ_H_allow và σ_F_allow giống Module B, thay: n→n2/n3, HB→260/230                                               | MPa    | Mẫu: [σ_H]=481.82, [σ_F1]=267.43, [σ_F2]=236.57              |
| **C9**  | `K_Hbeta = 1.05` (bảng 6.7, ψ_ba=0.315, K_be≈0.5 trục giữa)                                                           | —      |                                                                |
| **C10** | `a_w_calc = 49.5 * (u2+1) * CBRT(T_BRT * K_Hbeta / (sigma_H_allow^2 * u2 * 0.315))`                                   | mm     | K_a=49.5 (răng thẳng), ψ_ba=0.315; mẫu ≈ 165.7               |
| **C11** | `a_w = SELECT value FROM standard_center_distances WHERE value >= a_w_calc LIMIT 1`                                     | mm     | Mẫu: chọn 160 mm                                               |
| **C12** | `m_calc = 0.01 * a_w` (lấy cận dưới → 0.01÷0.02)                                                                       | mm     |                                                                |
| **C13** | `m_tc = SELECT value FROM standard_modules WHERE value >= m_calc LIMIT 1`                                               | mm     | Mẫu: 2.5 mm                                                    |
| **C14** | `z1_gear = FLOOR(2*a_w / (m_tc*(u2+1)))` — nếu z1_gear < 17: z1_gear = 17                                              | răng   | Mẫu: 25                                                        |
| **C15** | `z2_gear = ROUND(u2 * z1_gear)`                                                                                         | răng   | Mẫu: 99 (= 3.96 × 25)                                         |
| **C16** | `u_tt = z2_gear / z1_gear` — nếu `ABS(u_tt-u2)/u2 > 0.04`: WARNING → EF3                                              | —      |                                                                |
| **C17** | `a_w = m_tc * (z1_gear + z2_gear) / 2`                                                                                  | mm     | Khoảng cách trục thực sau làm tròn z                           |
| **C18** | `d1 = m_tc * z1_gear; d2 = m_tc * z2_gear`                                                                              | mm     | Mẫu: 62.5, 247.5                                               |
| **C19** | `d_a1 = d1 + 2*m_tc; d_a2 = d2 + 2*m_tc`                                                                               | mm     | Đường kính vòng đỉnh                                           |
| **C20** | `d_f1 = d1 - 2.5*m_tc; d_f2 = d2 - 2.5*m_tc`                                                                           | mm     | Đường kính vòng đáy                                            |
| **C21** | `b_w = 0.315 * a_w`                                                                                                     | mm     | Mẫu ≈ 50.4                                                     |
| **C22** | `Ft2 = 2*T_BRT / d1`                                                                                                    | N      | Lực vòng; mẫu ≈ 2699                                           |
| **C23** | `v = PI * d1 * n2 / 60000`                                                                                               | m/s    | Mẫu ≈ 2.86                                                     |
| **C24** | `epsilon_a = 1.88 - 3.2*(1/z1_gear + 1/z2_gear)` (β=0 — răng thẳng)                                                   | —      |                                                                |
| **C25** | `K_H = K_Hbeta * K_Hv * 1` (K_Hα=1)                                                                                   | —      | K_Hv tra bảng theo cấp cx và v                                |
| **C26** | `Z_epsilon = SQRT(1/epsilon_a); Z_H=1.76; Z_M=274`                                                                     | —      |                                                                |
| **C27** | `sigma_H_check = 274*1.76*Z_epsilon * SQRT(2*T_BRT*K_H*(u2+1) / (b_w*d1^2*u2))`                                       | MPa    |                                                                |
| **C28** | `IF sigma_H_check <= sigma_H_allow: check_H_pass=true ELSE: false → EF1`                                               | —      |                                                                |
| **C29** | `Y_F1 = lookup(z1_gear)` qua bảng 6.18 (răng thẳng z_v = z)                                                            | —      |                                                                |
| **C30** | `K_F = K_Fbeta * K_Fv * 1; Y_epsilon = 1/epsilon_a` (K_Fbeta=1.12)                                                    | —      |                                                                |
| **C31** | `sigma_F1 = 2*T_BRT*Y_F1*Y_epsilon*K_F / (b_w*d1*m_tc)`                                                               | MPa    |                                                                |
| **C32** | `sigma_F2 = sigma_F1 * Y_F2 / Y_F1`                                                                                    | MPa    |                                                                |
| **C33** | `IF check: check_F_pass=true ELSE: false → EF1`                                                                         | —      |                                                                |
| **C34** | `Fr2 = Ft2 * TAN(0.349)` (α=20°); `Fa2 = 0`                                                                            | N      | Mẫu: Fr2≈1164, Fa2=0                                           |

### C.4 Unit Test Data

**Input mẫu:** `T_brt = 84097.59 N·mm` | `n2 = 853.2 vg/ph` | `u2 = 3.96` | `HB1 = 260` | `HB2 = 230` | `L_h = 48000 h`

| Biến    | Kỳ vọng    | Ghi chú        |
|---------|------------|----------------|
| `a_w_mm`| **160**    | Tiêu chuẩn     |
| `m_tc_mm`| **2.5**   |                |
| `z1_gear`| **25**    |                |
| `z2_gear`| **99**    |                |
| `b_w_mm` | **50.4**  | = 0.315 × 160  |
| `d1_mm`  | **62.5**  |                |
| `d2_mm`  | **247.5** |                |
| `Ft2_N`  | **2699**  |                |
| `Fr2_N`  | **1164**  |                |
| `Fa2_N`  | **0**     | Bánh thẳng     |

---

## 6. Module D – Thiết kế Trục (I, II, III)

### D.1 API Contract

**Request Payload:**

| Trường         | Kiểu    | Nguồn                              |
|----------------|---------|------------------------------------|
| `T_brc, T_brt, T_x` | Float[] | Moment xoắn từ UC4           |
| `n1, n2, n3`   | Float[] | Số vòng quay từ UC4                |
| `Ft1, Fr1, Fa1`| Float[] | Lực từ Module B (bánh côn)         |
| `Ft2, Fr2, Fa2`| Float[] | Lực từ Module C (bánh trụ)         |
| `Fr_chain`     | Float   | Lực xích từ Module A               |
| `d_m1, d1_spur`| Float   | Đường kính trung bình / chia từ B, C|

**Response Payload (mỗi trục):**

| Trường JSON            | Kiểu    | Mẫu (Trục I)       | Mô tả                              |
|------------------------|---------|--------------------|------------------------------------|
| `d_sb_mm`              | Float   | 20.47              | Đường kính sơ bộ (mm)              |
| `d_tc_mm[]`            | Int[]   | [17, 20, 20, 17]   | d tiêu chuẩn tại mỗi tiết diện     |
| `L_span_mm[]`          | Float[] | [113.8, 28.5]      | Khoảng cách gối đỡ (mm)            |
| `M_j_Nmm[]`            | Float[] | [0, 49298, ...]    | Moment uốn tổng tại các tiết diện  |
| `check_fatigue_pass`   | Bool    | true               | s ≥ 1.5 tại mọi tiết diện          |
| `check_overload_pass`  | Bool    | true               | Kiểm nghiệm quá tải đạt            |

### D.2 Database Dependencies

| Bảng DB                  | Mục đích                                                                            |
|--------------------------|-------------------------------------------------------------------------------------|
| `shaft_allowable_stress` | Tra [σ] theo d_sb và σ_b (bảng 10.5): mẫu [σ]=67 MPa với C45 d≈25mm               |
| `key_dimensions`         | Tra b, h, T_brc theo d để trừ khi tính W_j, W_0j                                   |
| `standard_shaft_diameters`| Dãy tiêu chuẩn: 17,20,25,30,32,35,40,45,50,55,60... để làm tròn d_sb              |
| `Kx_Kσ_coefficients`     | Tra K_σ, ε_σ, β theo loại lắp ghép và đường kính (bảng 10.10–10.12)               |

### D.3 Step-by-Step Logic

#### D.3.1 Tính sơ bộ đường kính

| Bước  | Phép tính                                                                                    | Đơn vị | Ghi chú                              |
|-------|----------------------------------------------------------------------------------------------|--------|--------------------------------------|
| **D1**| `tau_allow = 15` (hằng số; MPa — thép C45 chịu T) — có thể cấu hình                        | MPa    |                                      |
| **D2**| `d_sb = CBRT(16*T / (PI * tau_allow))` (tính cho T_BRC, T_BRT, T_X)                         | mm     | Mẫu: T_BRC→20.47, T_BRT→35.x, T_X→45.x |
| **D3**| `d_tc = SELECT value FROM standard_shaft_diameters WHERE value >= d_sb LIMIT 1`              | mm     | Mẫu T_BRC: 25; T_BRT: 35; T_X: 45   |
| **D4**| `b_0 = lookup(d_tc)` từ bảng 10.2 (d=25→b0=17, d=35→b0=21, d=45→b0=25)                    | mm     | Chiều rộng ổ lăn sơ bộ              |

#### D.3.2 Khoảng cách gối đỡ

> **Hằng số:** k1=10, k2=8, k3=16, h_n=18 mm

| Bước  | Phép tính                                                                                                            | Đơn vị | Ghi chú              |
|-------|----------------------------------------------------------------------------------------------------------------------|--------|----------------------|
| **D5**| `l_12 = 0.5*(b_0 + l_brc + 10 + 8)` (l_brc = chiều rộng bánh răng côn = b từ Module B)                            | mm     | Trục I mẫu: ≈69      |
| **D6**| `l_13 = 16 + 18 + 0.5*(b_0 + b_nt)` (b_nt = chiều dài mayo khớp nối; sơ bộ b_nt = 1.5 × d_tc)                    | mm     |                      |
| **D7**| `l_span = l_12 + l_13` (khoảng cách giữa 2 ổ)                                                                      | mm     | Gán cho từng trục    |

#### D.3.3 Phản lực gối và biểu đồ moment

| Bước   | Phép tính                                                       | Đơn vị | Ghi chú                           |
|--------|-----------------------------------------------------------------|--------|-----------------------------------|
| **D8** | Mặt phẳng xOz: ΣM_A_x = 0 → giải R_Bx; ΣF_x = 0 → giải R_Ax | N      | Lực theo trục x                   |
| **D9** | Mặt phẳng yOz: ΣM_A_y = 0 → giải R_By; ΣF_y = 0 → giải R_Ay | N      | Lực theo trục y                   |
| **D10**| `M_x[j]` = tích phân lực cắt theo x tại tiết diện j            | N·mm   |                                   |
| **D11**| `M_y[j]` = tích phân lực cắt theo y tại tiết diện j            | N·mm   |                                   |
| **D12**| `M_j = SQRT(M_x[j]^2 + M_y[j]^2)`                              | N·mm   | Moment uốn tổng                   |

#### D.3.4 Đường kính chính xác và kiểm nghiệm mỏi

| Bước   | Phép tính                                                                                                                       | Đơn vị | Ghi chú                                     |
|--------|---------------------------------------------------------------------------------------------------------------------------------|--------|---------------------------------------------|
| **D13**| `sigma_allow = SELECT value FROM shaft_allowable_stress WHERE d_range INCLUDES d_sb AND sigma_b = 750`                         | MPa    | Mẫu: 67 MPa                                 |
| **D14**| `M_td[j] = SQRT(M_j^2 + 0.75 * T^2)`                                                                                          | N·mm   | Moment tương đương                          |
| **D15**| `d_j = CBRT(M_td[j] / (0.1 * sigma_allow))`                                                                                    | mm     |                                             |
| **D16**| `d_tc[j] = SELECT FROM standard_shaft_diameters WHERE value >= MAX(d_j, d_sb)` — nếu có then: tăng 5–10%                      | mm     |                                             |
| **D17**| `sigma_-1 = 0.436 * 750 = 327 MPa; tau_-1 = 0.58 * 327 = 189.7 MPa` (vật liệu C45)                                          | MPa    |                                             |
| **D18**| `W_j = PI*d^3/32 - b*T_brc*(d-T_brc)^2/(2*d)` (nếu có rãnh then)                                                             | mm³    | Moment cản uốn                              |
| **D19**| `W0_j = PI*d^3/16 - b*T_brc*(d-T_brc)^2/(2*d)` (nếu có rãnh then)                                                            | mm³    | Moment cản xoắn                             |
| **D20**| `sigma_a = M_j / W_j; tau_a = T / (2*W0_j)`                                                                                   | MPa    | Biên độ ứng suất                            |
| **D21**| `K_sigmaD = (K_sigma/eps_sigma + K_x - 1) / beta_sigma` (tra bảng 10.10–10.12 theo d và loại lắp)                             | —      |                                             |
| **D22**| `s_sigma = sigma_-1 / (K_sigmaD * sigma_a)` <br> `s_tau = tau_-1 / (K_tauD * tau_a + 0.1*tau_a)`                             | —      |                                             |
| **D23**| `s = s_sigma * s_tau / SQRT(s_sigma^2 + s_tau^2)`                                                                             | —      | Hệ số an toàn                               |
| **D24**| `IF s >= 1.5: check_fatigue_pass=true ELSE: false → EF1` (thường chọn [s]=2.5)                                                | —      |                                             |

### D.4 Unit Test Data

**Input mẫu — Trục I:** `T_BRC = 25722.83 N·mm` | `Ft1=943.5N, Fr1=329.8N, Fa1=95.9N` | `sigma_b = 750 MPa`

| Biến              | Kỳ vọng          | Ghi chú          |
|-------------------|------------------|------------------|
| `d_sb_mm (T_BRC)` | **20.47**        | τ = 15 MPa       |
| `d_tc (Trục I)`   | **25**           | Tiêu chuẩn       |
| `d_tc (Trục II)`  | **35**           |                  |
| `d_tc (Trục III)` | **45**           |                  |
| `M_j tại B (Trục I)` | **49298 N·mm** | Tiết diện lắp bánh răng |
| `sigma_allow`     | **67 MPa**       | C45, d≈25        |

---

## 7. Module E – Chọn và kiểm nghiệm Then

### E.1 API Contract

| Trường       | Hướng      | Kiểu   | Mẫu / Mô tả                                      |
|--------------|------------|--------|--------------------------------------------------|
| `d_tc`       | → Request  | Float  | Đường kính tại vị trí lắp (từ Module D)          |
| `T_at_pos`   | → Request  | Float  | Moment xoắn tại vị trí đó (từ UC4)              |
| `l_mayo`     | → Request  | Float  | Chiều dài mayo chi tiết (mm)                     |
| `b, h, T_brc, T_brt` | ← Response | Int[] | Kích thước then từ DB (mm)             |
| `l_t_mm`     | ← Response | Float  | Chiều dài then tiêu chuẩn (mm)                  |
| `sigma_d_MPa`| ← Response | Float  | Ứng suất dập (MPa); mẫu: 50.4                   |
| `tau_c_MPa`  | ← Response | Float  | Ứng suất cắt (MPa); mẫu: 12.6                   |
| `check_key_pass` | ← Response | Bool | `σ_d ≤ 100 AND τ_c ≤ 60`                      |

### E.2 Step-by-Step Logic

| Bước  | Phép tính                                                                                   | Đơn vị | Ghi chú                              |
|-------|---------------------------------------------------------------------------------------------|--------|--------------------------------------|
| **E1**| `SELECT b, h, T_brc, T_brt FROM key_dimensions WHERE d_min <= d_tc AND d_tc <= d_max LIMIT 1` | mm  | VD: d=17 → b=8, h=6, T_brc=4        |
| **E2**| `l_t_calc = 0.85 * l_mayo`                                                                  | mm     |                                      |
| **E3**| `l_t = SELECT value FROM standard_key_lengths WHERE value >= l_t_calc LIMIT 1`              | mm     | Dãy: 10,12,14,16,18,20,22,25,28,32... |
| **E4**| `sigma_d = 2 * T_at_pos / (d_tc * l_t * (h - T_brc))`                                      | MPa    | Mẫu: 50.4 MPa                        |
| **E5**| `tau_c = 2 * T_at_pos / (d_tc * l_t * b)`                                                   | MPa    | Mẫu: 12.6 MPa                        |
| **E6**| `check_key_pass = (sigma_d <= 100) AND (tau_c <= 60)`                                        | —      |                                      |

### E.3 Unit Test Data

**Input mẫu — Trục I, lắp khớp nối:** `d = 17 mm` | `T = 25722.83 N·mm` | `l_mayo = 25 mm`

| Biến          | Kỳ vọng      | Ghi chú         |
|---------------|--------------|-----------------|
| `b`           | **8 mm**     |                 |
| `h`           | **6 mm**     |                 |
| `T_brc`       | **4 mm**     |                 |
| `l_t`         | **30 mm**    | ≥ 0.85×25=21.25 |
| `sigma_d`     | **50.4 MPa** | ≤ 100 ✓         |
| `tau_c`       | **12.6 MPa** | ≤ 60 ✓          |
| `check_key_pass`| **true**   |                 |

---

## 8. Module F – Chọn và kiểm nghiệm Ổ lăn

### F.1 API Contract

| Trường             | Hướng     | Kiểu   | Mẫu / Mô tả                               |
|--------------------|-----------|--------|-------------------------------------------|
| `d_tc`             | → Request | Float  | Đường kính chỗ lắp ổ (mm)                |
| `F_rA, F_rB`       | → Request | Float  | Phản lực hướng tâm tại 2 gối (từ D)      |
| `F_a_external`     | → Request | Float  | Lực dọc trục ngoài (từ B hoặc C)         |
| `n_shaft`          | → Request | Float  | Số vòng quay trục (vg/ph)                 |
| `L_h`              | → Request | Int    | Giờ phục vụ                               |
| `bearing_code`     | ← Response| String | Ký hiệu ổ chọn; mẫu: `'7305'`            |
| `C_catalog_kN`     | ← Response| Float  | Khả năng tải động tra catalog (kN)        |
| `C_d_kN`           | ← Response| Float  | Tải động tính toán (kN); mẫu: 18.96      |
| `check_bearing_pass`| ← Response| Bool  | `C_d ≤ C_catalog AND Q_t ≤ C0`           |

### F.2 Database Dependencies

| Bảng DB           | Truy vấn                                                                                                                |
|-------------------|-------------------------------------------------------------------------------------------------------------------------|
| `bearing_catalog` | `SELECT * FROM bearing_catalog WHERE d = d_tc AND type = 'tapered' ORDER BY C ASC` (ổ đũa côn GOST 333-71)            |
| `bearing_catalog` | Sau khi tính C_d: `SELECT * WHERE C >= C_d AND d = d_tc ORDER BY C ASC LIMIT 1`                                        |

### F.3 Step-by-Step Logic

| Bước   | Phép tính                                                                                                                                                     | Đơn vị       | Ghi chú                                              |
|--------|---------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------|------------------------------------------------------|
| **F1** | `bearing_init = SELECT TOP 1 FROM bearing_catalog WHERE d = d_tc AND type='tapered'`                                                                          | —            | Lấy ổ sơ bộ → tra e, Y, α, C0                       |
| **F2** | `e = bearing_init.e` (hệ số kiểm tra lực dọc, bảng 11.4)                                                                                                     | —            |                                                      |
| **F3** | `F_s_A = 0.83 * e * F_rA; F_s_B = 0.83 * e * F_rB`                                                                                                          | N            | Lực dọc trục nội sinh                                |
| **F4** | Tra bảng 11.5 — 8 trường hợp xác định F_aA và F_aB: <br> `IF F_a_external >= F_s_B - F_s_A: F_aA = F_s_A; F_aB = F_s_A + F_a_external` <br> `ELSE: F_aA = F_s_B - F_a_external; F_aB = F_s_B` | N | Tham khảo TL[1] trang ~223 |
| **F5** | `ratio_A = F_aA / (1.0 * F_rA)` (V=1: vòng trong quay) <br> `IF ratio_A <= e: X_A=1, Y_A=0 ELSE: X_A=0.4, Y_A=bearing.Y`                                  | —            |                                                      |
| **F6** | `Q_A = (X_A * 1.0 * F_rA + Y_A * F_aA) * 1.0 * 1.0` (k_t=1, k_d=1)                                                                                        | N            | Tải quy ước gối A                                    |
| **F7** | `Q_B` = tương tự F5, F6 cho gối B                                                                                                                            | N            |                                                      |
| **F8** | `Q = MAX(Q_A, Q_B)` (chọn gối chịu tải lớn hơn)                                                                                                             | N            |                                                      |
| **F9** | `L_Mvong = 60 * n_shaft * L_h / 1e6`                                                                                                                         | triệu vòng   | Mẫu Trục I B: 3522                                   |
| **F10**| `C_d = Q * L_Mvong^(1/3.333)` (m=10/3 cho ổ đũa)                                                                                                            | kN           | Mẫu: 18.96 kN                                        |
| **F11**| `bearing_final = SELECT FROM bearing_catalog WHERE C >= C_d AND d = d_tc ORDER BY C ASC LIMIT 1`                                                             | —            | Mẫu: ổ 7305, C=22 kN                                |
| **F12**| `check_bearing_pass = (C_d <= bearing_final.C)`                                                                                                              | —            |                                                      |
| **F13**| `Q_t = 0.5 * F_rA + 0.22 * COT(bearing_final.alpha) * F_aA`                                                                                                 | kN           | Kiểm tải tĩnh; X0=0.5, Y0=0.22/tan(α)               |
| **F14**| `check_static_pass = (Q_t <= bearing_final.C0)`                                                                                                              | —            |                                                      |

### F.4 Unit Test Data

**Input mẫu — Trục I, gối B:** `F_rB = 1636 N` | `F_aB = 0` | `n = 2935 vg/ph` | `L_h = 48000 h`

| Biến              | Kỳ vọng                | Ghi chú             |
|-------------------|------------------------|---------------------|
| `Q (N)`           | **1636**               | F_aB=0 → X=1, Y=0   |
| `L_Mvong`         | **8445.6 triệu vòng**  | 60×2935×48000/1e6   |
| `C_d_kN`          | **18.96**              |                     |
| `bearing_code`    | **7305**               | C=22 kN ≥ 18.96 ✓   |
| `check_bearing_pass`| **true**             |                     |

---

## 9. Exception Flows

| Mã lỗi | Ngữ cảnh   | Điều kiện kích hoạt                             | HTTP / Thông báo trả về                                                         |
|--------|------------|-------------------------------------------------|---------------------------------------------------------------------------------|
| **EF1**| Mọi module | `check_*_pass = false` tại bất kỳ bước kiểm nghiệm nào | `HTTP 422: { error: 'STRENGTH_FAIL', detail: 'Chi tiết [X] không đạt điều kiện bền.' }` |
| **EF2**| Module D   | Thiếu F từ Module A/B/C (null hoặc 0)           | `HTTP 400: { error: 'MISSING_FORCE_DATA', detail: 'Vui lòng hoàn thành Module A/B/C trước.' }` |
| **EF3**| Module C   | `ABS(u_tt - u2)/u2 > 0.04`                      | `HTTP 200 + warning: { warning: 'RATIO_DEVIATION', value: X% }`                |
| **EF4**| Module F   | Không tìm thấy ổ trong catalog có `C >= C_d`    | `HTTP 422: { error: 'BEARING_NOT_FOUND', detail: 'Cần Admin thêm ổ cỡ lớn hơn vào catalog.' }` |
| **EF5**| Mọi module | Lỗi kết nối DB khi tra bảng                     | `HTTP 503: { error: 'DB_QUERY_FAIL', detail: 'Lỗi tra bảng thông số. Thử lại sau.' }` |

---

## 10. Database Schema tổng hợp

| Tên bảng                   | Các cột chính                                                       | Dùng bởi Module |
|----------------------------|---------------------------------------------------------------------|-----------------|
| `material_grades`          | `grade_name, HB, sigma_b, sigma_ch, sigma_Hlim, sigma_Flim`        | **B, C, D**     |
| `standard_modules`         | `value FLOAT` (1, 1.25, 1.5, 2, 2.5, 3, 4, 5, 6)                  | **B, C**        |
| `standard_center_distances`| `value INT` (140, 150, 160, 170, 180, ...)                          | **C**           |
| `standard_shaft_diameters` | `value INT` (17, 20, 25, 30, 32, 35, 40, 45, 50, ...)              | **D**           |
| `chain_params`             | `p_mm, Q_kN, q_kgm, A_mm2, s_allow, n_ref`                         | **A**           |
| `bearing_catalog`          | `code, type, d, D, B, C_kN, C0_kN, e, Y, alpha_deg`                | **F**           |
| `key_dimensions`           | `d_min, d_max, b, h, T_brc, T_brt`                                  | **D, E**        |
| `standard_key_lengths`     | `value INT` (10, 12, 14, 16, 18, 20, 22, 25, 28, 32, ...)          | **E**           |
| `shaft_allowable_stress`   | `d_range_min, d_range_max, sigma_b, sigma_allow`                    | **D**           |
| `Kx_Kσ_coefficients`       | `fit_type, d_range, K_sigma, eps_sigma, beta_sigma`                 | **D**           |

---

## 11. Ghi chú kỹ thuật & Design Patterns

### Thuật toán làm tròn

| Trường hợp | Quy tắc | Module |
|------------|---------|--------|
| Số răng đĩa xích `z1` | Làm tròn **xuống** số lẻ gần nhất, tối thiểu ≥ 17 | A |
| Số mắt xích `x` | Làm tròn **lên** số **chẵn** | A |
| Chiều rộng bánh côn `b` | Làm tròn nguyên | B |
| Số răng `z2_gear` (mô đun) | `ROUND()` (làm tròn gần nhất) | B, C |
| Số răng `z1_gear` (bánh trụ) | `FLOOR()`, tối thiểu 17 | C |
| Khoảng cách trục `a_w` | Lấy giá trị tiêu chuẩn **gần nhất ≥** giá trị tính | C |
| Mô đun `m_e`, `m_tc` | Lấy giá trị tiêu chuẩn **gần nhất ≥** giá trị tính | B, C |
| Đường kính trục `d_tc` | Lấy giá trị tiêu chuẩn **gần nhất ≥** MAX(d_j, d_sb) | D |
| Chiều dài then `l_t` | Lấy giá trị tiêu chuẩn **gần nhất ≥** l_t_calc | E |

### Soft Delete

> Toàn bộ bảng kết quả tính toán (A, B, C, D, E, F) **PHẢI** implement Soft Delete.  
> Thêm cột `deleted_at TIMESTAMP NULL` (NULL = còn hiệu lực; NOT NULL = đã xóa).  
> Khi re-calculate, KHÔNG xóa bản ghi cũ — UPDATE `deleted_at = NOW()` rồi INSERT bản ghi mới.

```sql
-- Ví dụ schema
ALTER TABLE chain_results ADD COLUMN deleted_at TIMESTAMP NULL DEFAULT NULL;
ALTER TABLE bevel_gear_results ADD COLUMN deleted_at TIMESTAMP NULL DEFAULT NULL;
-- ... tương tự các bảng kết quả khác

-- Query lấy kết quả hiện tại
SELECT * FROM chain_results WHERE project_id = ? AND deleted_at IS NULL;
```

### Design Patterns khuyến nghị

| Pattern | Áp dụng ở | Mục đích |
|---------|-----------|----------|
| **Chain of Responsibility** | Orchestrator điều phối A→B→C→D→E→F | Đảm bảo thứ tự thực thi, dừng nếu bước trước fail |
| **Repository Pattern** | Mỗi module có `XxxRepository` riêng | Tách biệt logic tra bảng DB khỏi logic tính toán |
| **Strategy Pattern** | Tính K_HL, K_FL (trường hợp N_HE ≥ hoặc < N_HO) | Đóng gói điều kiện rẽ nhánh |
| **DTO (Data Transfer Object)** | Request/Response payload từng module | Type-safe, dễ validate và test |
| **Service Layer** | `ChainService`, `BevelGearService`, `ShaftService`... | Business logic thuần, không phụ thuộc HTTP framework |

### Hằng số hệ thống (System Constants)

```python
# Vật liệu trục (C45)
SIGMA_B_SHAFT = 750       # MPa
TAU_ALLOW = 15            # MPa — tính d sơ bộ
SIGMA_MINUS1 = 327        # MPa — (0.436 * 750)
TAU_MINUS1 = 189.7        # MPa — (0.58 * 327)
S_FATIGUE_MIN = 1.5       # Hệ số an toàn mỏi tối thiểu

# Vật liệu bánh răng
S_H = 1.1                 # Hệ số an toàn tiếp xúc
S_F = 1.75                # Hệ số an toàn uốn
Z_M = 274                 # Hệ số cơ tính vật liệu
Z_H = 1.76                # Hệ số hình dạng

# Bộ truyền xích
N01_CHAIN = 200           # vg/ph — số vòng quay cơ sở
KF_CHAIN = 6              # Hệ số kể đến sức căng do trọng lượng (nằm ngang)
KX_CHAIN = 1.15           # Hệ số ảnh hưởng chế độ tải (nằm ngang)
SIGMA_H_ALLOW_CHAIN = 600 # MPa — thép tôi

# Bánh răng côn
K_R = 50                  # Hệ số phụ thuộc vật liệu
K_BE = 0.25               # Hệ số chiều rộng bánh côn
K_HBETA_CON = 1.13        # Bảng 6.21

# Bánh răng trụ
PSI_BA = 0.315            # Hệ số chiều rộng bánh trụ
K_A_THANG = 49.5          # Hệ số cho răng thẳng

# Ổ lăn
M_BEARING = 10.0/3.0      # Bậc của đường cong mỏi (ổ đũa)
```

### Lưu ý quan trọng cho Agent

1. **Thứ tự module là bất biến** — không được song song hóa A/B/C rồi merge vào D. B và C phải hoàn thành trước D vì D cần `Ft`, `Fr`, `Fa` từ cả hai.
2. **Các bảng tra (lookup tables)** như bảng 6.18 (Y_F), bảng 6.22 (z1 theo u), bảng 10.2 (b0 theo d), bảng 11.4 (e, Y ổ lăn) phải được seed sẵn vào DB hoặc hardcode trong constants — không tính được từ công thức.
3. **Kiểm tra tỉ số truyền thực tế** (Module C, bước C16): đây là WARNING, không phải ERROR — API vẫn trả `HTTP 200` kèm `warning` field.
4. **Ổ lăn dùng loại ổ đũa côn** (tapered roller bearing, GOST 333-71) — cần lọc `type = 'tapered'` trong catalog.
5. **Tất cả moment T** trong spec đều tính bằng **N·mm**, không phải N·m. Chú ý đơn vị khi chuyển đổi về kN cho ổ lăn.
