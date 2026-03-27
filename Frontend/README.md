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