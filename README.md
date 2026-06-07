# Hướng Dẫn Chạy Project Đồ Án Dẫn Động Cơ Khí (DADN CNPM 252)

Tài liệu này hướng dẫn chạy toàn bộ project (Backend + Frontend) trên máy local.
Dự án là Hệ thống tính toán thiết kế hệ dẫn động cơ khí gồm: thùng trộn, hộp giảm tốc bánh răng côn - trụ, bộ truyền xích ngoài, thiết kế trục, chọn động cơ, chọn ổ lăn và then.

> 📚 **Chi tiết thêm:**
> - Xem **[Tài liệu Frontend](./Frontend/README.md)**
> - Xem **[Tài liệu Backend](./Backend/README.md)**

## 1. Yeu cau moi truong

- Node.js 18+ (khuyen dung LTS)
- npm 9+
- MySQL/MariaDB

Kiem tra nhanh:

```bash
node -v
npm -v
```

## 2. Cau truc va cong mac dinh

- Backend: localhost:3069
- Frontend (Vite): localhost:5173
- API base mac dinh frontend: http://localhost:3069/api

## 3. Chuan bi Database

Tai thu muc goc project co file DADN_252.sql.

Ban can:

1. Tao database rong (vi du: dadn_252)
2. Import file DADN_252.sql vao database do

Vi du voi MySQL CLI:

```bash
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS dadn_252 CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
mysql -u root -p dadn_252 < DADN_252.sql
```

Neu ban thay doi schema trong Backend/prisma/schema.prisma thi chay lai trong thu muc Backend:

```bash
npx prisma generate
npx prisma db push
```

*Lưu ý về Prisma:* 
- `npx prisma generate`: Dùng để cập nhật lại Prisma Client trong code Node.js mỗi khi bạn sửa file schema.
- `npx prisma db push`: Dùng để đẩy cấu trúc bảng (schema) từ file lên Database (thường dùng ở môi trường dev).
- `npx prisma studio`: Mở giao diện web tại `localhost:5555` để xem và chỉnh sửa dữ liệu trực tiếp trong Database.

Sau do nap du lieu tra cuu tu CSV bang seed:

```bash
cd Backend
node prisma/seed.js
```

## 4. Cau hinh Backend .env

Tao file Backend/.env voi noi dung mau:

```env
DATABASE_URL="mysql://root:your_password@localhost:3306/dadn_252"
ACCESS_TOKEN_SECRET="your_access_secret"
REFRESH_TOKEN_SECRET="your_refresh_secret"

CLOUDINARY_URL="cloudinary://api_key:api_secret@cloud_name"

BREVO_SMTP_USER="your_brevo_smtp_user"
BREVO_SENDER_EMAIL="your_brevo_sender_email"
BREVO_SMTP_PASS="your_brevo_smtp_pass"

# Cấu hình AI Local (LM Studio) để tự động viết báo cáo
LM_STUDIO_URL="http://localhost:1234/v1/chat/completions"
```

Luu y:

- Neu DB khac host/port/user/password thi sua DATABASE_URL tuong ung.
- Để sử dụng tính năng AI sinh báo cáo, bạn cần mở phần mềm **LM Studio**, tải một model ngôn ngữ (ví dụ: Gemma) và bật tính năng **Local Server** (thường chạy ở port 1234). Đảm bảo URL trong `.env` khớp với URL mà LM Studio cung cấp.

## 5. Cai dat dependencies

Tai terminal 1 (Backend):

```bash
cd Backend
npm install
```

Tai terminal 2 (Frontend):

```bash
cd Frontend
npm install
```

## 6. Chay project

### Chay Backend

```bash
cd Backend
npm run dev
```

Server thanh cong khi thay log tuong tu:

- Server online at port: 3069

Swagger:

- http://localhost:3069/api-docs

### Chay Frontend

```bash
cd Frontend
npm run dev
```

Mo trinh duyet:

- http://localhost:5173

## 7. Build production (kiem tra nhanh)

Frontend:

```bash
cd Frontend
npm run build
```

Backend (chay thu mode production):

```bash
cd Backend
npm start
```

## 8. API dang dung trong frontend

Tat ca endpoint deu co prefix `/api`.

Auth:

- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/get-info
- POST /api/auth/refresh-token
- POST /api/auth/request-change-password
- POST /api/auth/verify-change-password

Materials:

- GET /api/materials/grades

User:

- GET /api/user
- GET /api/user/:id
- POST /api/user/avatar-local
- POST /api/user/avatar-cloud

Projects:

- POST /api/projects
- GET /api/projects
- GET /api/projects/:projectId
- PUT /api/projects/:projectId
- DELETE /api/projects/:projectId

Kinematics:

- POST /api/projects/:projectId/kinematics
- GET /api/projects/:projectId/kinematics

Design:

- POST /api/projects/:projectId/design/calculate

Motors:

- GET /api/projects/:projectId/motors/suggestions
- GET /api/projects/:projectId/motors/candidates
- POST /api/projects/:projectId/motors/select

Luu y:

- Cac API `projects`, `kinematics`, `design`, `motors` su dung cookie JWT de xac thuc trong backend.
- API `design` hien tai duoc goi qua endpoint: `/api/projects/:projectId/design/calculate`.
- Truoc khi goi API motor, can hoan thanh buoc kinematics cho project do.
- Swagger day du: http://localhost:3069/api-docs

## 9. Quy trinh chay nhanh (tom tat)

1. Import DADN_252.sql vao MySQL
2. Tao Backend/.env
3. npm install trong Backend va Frontend
4. Chay seed du lieu: cd Backend && node prisma/seed.js
5. Chay Backend: npm run dev
6. Chay Frontend: npm run dev
7. Mo http://localhost:5173