# 🚀 DADN252 — Back-end API Server

> Hệ thống back-end phục vụ tính toán thiết kế hệ dẫn động cơ khí gồm: thùng trộn, hộp giảm tốc bánh răng côn trụ, bộ truyền xích, thiết kế trục, chọn động cơ, chọn ổ lăn, then. Xây dựng trên nền tảng **Node.js / Express.js** với kiến trúc phân lớp rõ ràng và nhiều cơ chế bảo mật hiện đại.

---

## 📋 Mục Lục

- [Công Nghệ Sử Dụng](#-công-nghệ-sử-dụng)
- [Kiến Trúc Dự Án](#-kiến-trúc-dự-án)
- [Design Patterns](#-design-patterns)
- [Cấu Trúc Thư Mục](#-cấu-trúc-thư-mục)
- [Cài Đặt & Chạy](#-cài-đặt--chạy)
- [Biến Môi Trường](#-biến-môi-trường)
- [Dữ Liệu Mẫu](#-dữ-liệu-mẫu)
- [API Endpoints](#-api-endpoints)
- [Cơ Sở Dữ Liệu](#-cơ-sở-dữ-liệu)

---

## 🛠️ Công Nghệ Sử Dụng

### Core Framework

| Công nghệ | Phiên bản | Mô tả |
|---|---|---|
| **Node.js** | ≥ 18.x | JavaScript runtime (ESM module) |
| **Express.js** | ^5.2.1 | Web framework — phiên bản 5 hỗ trợ async/await natively, không cần try/catch trong controller |

### Database & ORM

| Công nghệ | Phiên bản | Mô tả |
|---|---|---|
| **MySQL** | — | Hệ quản trị CSDL quan hệ |
| **Prisma ORM** | ^7.4.1 | ORM chính — type-safe, tự sinh model từ schema, hỗ trợ migration |
| **@prisma/adapter-mariadb** | ^7.4.1 | Adapter để Prisma kết nối MariaDB/MySQL |
| **Sequelize** | ^6.37.7 | ORM phụ trợ (dự phòng hoặc cho các truy vấn đặc thù) |
| **mysql2** | ^3.16.3 | Driver kết nối MySQL thuần |

### Xác Thực & Bảo Mật

| Công nghệ | Phiên bản | Mô tả |
|---|---|---|
| **JSON Web Token (JWT)** | ^9.0.3 | Cơ chế xác thực stateless — Access Token (1 ngày) + Refresh Token |
| **bcrypt** | ^6.0.0 | Hash mật khẩu với salt rounds = 10 |
| **Passport.js** | ^0.7.0 | Middleware xác thực — hỗ trợ nhiều strategy |
| **passport-google-oauth20** | ^2.0.0 | Đăng nhập qua Google OAuth 2.0 |
| **cookie-parser** | ^1.4.7 | Đọc và ghi HTTP cookie (lưu Access/Refresh Token) |

### Real-time & Upload

| Công nghệ | Phiên bản | Mô tả |
|---|---|---|
| **Socket.IO** | ^4.8.3 | Giao tiếp real-time hai chiều (WebSocket) |
| **Multer** | ^2.1.1 | Xử lý `multipart/form-data` — upload file |
| **Cloudinary** | ^2.9.0 | Lưu trữ và quản lý media trên cloud |

### Tài Liệu & Tiện Ích

| Công nghệ | Phiên bản | Mô tả |
|---|---|---|
| **swagger-ui-express** | ^5.0.1 | Tự động sinh tài liệu API tại `/api-docs` |
| **cors** | ^2.8.6 | Xử lý Cross-Origin Resource Sharing |
| **dotenv** | ^17.3.1 | Quản lý biến môi trường từ file `.env` |
| **nodemon** | ^3.1.11 | Tự động restart server khi code thay đổi (dev) |
| **kill-port** | ^2.0.1 | Giải phóng port trước khi start (tránh conflict) |

---

## 🏗️ Kiến Trúc Dự Án

Dự án áp dụng kiến trúc **Layered Architecture (3 tầng)** — mỗi lớp chỉ giao tiếp với lớp liền kề, đảm bảo tách biệt trách nhiệm (Separation of Concerns).

```
HTTP Request
     │
     ▼
┌─────────────┐
│   Router    │  Định tuyến URL → Controller tương ứng
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ Middleware  │  Xác thực token, log API, bảo vệ route
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ Controller  │  Nhận request, gọi Service, trả về response
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   Service   │  Chứa toàn bộ business logic, gọi Prisma
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Prisma ORM │  Tương tác với MySQL database
└─────────────┘
```

---

## 🎨 Design Patterns

### 1. 📦 Service Layer Pattern

**Vị trí:** `src/services/*.service.js`

**Mô tả:** Toàn bộ nghiệp vụ (business logic) được tách biệt hoàn toàn khỏi Controller vào lớp Service. Controller chỉ đơn giản nhận request, chuyển cho Service xử lý và trả về response — không tự tính toán hay truy vấn database trực tiếp.

**Ví dụ:**
```javascript
// kinematics.service.js — tính toán động học
export const kinematicsService = {
  async calculate(req) {
    const project = await prisma.projects.findFirst({ ... });
    const eta = round3(ETA.kn * eta_ol4 * ETA.brc * ETA.brt * ETA.x);
    const P_ct = round3(P / eta);
    // ... toàn bộ nghiệp vụ tính toán tại đây
    await prisma.projects.update({ data: { efficiency: eta, ... } });
    return { project, kinematics: { eta, P_ct, ... } };
  }
};

// kinematics.controller.js — chỉ gọi service
export const kinematicsController = {
  async calculate(req, res) {
    const result = await kinematicsService.calculate(req);
    res.status(200).json(responseSuccess(result));
  }
};
```

---

### 2. 🔗 Middleware Chain Pattern (Chain of Responsibility)

**Vị trí:** `src/common/middlewares/` và `server.js`

**Mô tả:** Request đi qua một chuỗi middleware theo thứ tự, mỗi middleware xử lý một mối quan tâm riêng biệt rồi chuyển tiếp (`next()`) cho middleware kế tiếp. Chuỗi có thể bị ngắt bất cứ lúc nào (ví dụ: token không hợp lệ).

```
cors → json parser → cookieParser → logApi → protect → controller
```

**Ví dụ:**
```javascript
// server.js
app.use(cors({ origin: ["http://localhost:3000"] }));
app.use(express.json());
app.use(cookieParser());
app.use(logApi("product"));  // log mọi request

// protect.middleware.js — middleware xác thực JWT
export const protect = async (req, res, next) => {
  const { accessToken } = req.cookies;
  if (!accessToken) throw new UnauthorizedException("Không có token");
  const decode = tokenService.verifyAccessToken(accessToken);
  req.user = await prisma.users.findUnique({ where: { id: decode.userId } });
  next(); // chuyển tiếp nếu hợp lệ
};
```

---

### 3. 🏭 Service Object / Module Singleton Pattern

**Vị trí:** `src/services/*.service.js`, `src/common/prisma/connect.prisma.js`

**Mô tả:** Các service được export dưới dạng một object duy nhất (singleton-like), đảm bảo chỉ có một instance của logic và kết nối database trong toàn ứng dụng. Prisma Client được khởi tạo một lần và tái sử dụng xuyên suốt.

```javascript
// connect.prisma.js — singleton Prisma Client
export const prisma = new PrismaClient();

// auth.service.js — module singleton
export const authService = {
  async register(req) { ... },
  async login(req)    { ... },
};

// token.service.js — module singleton
export const tokenService = {
  createAccessToken(userId) { ... },
  createRefreshToken(userId){ ... },
  verifyAccessToken(token)  { ... },
};
```

---

### 4. 🚨 Custom Exception Hierarchy (Exception Handling Pattern)

**Vị trí:** `src/common/helpers/exception.helper.js`

**Mô tả:** Định nghĩa một hệ thống class lỗi có phân cấp rõ ràng, kế thừa từ `Error`. Mỗi loại lỗi HTTP đều có class riêng mang theo `statusCode` tương ứng. Một global error handler ở cuối middleware chain bắt tất cả lỗi và trả về response chuẩn hóa.

```javascript
// exception.helper.js
export class BadRequestException extends Error {
  code = statusCodes.BAD_REQUEST; // 400
}
export class UnauthorizedException extends Error {
  code = statusCodes.UNAUTHORIZED; // 401
}
export class NotfoundException extends Error {
  code = statusCodes.NOT_FOUND; // 404
}
// ... 9 loại Exception khác (Forbidden, Conflict, v.v.)

// app-error.helper.js — Global Error Handler (middleware đặc biệt 4 tham số)
export const appError = (err, req, res, next) => {
  const response = responseError(err?.message, err?.code, err?.stack);
  res.status(response.statusCode).json(response);
};

// server.js — đăng ký cuối cùng
app.use(appError);
```

---

### 5. 📬 Standardized Response Pattern (Data Transfer Object)

**Vị trí:** `src/common/helpers/response.helper.js`

**Mô tả:** Toàn bộ response trả về client đều có cùng một cấu trúc chuẩn (DTO), giúp Frontend dễ dàng xử lý nhất quán.

```javascript
// response.helper.js
export const responseSuccess = (data, message, statusCode) => ({
  status: "success",
  statusCode: statusCode,
  message: message,
  data: data,
  doc: "swagger.com",
});

export const responseError = (message, statusCode, stack) => ({
  status: "error",
  statusCode: statusCode,
  message: message,
  doc: "swagger.com",
});
```

**Response mẫu:**
```json
{
  "status": "success",
  "statusCode": 200,
  "message": "login auths successfully",
  "data": true,
  "doc": "swagger.com"
}
```

---

### 6. 🔑 Strategy Pattern (OAuth2 Authentication)

**Vị trí:** `src/common/passport/login-google.passport.js`

**Mô tả:** Sử dụng **Passport.js** áp dụng Strategy Pattern — cho phép thay đổi/bổ sung phương thức xác thực mà không làm ảnh hưởng đến phần còn lại của ứng dụng. Hiện tại triển khai `GoogleStrategy` (OAuth 2.0).

```javascript
// login-google.passport.js
export const initLoginGooglePassport = () => {
  passport.use(
    new GoogleStrategy(
      { clientID, clientSecret, callbackURL },
      async (accessTokenGG, refreshTokenGG, profile, cb) => {
        // Tìm hoặc tạo user từ thông tin Google profile
        let user = await prisma.users.findUnique({ where: { email } });
        if (!user) user = await prisma.users.create({ data: { email, ... } });

        // Cấp JWT của hệ thống
        const accessToken  = tokenService.createAccessToken(user.id);
        const refreshToken = tokenService.createRefreshToken(user.id);
        return cb(null, { accessToken, refreshToken });
      }
    )
  );
};
```

---

### 7. 🗃️ Repository Pattern (qua Prisma ORM)

**Vị trí:** Toàn bộ `src/services/*.service.js` — sử dụng `prisma.*`

**Mô tả:** Prisma đóng vai trò là lớp **Data Access / Repository**, trừu tượng hóa toàn bộ tương tác với database. Service không viết SQL thuần mà chỉ gọi qua Prisma API type-safe.

```javascript
// Prisma đóng gói toàn bộ SQL phía dưới
const project = await prisma.projects.findFirst({
  where: { id: Number(projectId), user_id: userId, isDeleted: false },
});

await prisma.projects.update({
  where: { id: Number(projectId) },
  data:  { efficiency: eta, Pct: P_ct, step: "kinematics" },
});
```

---

### 8. 🛤️ Router Aggregation Pattern

**Vị trí:** `src/routers/root.router.js`

**Mô tả:** Tất cả các sub-router được tập hợp vào một **Root Router** duy nhất, sau đó mount vào app tại prefix `/api`. Giúp quản lý routing dễ dàng và mở rộng theo module.

```javascript
// root.router.js
const rootRouter = express.Router();
rootRouter.use("/auth", authRouter);
rootRouter.use("/user", userRouter);
rootRouter.use("/projects", inputRouter);
rootRouter.use("/projects", kinematicsRouter);
rootRouter.use("/motors", motorRouter);
rootRouter.use("/projects/:projectId/motors", motorRouter);
rootRouter.use("/projects/:projectId/design", designRouter);
export default rootRouter;

// server.js
app.use("/api", rootRouter);
// → /api/auth/login, /api/user/:id, /api/projects/:projectId/kinematics, /api/projects/:projectId/design
```

---

## 📁 Cấu Trúc Thư Mục

```
DADN252/
├── DADN_252.sql                     # Script khởi tạo database
├── requirement.txt                  # Yêu cầu dự án
└── expressjs/
    ├── server.js                    # Entry point — khởi động app
    ├── package.json
    ├── prisma.config.ts
    ├── .env                         # Biến môi trường
    ├── prisma/
    │   └── schema.prisma            # Định nghĩa schema database
    │   ├── seed.js                  # Nạp dữ liệu mẫu từ CSV vào Prisma
    │   └── data/                    # Dữ liệu CSV cho seed
    └── src/
        ├── routers/                 # Định tuyến HTTP
        │   ├── root.router.js
        │   ├── auth.router.js
        │   ├── user.router.js
        │   ├── input.router.js
        │   ├── kinematics.router.js
        │   ├── design.router.js
        │   └── recommadation.router.js
        ├── controllers/             # Nhận request, trả response
        │   ├── auth.controller.js
        │   ├── user.controller.js
        │   ├── input.controller.js
        │   ├── kinematics.controller.js
        │   ├── design.controller.js
        │   └── recommendation.controller.js
        ├── services/                # Business logic
        │   ├── auth.service.js
        │   ├── user.service.js
        │   ├── input.service.js
        │   ├── kinematics.service.js
        │   └── token.service.js
        ├── models/                  # Model (Sequelize)
        │   └── users.model.js
        └── common/                  # Dùng chung toàn ứng dụng
            ├── constant/
            │   └── app.constant.js  # Hằng số môi trường
            ├── helpers/
            │   ├── exception.helper.js      # Custom exception classes
            │   ├── response.helper.js       # Chuẩn hóa response
            │   ├── app-error.helper.js      # Global error handler
            │   ├── build-query-prisma.helper.js
            │   └── status-code.helper.js    # HTTP status codes
            ├── middlewares/
            │   ├── protect.middleware.js     # JWT authentication guard
            │   ├── protect-header.middleware.js
            │   └── log-api.middleware.js     # Request logging
            ├── passport/
            │   └── login-google.passport.js  # Google OAuth2 strategy
            ├── prisma/
            │   ├── connect.prisma.js         # Singleton Prisma Client
            │   └── generated/prisma/         # Auto-generated Prisma types
            ├── sequelize/                    # Sequelize config
            ├── socket/
            │   └── init.socket.js            # Socket.IO initialization
            ├── multer/                       # File upload config
            └── swagger/
                ├── init.swagger.js           # Swagger document setup
                ├── auth.swagger.js
                └── user.swagger.js
```

---

## ⚙️ Cài Đặt & Chạy

### Yêu cầu hệ thống

- Node.js >= 18.x
- MySQL >= 8.x hoặc MariaDB >= 10.x

### Các bước cài đặt

```bash
# 1. Clone repository
git clone <repo-url>

# 2. Di chuyển vào thư mục backend
cd DADN252/expressjs

# 3. Cài đặt dependencies
npm install

# 4. Tạo file .env (tham khảo mục Biến Môi Trường bên dưới)
cp .env.example .env

# 5. Import database schema
mysql -u root -p < ../DADN_252.sql

# 6. Kéo schema từ database và generate Prisma Client
npm run prisma

# 7. Nạp dữ liệu tra cứu mẫu từ CSV
node prisma/seed.js

# 8. Chạy server ở chế độ development
npm run dev
```

> Server sẽ chạy tại: **http://localhost:3069**  
> Tài liệu API Swagger: **http://localhost:3069/api-docs**

---

## 🌱 Dữ Liệu Mẫu

File `prisma/seed.js` dùng để nạp lại các bảng tra cứu từ CSV trong `prisma/data/`.

Script hiện tại import các nhóm dữ liệu sau:

- `material_grades`
- `standard_modules`
- `standard_center_distances`
- `standard_shaft_diameters`
- `standard_key_lengths`
- `key_dimensions`
- `chains`
- `bearings`
- `motors`

Chạy lại seed khi:

- Database vừa được tạo mới
- Cần đồng bộ lại dữ liệu tra cứu sau khi thay đổi file CSV
- Muốn nạp thêm danh sách động cơ, bạc đạn hoặc xích mới

---

## 🔐 Biến Môi Trường

Tạo file `.env` trong thư mục `expressjs/` với nội dung sau:

```env
# Database
DATABASE_URL="mysql://user:password@localhost:3306/dadn252"

# JWT Secrets
ACCESS_TOKEN_SECRET=your_access_token_secret_here
REFRESH_TOKEN_SECRET=your_refresh_token_secret_here

# Google OAuth2
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Cloudinary (Upload ảnh)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

## 🌐 API Endpoints

| Method | Endpoint | Mô tả | Auth |
|--------|----------|-------|------|
| POST | `/api/auth/register` | Đăng ký tài khoản | ❌ |
| POST | `/api/auth/login` | Đăng nhập | ❌ |
| GET | `/api/auth/get-info` | Lấy thông tin người dùng hiện tại | ✅ JWT |
| POST | `/api/auth/refresh-token` | Làm mới Access Token | ❌ |
| GET | `/api/auth/google` | Khởi tạo đăng nhập Google | ❌ |
| GET | `/api/auth/google/callback` | Callback sau khi xác thực Google | ❌ |
| GET | `/api/user` | Lấy danh sách user | ❌ |
| GET | `/api/user/:id` | Lấy chi tiết user | ❌ |
| POST | `/api/user/avatar-local` | Upload avatar xuống local storage | ✅ JWT |
| POST | `/api/user/avatar-cloud` | Upload avatar lên Cloudinary | ✅ JWT |
| POST | `/api/projects` | Tạo project mới | ✅ JWT |
| GET | `/api/projects` | Lấy danh sách project | ✅ JWT |
| GET | `/api/projects/:id` | Lấy thông tin project | ✅ JWT |
| PUT | `/api/projects/:id` | Cập nhật project | ✅ JWT |
| DELETE | `/api/projects/:id` | Xoá project | ✅ JWT |
| POST | `/api/projects/:id/kinematics` | Tính toán động học | ✅ JWT |
| GET | `/api/projects/:id/kinematics` | Lấy kết quả động học | ✅ JWT |
| POST | `/api/projects/:projectId/design/calculate` | Tính toán thiết kế hộp giảm tốc | ❌ |
| GET | `/api/projects/:projectId/motors/suggestions` | Gợi ý top 3 động cơ phù hợp theo project | ✅ JWT |
| GET | `/api/projects/:projectId/motors/candidates` | Lấy danh sách động cơ phù hợp theo project | ✅ JWT |
| POST | `/api/projects/:projectId/motors/select` | Lưu động cơ đã chọn vào project | ✅ JWT |

> 📖 Xem đầy đủ tại: **http://localhost:3069/api-docs**

---

## 🗄️ Cơ Sở Dữ Liệu

Sơ đồ các bảng chính trong MySQL:

```
users
 ├── id, name, email, password (bcrypt)
 ├── role: user | admin
 └── projects[]

projects
 ├── id, user_id → users
 ├── input_P, input_n_ct, input_L   (thông số đầu vào)
 ├── efficiency, Pct, total_ratio    (kết quả động học)
 ├── transmission, shafts (JSON)     (kết quả chi tiết)
 ├── selected_motor_id → motors
 ├── selected_motor_snapshot (JSON)
 ├── design_result (JSON)
 ├── step: created → inputs → kinematics → motor_selected → design_done
 └── isDeleted (soft delete)

material_grades          — bảng tra cứu cơ tính vật liệu
standard_modules         — dãy mô đun tiêu chuẩn
standard_center_distances — dãy khoảng cách trục tiêu chuẩn
standard_shaft_diameters — dãy đường kính trục tiêu chuẩn
standard_key_lengths     — dãy chiều dài then tiêu chuẩn
key_dimensions           — bảng tra cứu kích thước then
motors                   — bảng tra cứu động cơ điện
bearings                 — bảng tra cứu ổ lăn
chains                   — bảng tra cứu xích truyền động
```

---

## 👥 Đóng Góp

1. Fork repository này
2. Tạo branch mới: `git checkout -b feature/your-feature`
3. Commit thay đổi: `git commit -m "feat: mô tả ngắn gọn"`
4. Push lên branch: `git push origin feature/your-feature`
5. Tạo Pull Request

---

<div align="center">
  <strong>DADN252 — Đồ Án Đại Học · HCMUT</strong><br/>
  Xây dựng với ❤️ bằng Node.js & Express.js
</div>
