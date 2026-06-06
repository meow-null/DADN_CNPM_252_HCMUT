# ⚙️ Hệ thống Thiết kế Dẫn động (Frontend UI)

Phân hệ Frontend (Giao diện người dùng) cho Hệ thống tính toán kỹ thuật và thiết kế hộp giảm tốc, thùng trộn. Được xây dựng để phục vụ dự án đa ngành phối hợp với Khoa Cơ khí.

## 🛠 Công nghệ sử dụng
- **Core:** ReactJS
- **Build Tool:** Vite (Tốc độ khởi tạo và build cực nhanh)
- **Styling:** Tailwind CSS (v3.4)

## 📂 Cấu trúc thư mục (src/)
- `/components/`: Chứa các thành phần dùng chung (Header, Sidebar, Modals...).
- `/pages/`: Chứa các màn hình chính của ứng dụng:
  - `AuthPage.jsx`: Giao diện Đăng nhập / Đăng ký.
  - `Workspace.jsx`: Quản lý danh sách dự án.
  - `Calculations.jsx`: Khu vực tính toán kỹ thuật 4 bước (Nhập liệu, Động cơ, Động học, Chi tiết máy).
  - `Summary.jsx`: Bảng tóm tắt thiết kế.
  - `Reports.jsx`: Quản lý tùy chọn xuất báo cáo và Preview PDF.
- `App.jsx`: Component gốc, quản lý Routing và State điều hướng (màn hình hiện tại).
- `index.css`: Chứa cấu hình Tailwind và một số custom class tĩnh.

## 🚀 Hướng dẫn cài đặt và chạy dự án

