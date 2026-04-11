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