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