**Yêu cầu môi trường:** Cài đặt sẵn [Node.js](https://nodejs.org/) (Khuyên dùng bản LTS).

**Bước 1: Clone code về máy và di chuyển vào thư mục**
\`\`\`bash
# Di chuyển vào đúng thư mục frontend
cd he-dan-dong
\`\`\`

**Bước 2: Cài đặt các thư viện (Dependencies)**
\`\`\`bash
npm install
\`\`\`

**Bước 3: Khởi chạy môi trường phát triển (Dev Server)**
\`\`\`bash
npm run dev
\`\`\`

Sau khi chạy lệnh trên, terminal sẽ cung cấp một đường link (thường là `http://localhost:5173/`). Bấm `Ctrl + Click` vào link đó để xem ứng dụng trên trình duyệt.

## 📝 Ghi chú cho Backend Developer
- Logic chuyển trang hiện tại đang được xử lý cứng (hard-code) bằng State trong `App.jsx`.
- Khi tích hợp API, cần chú ý cập nhật lại luồng Đăng nhập (`isAuthenticated`) để lưu Token.

-----------------------------------------------------------------------------
## 🚀 Patch Notes - Update 1.1 (28/03)
Tái cấu trúc Kiến trúc UI (Master-Detail) & Triển khai UC-05 (Chi tiết máy)

### 1. Tái cấu trúc Luồng điều hướng (Navigation Architecture)
* **Sửa gì:** Chuyển đổi từ menu phẳng (Global) sang mô hình Master-Detail (Local Project Scope). Xóa nút Tính toán/Báo cáo khỏi thanh điều hướng chung. Thêm nút "Thư viện linh kiện" (Chuẩn bị cho UC-07).
* **Ở file nào:** 
  - `src/components/Sidebar.jsx`
  - `src/components/Header.jsx`
  - `src/App.jsx`
* **Để làm gì:** Ngăn chặn lỗi người dùng bấm vào Tính toán khi chưa chọn dự án. Tách biệt rõ ràng Không gian làm việc chung (Global) và Phòng dự án cụ thể (Local). Header giờ đây có thêm nút "Thoát dự án" để quay về Workspace mượt mà.

### 2. Vá lỗi (Bug Fix) Workspace
* **Sửa gì:** Cập nhật hàm xử lý của nút "Tạo dự án mới" và các Card dự án trống.
* **Ở file nào:** `src/pages/Workspace.jsx`
* **Để làm gì:** Fix lỗi dính dữ liệu cũ. Khi bấm tạo mới, hệ thống sẽ tự động gỡ dữ liệu (`activeProject = null`) trước khi điều hướng sang trang Nhập liệu.

### 3. Cập nhật Quy trình Wizard & Giao diện UC-05 (Chi tiết máy)
* **Sửa gì:** 
  - Đảo vị trí Bước 3 và Bước 4: Luồng chuẩn mới là **Nhập liệu ➔ Động học ➔ Chi tiết máy ➔ Chọn động cơ**.
  - Xây dựng Sub-menu bên trái cho Bước 3 để điều hướng giữa các module: Vật liệu, Bánh răng côn, Bánh răng trụ, Trục.
  - Xây dựng UI cho module Bánh răng côn (Sub-step 2).
* **Ở file nào:** `src/pages/Calculations.jsx`
* **Để làm gì:** Tuân thủ đúng logic thiết kế cơ khí. Tránh làm màn hình bị quá tải thông tin bằng cách chia nhỏ UC-05.

### 4. Tích hợp Logic kiểm nghiệm bền (Chuẩn bị cho API)
* **Sửa gì:** Xây dựng State giả lập API (`gearData`) cho bánh răng côn. Thêm cơ chế chặn luồng (Disable nút Tiếp tục) khi ứng suất tiếp xúc không đạt (`σH > [σH]`).
* **Ở file nào:** `src/pages/Calculations.jsx`
* **Để làm gì:** Mô phỏng đúng AF1 & EF1 trong Đặc tả SRS. Tạo luồng "Thử & Sai" (Trial & Error) chân thực cho kỹ sư: Báo lỗi đỏ ➔ Đổi vật liệu ➔ Bấm cập nhật (có loading 1s) ➔ Đạt chuẩn xanh lá ➔ Mở khóa cho đi tiếp sang Bước 4. Giúp Backend dễ dàng map data JSON vào State sau này.

-----------------------------------------------------------------------------
## 🚀 Patch Notes - Update 1.2 (10/04)
Triển khai UC-06 (Chọn Động cơ) — Giao diện đề xuất & lựa chọn động cơ tối ưu

### 1. Tạo component MotorRecommendation (UC-06)
* **Sửa gì:** Xây dựng component mới `MotorRecommendation.jsx` phục vụ Bước 4 của Wizard. Component gọi trực tiếp 3 API Backend:
  - `GET /projects/:id/motors/suggestions` → Lấy Top 3 động cơ đề xuất.
  - `GET /projects/:id/motors/candidates` → Lấy toàn bộ danh sách động cơ thỏa mãn (AF1).
  - `POST /projects/:id/motors/select` → Lưu động cơ đã chọn vào project.
* **Ở file nào:** `src/pages/MotorRecommendation.jsx` **(MỚI)**
* **Để làm gì:** Hiện thực hóa UC-06 với 5 trạng thái UI:
  1. **Loading** — Skeleton cards khi đang truy vấn.
  2. **Top 3 Cards** — Hiển thị 3 động cơ tối ưu nhất (card đầu nổi bật với viền primary, scale-105). Mỗi card có: mã motor, series badge (K/DK/4A color-coded), P_dm, n_dm, hiệu suất, cos φ, ΔP, Δn.
  3. **Bảng mở rộng (AF1)** — Modal full-width hiển thị tất cả động cơ thỏa mãn, hỗ trợ sort theo từng cột.
  4. **Empty State (EF1)** — Thông báo khi không tìm thấy động cơ phù hợp hoặc chưa có dữ liệu đầu vào.
  5. **Xác nhận** — Card xác nhận xanh lá sau khi chọn, có nút "Chọn lại" hoặc "Hoàn tất & Xem tóm tắt".

### 2. Tích hợp vào Wizard (Calculations)
* **Sửa gì:** Thay thế block hardcode tĩnh ở Bước 4 (hiển thị cứng motor 4A132S4Y3) bằng component `MotorRecommendation` mới. Truyền props `activeProject`, `kinematicsResult`, `onMotorSelected`, `onNavigate`.
* **Ở file nào:** `src/pages/Calculations.jsx`
* **Để làm gì:** Kết nối Bước 4 với API Backend thật. Sau khi user chọn motor, Backend lưu `selected_motor_id` + `selected_motor_snapshot` vào project và chuyển step sang `motor_selected`.

-----------------------------------------------------------------------------
## 🚀 Patch Notes - Update 1.3 (11/04)
Tinh chỉnh UI & Cải thiện trải nghiệm người dùng

### 1. Tối ưu giao diện Bước 2 (Động học)
* **Sửa gì:** Gỡ bỏ nút "Tính toán lại" khỏi giao diện kết quả động học.
* **Ở file nào:** `src/pages/Calculations.jsx`
* **Để làm gì:** Tránh việc người dùng thao tác nhầm gây gọi lại API không cần thiết hoặc phá vỡ luồng dữ liệu hiện tại, đồng thời làm giao diện gọn gàng, tập trung hơn vào việc chuyển sang bước tiếp theo (Chi tiết máy).

-----------------------------------------------------------------------------
## 🚀 Patch Notes - Update 1.4 (12/04)
Fix Sorting Bugs (UC-06) — Sửa lỗi crash và bổ sung tính năng sort

### 1. Sửa logic sắp xếp (Sorting Logic Fix)
* **Sửa gì:** Nâng cấp hàm `sortedAll` để xử lý an toàn dữ liệu kiểu số và giá trị `null`. Ngăn chặn crash khi gọi `.toLowerCase()` trên dữ liệu không phải chuỗi.
* **Ở file nào:** `src/pages/MotorRecommendation.jsx`
* **Để làm gì:** Giải quyết triệt để lỗi trắng màn hình khi người dùng nhấn vào cột Hiệu suất H(%) trong modal danh sách động cơ.

### 2. Bổ sung tính năng sắp xếp cho cột cos φ
* **Sửa gì:** Thêm sự kiện `onClick` và biểu tượng `SortIcon` cho tiêu đề cột **cos φ**.
* **Ở file nào:** `src/pages/MotorRecommendation.jsx` (Table header)
* **Để làm gì:** Đáp ứng đầy đủ nhu cầu so sánh thông số kỹ thuật giữa các động cơ, giúp người dùng dễ dàng chọn lựa thiết bị tối ưu.

### 3. Cập nhật so sánh số thông minh
* **Sửa gì:** Tự động chuyển đổi và so sánh kiểu số nếu dữ liệu trong cột có thể convert sang Number.

-----------------------------------------------------------------------------
## 🚀 Patch Notes - Update 1.5 (07/05)
Hoàn thiện Standalone UI & Nâng cấp Pipeline UC-05 (Thiết kế chi tiết máy)

### 1. Hoàn thiện Pipeline UC-05 (Module A → F)
* **Sửa gì:** Tích hợp logic tính toán cơ khí cho toàn bộ chuỗi: Xích (A), Bánh răng Côn (B), Bánh răng Trụ (C), Trục (D), Then (E) và Ổ lăn (F).
* **Fix Bug:** Sửa lỗi Engine tự động ghi đè Module tiêu chuẩn. Hiện tại hệ thống đã ưu tiên sử dụng Module do người dùng chọn từ UI để tính toán ứng suất tiếp xúc $\sigma_H$.
* **Ở file nào:** `src/utils/uc05Engine.js`, `src/pages/UC05Detail.jsx`.

### 2. Cấu hình CORS & Kết nối Backend
* **Sửa gì:** Cập nhật cấu hình CORS cho phép các origin phổ biến (`127.0.0.1`, `localhost`) và các cổng dev (`5173`, `5174`).
* **Mục đích:** Giải quyết triệt để lỗi "Failed to fetch" khi đăng ký/đăng nhập tài khoản ở môi trường phát triển cục bộ.
* **Ở file nào:** `Backend/server.js`.

### 3. Cập nhật Engine tính toán tiêu chuẩn
* **Sửa gì:** Bổ sung bảng tra tiêu chuẩn cho Then (TCVN) và Ổ lăn (ISO), tích hợp công thức tính ứng suất tiếp xúc $\sigma_H$ cho bánh răng.
* **Để làm gì:** Đảm bảo kết quả thiết kế chính xác theo tiêu chuẩn kỹ thuật cơ khí.

-----------------------------------------------------------------------------
## 🚀 Patch Notes - Update 1.6 (08/05)
Tối ưu hóa Workflow & Đồng bộ Logic Kiểm nghiệm (UC-05)

### 1. Tối ưu hóa Luồng thiết kế (UI/UX)
* **Sửa gì:** Đảo lại thứ tự các bước thiết kế: `Chọn Động cơ` (Bước 3) hiện tại sẽ nằm trước `Chi tiết máy` (Bước 4) để đảm bảo tính logic (phải có thông số động cơ mới tính được chi tiết máy).
* **Cải tiến:** Vô hiệu hóa việc nhấn trực tiếp trên thanh điều hướng để ép người dùng đi theo quy trình tuyến tính, tránh nhảy bước gây lỗi dữ liệu.
* **Ở file nào:** `src/pages/Calculations.jsx`.

### 2. Nâng cấp Giao diện Xác nhận & Logic Validation (UC-05)
* **Sửa gì:** 
    * Thêm màn hình "Thiết kế hoàn tất" với dấu tích xanh sau khi tất cả 6 module đạt chuẩn.
    * Đồng bộ hóa thanh Sidebar: Hiện tại Sidebar sẽ báo "Không đạt" nếu bất kỳ trục nào (I, II, III) trong module đó lỗi, thay vì chỉ kiểm tra trục I như trước.
    * Cập nhật logic Then: Ứng suất cho phép của Then hiện tại đã phụ thuộc vào loại vật liệu người dùng chọn (Input-driven).
* **Ở file nào:** `src/pages/UC05Detail.jsx`, `src/utils/uc05Engine.js`.

### 3. Fix Bug Điều hướng & Environment
* **Sửa gì:** 
    * Sửa lỗi nút "Xác nhận" không nhảy trang do thiếu prop `onNavigate`.
    * Fix lỗi Backend crash do thiếu file `.env` (DATABASE_URL).
* **Ở file nào:** `src/pages/UC05Detail.jsx`, `Backend/.env`.

-----------------------------------------------------------------------------
## 🚀 Patch Notes - Update 1.7 (07/06)
Tích hợp tính năng "⚡ Áp dụng nhanh" (Auto-Apply) & Giải quyết Nghịch lý Thiết kế Cơ khí

### 1. Giải pháp Khắc phục "Nghịch lý Giảm công suất" & Đề xuất Mô-đun tiêu chuẩn
* **Sửa gì:**
  * Tại `design.service.js`, nâng cấp giải thuật tính toán ngược khi bánh răng côn (Module B) bị quá tải tiếp xúc. Thay vì đề xuất tăng HB lên quá giới hạn thép thực tế (ví dụ HB >= 678), hệ thống sẽ tự so sánh với độ cứng tối đa trong CSDL (HB=480). Nếu vượt quá giới hạn, hệ thống chuyển sang tính toán và đề xuất ghi đè tăng Mô-đun tiêu chuẩn ($m_e$) lên giá trị lớn hơn tương ứng.
  * Hỗ trợ ghi đè tham số Mô-đun bánh răng côn `m_e_I` trong API Backend, từ đó bỏ qua bước auto-sizing gây co nhỏ bánh răng.
* **Ở file nào:** `Backend/src/services/design.service.js`

### 2. Tích hợp tính năng "⚡ Áp dụng nhanh" (Auto-Apply) gợi ý sửa lỗi
* **Sửa gì:**
  * Cập nhật logic backend để trả về các trường tham số gợi ý có cấu trúc gồm: `recommended_P` (Xích), `recommended_material_id` và `recommended_m_e` (Bánh răng côn), `recommended_d_tc` (Trục & Ổ lăn), `recommended_l` (Then).
  * Tích hợp nút bấm **⚡ Áp dụng** tại Modal Khắc phục nhanh trên giao diện frontend. Khi người dùng click nút này, hệ thống sẽ tự động điền các thông số đề xuất vào form (đổi vật liệu phù hợp, cập nhật đường kính trục, chiều dài then hoặc module) và kích hoạt live calculation tính toán kiểm nghiệm thời gian thực để chuyển trạng thái các module sang màu xanh an toàn chỉ với một chạm.
* **Ở file nào:** `Frontend/src/pages/UC05Detail.jsx`, `Backend/src/services/design.service.js`

### 3. Bổ sung trường nhập liệu hình học & Tái cấu trúc Layout Modal
* **Sửa gì:**
  * Thêm ô nhập liệu **Module bánh răng côn m_e**, **Đường kính trục d_tc**, và các thông số kích thước then tiêu chuẩn (**b, h, t1, l**) vào Modal Khắc phục nhanh.
  * Tái cấu trúc layout hiển thị bảng trạng thái kiểm nghiệm live A → F và dọn dẹp vị trí thẻ gợi ý tối ưu ra ngoài flex container chính để tránh làm méo layout.
* **Ở file nào:** `Frontend/src/pages/UC05Detail.jsx`

### 4. Thiết kế giao diện phong cách Nvidia/Apple & Vá lỗi Logo Bách Khoa
* **Sửa gì:**
  * Cập nhật thanh bên (Sidebar) sang màu đen nhám (Dark Mode `bg-[#0a0a0a]/95`) kết hợp kính mờ glassmorphism và dải màu quang phổ gradient công nghệ ở trên cùng.
  * Bọc logo Bách Khoa (HCMUT) trong khung nền trắng bo góc mềm mại `rounded-2xl` kết hợp đổ bóng phát sáng nhẹ (`glow`) giúp logo luôn nổi bật rõ ràng bất kể màu nền sidebar thay đổi.
  * Đồng bộ hóa font chữ `Inter` và `Outfit` cho toàn bộ văn bản để tăng độ sắc nét trực quan.
* **Ở file nào:** `Frontend/src/components/Sidebar.jsx`, `Frontend/src/index.css`
