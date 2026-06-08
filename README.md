# 🚀 DADN252 — Back-end API Server

> Hệ thống back-end phục vụ tính toán thiết kế hệ dẫn động cơ khí gồm: thùng trộn, hộp giảm tốc bánh răng côn trụ, bộ truyền xích, thiết kế trục, chọn động cơ, chọn ổ lăn, then. Xây dựng trên nền tảng **Node.js / Express.js** với kiến trúc phân lớp, container hoá bằng **Docker**, và tích hợp đầy đủ hệ thống **bảo mật — giám sát — logging** cấp production.

---

## 📋 Mục Lục

- [Công Nghệ Sử Dụng](#-công-nghệ-sử-dụng)
- [Kiến Trúc Hệ Thống](#-kiến-trúc-hệ-thống)
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
| **MySQL** | 8.0 | Hệ quản trị CSDL quan hệ, chạy trong Docker container |
| **Prisma ORM** | ^7.4.1 | ORM chính — type-safe, tự sinh model từ schema, hỗ trợ migration |
| **@prisma/adapter-mariadb** | ^7.4.1 | Adapter để Prisma kết nối MariaDB/MySQL |
| **Sequelize** | ^6.37.7 | ORM phụ trợ (dự phòng hoặc cho các truy vấn đặc thù) |
| **mysql2** | ^3.16.3 | Driver kết nối MySQL thuần |
| **Redis** | Alpine | In-memory cache & session store, chạy trong Docker container |

### Xác Thực & Bảo Mật

| Công nghệ | Phiên bản | Mô tả |
|---|---|---|
| **JSON Web Token (JWT)** | ^9.0.3 | Cơ chế xác thực stateless — Access Token + Refresh Token |
| **bcrypt** | ^6.0.0 | Hash mật khẩu với salt rounds = 10 |
| **cookie-parser** | ^1.4.7 | Đọc và ghi HTTP cookie (lưu Access/Refresh Token) |
| **Helmet** | ^8.2.0 | Bảo vệ HTTP headers — chống XSS, Clickjacking, MIME sniffing |
| **express-rate-limit** | ^8.5.2 | Chống DDoS/brute-force — giới hạn 100 request/15 phút mỗi IP |
| **Passport.js** | ^0.7.0 | Framework xác thực đa chiến lược |
| **passport-google-oauth20** | ^2.0.0 | Đăng nhập bằng tài khoản Google (OAuth 2.0) |
| **Zod** | ^4.4.3 | Schema validation — kiểm tra dữ liệu đầu vào type-safe |

### Giám Sát & Logging (Observability Stack)

| Công nghệ | Phiên bản | Mô tả |
|---|---|---|
| **Winston** | ^3.19.0 | Structured logging — ghi log có format, timestamp, level |
| **winston-elasticsearch** | ^0.19.0 | Transport đẩy log từ Winston vào Elasticsearch |
| **Elasticsearch** | 8.10.2 | Search engine — lưu trữ và tìm kiếm log tập trung |
| **Kibana** | 8.10.2 | Dashboard trực quan hoá log từ Elasticsearch |
| **Prometheus** | Latest | Thu thập metrics hệ thống (CPU, RAM, HTTP requests) |
| **prom-client** | ^15.1.3 | Thư viện xuất metrics Node.js cho Prometheus scrape |
| **Grafana** | Latest | Dashboard trực quan hoá metrics từ Prometheus |

### Real-time, Upload & Báo Cáo

| Công nghệ | Phiên bản | Mô tả |
|---|---|---|
| **Socket.IO** | ^4.8.3 | Giao tiếp real-time hai chiều (WebSocket) |
| **Multer** | ^2.1.1 | Xử lý `multipart/form-data` — upload file |
| **Cloudinary** | ^2.10.0 | Lưu trữ và quản lý media trên cloud |
| **multer-storage-cloudinary** | ^4.0.0 | Storage engine Multer → Cloudinary trực tiếp |
| **Nodemailer** | ^8.0.10 | Gửi email OTP xác thực, thông báo |
| **html-pdf-node** | ^1.0.8 | Xuất báo cáo PDF từ HTML template |
| **html-to-docx** | ^1.8.0 | Xuất báo cáo DOCX từ HTML template |
| **Marked** | ^18.0.5 | Chuyển đổi Markdown sang HTML |
| **csv-parser** | ^3.2.0 | Parse file CSV (import dữ liệu tra cứu) |
| **xlsx** | ^0.18.5 | Đọc/ghi file Excel |
| **@google/generative-ai** | ^0.24.1 | Tích hợp Google Gemini AI |

### DevOps & Containerization

| Công nghệ | Mô tả |
|---|---|
| **Docker** | Container hoá toàn bộ ứng dụng |
| **Docker Compose** | Orchestration 7 services: Backend, MySQL, Redis, Elasticsearch, Kibana, Prometheus, Grafana |
| **Swagger UI** | Tự động sinh tài liệu API tại `/api-docs` |

---

## 🏗️ Kiến Trúc Hệ Thống

### Kiến trúc phân lớp (Layered Architecture)

```
HTTP Request
     │
     ▼
┌──────────────┐
│   Helmet     │  Bảo vệ HTTP headers (XSS, Clickjack, MIME)
└──────┬───────┘
       │
       ▼
┌──────────────┐
│  Rate Limit  │  Chống DDoS (100 req/15 phút/IP)
└──────┬───────┘
       │
       ▼
┌──────────────┐
│    CORS      │  Cho phép origin localhost:3000/5173/5174
└──────┬───────┘
       │
       ▼
┌──────────────┐
│   Router     │  Định tuyến URL → Controller tương ứng
└──────┬───────┘
       │
       ▼
┌──────────────┐
│  Middleware   │  Xác thực JWT, log API, validate Zod
└──────┬───────┘
       │
       ▼
┌──────────────┐
│  Controller  │  Nhận request, gọi Service, trả response
└──────┬───────┘
       │
       ▼
┌──────────────┐
│   Service    │  Business logic, gọi Prisma/Redis
└──────┬───────┘
       │
       ▼
┌──────────────┐
│  Prisma ORM  │  Tương tác với MySQL database
└──────────────┘
```

### Kiến trúc Docker Compose (7 services)

```
┌─────────────────────────────────────────────────────────┐
│                    Docker Network                       │
│                                                         │
│  ┌──────────┐  ┌──────────┐  ┌───────────────────────┐  │
│  │  Backend  │  │  MySQL   │  │   Redis (Cache)       │  │
│  │  :3069   │──│  :3307   │  │   :6379               │  │
│  └──────────┘  └──────────┘  └───────────────────────┘  │
│       │                                                  │
│       │ logs ──────────────────────────┐                 │
│       │ metrics ────────┐              │                 │
│       ▼                 ▼              ▼                 │
│  ┌──────────┐    ┌────────────┐  ┌──────────────┐       │
│  │Prometheus│───▶│  Grafana   │  │Elasticsearch │       │
│  │  :9090   │    │   :3000    │  │   :9200      │       │
│  └──────────┘    └────────────┘  └──────┬───────┘       │
│                                         │               │
│                                   ┌─────▼──────┐        │
│                                   │   Kibana    │        │
│                                   │   :5601     │        │
│                                   └────────────┘        │
└─────────────────────────────────────────────────────────┘
```

---

## 🎨 Design Patterns

### 1. 📦 Service Layer Pattern

**Vị trí:** `src/services/*.service.js`

**Mô tả:** Toàn bộ nghiệp vụ (business logic) được tách biệt hoàn toàn khỏi Controller vào lớp Service. Controller chỉ đơn giản nhận request, chuyển cho Service xử lý và trả về response — không tự tính toán hay truy vấn database trực tiếp.

```javascript
// kinematics.service.js — tính toán động học
export const kinematicsService = {
  async calculate(req) {
    const project = await prisma.projects.findFirst({ ... });
    const eta = round3(ETA.kn * eta_ol4 * ETA.brc * ETA.brt * ETA.x);
    const P_ct = round3(P / eta);
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
helmet → rateLimit → cors → json parser → cookieParser → logApi → protect → controller
```

```javascript
// server.js — chuỗi bảo mật đầy đủ
app.use(helmet());                    // Bảo vệ HTTP headers
app.use(limiter);                     // Chống DDoS
app.use(cors({ origin: [...] }));     // CORS
app.use(express.json());              // Parse JSON body
app.use(cookieParser());              // Parse cookie
app.use(logApi("product"));           // Log mọi request ra terminal

// protect.middleware.js — middleware xác thực JWT
export const protect = async (req, res, next) => {
  const { accessToken } = req.cookies;
  if (!accessToken) throw new UnauthorizedException("Không có token");
  const decode = tokenService.verifyAccessToken(accessToken);
  req.user = await prisma.users.findUnique({ where: { id: decode.userId } });
  next();
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

// app-error.helper.js — Global Error Handler
export const appError = (err, req, res, next) => {
  const response = responseError(err?.message, err?.code, err?.stack);
  res.status(response.statusCode).json(response);
};
```

---

### 5. 📬 Standardized Response Pattern (Data Transfer Object)

**Vị trí:** `src/common/helpers/response.helper.js`

**Mô tả:** Toàn bộ response trả về client đều có cùng một cấu trúc chuẩn (DTO), giúp Frontend dễ dàng xử lý nhất quán.

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

### 6. 🗃️ Repository Pattern (qua Prisma ORM)

**Vị trí:** Toàn bộ `src/services/*.service.js` — sử dụng `prisma.*`

**Mô tả:** Prisma đóng vai trò là lớp **Data Access / Repository**, trừu tượng hóa toàn bộ tương tác với database. Service không viết SQL thuần mà chỉ gọi qua Prisma API type-safe.

```javascript
const project = await prisma.projects.findFirst({
  where: { id: Number(projectId), user_id: userId, isDeleted: false },
});

await prisma.projects.update({
  where: { id: Number(projectId) },
  data:  { efficiency: eta, Pct: P_ct, step: "kinematics" },
});
```

---

### 7. 🛤️ Router Aggregation Pattern

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
rootRouter.use("/projects/:projectId/report", reportRouter);
rootRouter.use("/materials", materialRouter);
export default rootRouter;

// server.js
app.use("/api", rootRouter);
```

---

## 📁 Cấu Trúc Thư Mục

```
expressjs/
├── server.js                        # Entry point — khởi động app + bảo mật
├── package.json
├── Dockerfile                       # Build image cho Docker
├── docker-compose.yml               # Orchestration 7 services
├── prometheus.yml                   # Cấu hình Prometheus scrape
├── prisma.config.ts
├── .env                             # Biến môi trường (GIT IGNORED)
├── .gitignore
├── prisma/
│   ├── schema.prisma                # Định nghĩa schema database
│   ├── seed.js                      # Nạp dữ liệu mẫu từ CSV vào DB
│   └── data/                        # Dữ liệu CSV cho seed
│       ├── material_grades.csv
│       ├── bearing_catalog.csv
│       ├── chain_params.csv
│       └── ...
└── src/
    ├── routers/                     # Định tuyến HTTP
    │   ├── root.router.js           # Gom toàn bộ sub-router
    │   ├── auth.router.js
    │   ├── user.router.js
    │   ├── input.router.js          # CRUD projects
    │   ├── kinematics.router.js
    │   ├── motor.router.js
    │   ├── design.router.js
    │   ├── material.router.js
    │   └── report.router.js
    ├── controllers/                 # Nhận request, trả response
    │   ├── auth.controller.js
    │   ├── user.controller.js
    │   ├── input.controller.js
    │   ├── kinematics.controller.js
    │   ├── motor.controller.js
    │   ├── design.controller.js
    │   ├── material.controller.js
    │   └── report.controller.js
    ├── services/                    # Business logic
    │   ├── auth.service.js
    │   ├── user.service.js
    │   ├── input.service.js
    │   ├── kinematics.service.js
    │   ├── motor.service.js
    │   ├── design.service.js
    │   ├── material.service.js
    │   ├── report.service.js
    │   ├── mail.service.js          # Gửi email OTP (Nodemailer)
    │   └── token.service.js
    ├── models/
    │   └── users.model.js
    └── common/                      # Dùng chung toàn ứng dụng
        ├── constant/
        │   └── app.constant.js      # Hằng số môi trường
        ├── helpers/
        │   ├── exception.helper.js  # Custom exception classes
        │   ├── response.helper.js   # Chuẩn hóa response
        │   ├── app-error.helper.js  # Global error handler
        │   ├── logger.helper.js     # Winston → Elasticsearch logger
        │   ├── metrics.helper.js    # Prometheus metrics endpoint
        │   ├── build-query-prisma.helper.js
        │   └── status-code.helper.js
        ├── middlewares/
        │   ├── protect.middleware.js         # JWT authentication guard
        │   ├── protect-header.middleware.js  # JWT từ Authorization header
        │   ├── log-api.middleware.js         # Request logging ra terminal
        │   └── zod.middleware.js             # Zod schema validation
        ├── passport/
        │   └── login-google.passport.js     # Google OAuth 2.0 strategy
        ├── prisma/
        │   ├── connect.prisma.js            # Singleton Prisma Client
        │   └── generated/prisma/            # Auto-generated Prisma types
        ├── redis/
        │   └── redis.client.js              # Redis client singleton
        ├── schema/
        │   └── auth.schema.js               # Zod validation schemas
        ├── sequelize/
        │   └── connect.sequelize.js
        ├── socket/
        │   └── init.socket.js               # Socket.IO initialization
        ├── multer/
        │   ├── cloudinary.config.js         # Upload → Cloudinary
        │   ├── disk-storage.multer.js       # Upload → local disk
        │   └── memory-storage.multer.js     # Upload → memory buffer
        └── swagger/
            ├── init.swagger.js
            ├── auth.swagger.js
            └── user.swagger.js
```

---

## ⚙️ Cài Đặt & Chạy

### Yêu cầu hệ thống

- Node.js >= 18.x
- Docker Desktop (cho MySQL, Redis, ELK, Grafana)

### Cách 1: Chạy full stack bằng Docker (Khuyên dùng)

```bash
# 1. Clone repository
git clone https://github.com/meow-null/DADN_CNPM_252_HCMUT.git

# 2. Di chuyển vào thư mục backend
cd DADN_CNPM_252_HCMUT
git checkout Backend
cd expressjs

# 3. Tạo file .env (xem mục Biến Môi Trường bên dưới)

# 4. Build và chạy toàn bộ 7 services
docker compose up -d --build

# 5. Nạp dữ liệu tra cứu mẫu (chạy lần đầu)
node prisma/seed.js
```

### Cách 2: Chạy Backend trên máy thật + Docker chỉ cho DB/Redis/ELK

```bash
# 1. Bật Database, Redis, Elasticsearch
docker compose up -d db redis elasticsearch

# 2. Cài đặt dependencies
npm install

# 3. Generate Prisma Client
npm run prisma

# 4. Chạy server development (auto-restart khi code thay đổi)
npm run dev
```

> 🌐 Server: **http://localhost:3069**
> 📖 API Docs (Swagger): **http://localhost:3069/api-docs**
> 📊 Grafana Dashboard: **http://localhost:3000**
> 🔍 Kibana (Log viewer): **http://localhost:5601**
> 📈 Prometheus: **http://localhost:9090**
> 📡 Metrics endpoint: **http://localhost:3069/metrics**

---

## 🔐 Biến Môi Trường

Tạo file `.env` trong thư mục `expressjs/` với nội dung sau:

```env
# Database
DATABASE_URL="mysql://root:123456@localhost:3307/DADN252"

# JWT Secrets
ACCESS_TOKEN_SECRET=your_access_token_secret_here
REFRESH_TOKEN_SECRET=your_refresh_token_secret_here

# Google OAuth 2.0
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Cloudinary (Upload ảnh)
CLOUDINARY_URL="cloudinary://api_key:api_secret@cloud_name"

# Email (Nodemailer / Brevo SMTP)
BREVO_SMTP_USER="your_brevo_smtp_user"
BREVO_SENDER_EMAIL="your_brevo_sender_email"
BREVO_SMTP_PASS="your_brevo_smtp_pass"

# ELK (tự động inject khi chạy Docker Compose)
ELASTICSEARCH_URL=http://localhost:9200

# Redis (tự động inject khi chạy Docker Compose)
REDIS_URL=redis://localhost:6379
```

---

## 🛡️ Bảo Mật & Chống Tấn Công

| Tính năng | Mô tả |
|---|---|
| **Helmet** | Thiết lập 15+ HTTP security headers — chống XSS, Clickjacking, MIME sniffing, DNS prefetch |
| **Rate Limiting** | Giới hạn 100 request/15 phút cho mỗi IP — chống DDoS, brute-force |
| **JWT (HttpOnly Cookie)** | Token lưu trong cookie HttpOnly — chống XSS đánh cắp token |
| **bcrypt** | Hash mật khẩu với salt 10 rounds — chống rainbow table |
| **CORS** | Chỉ cho phép các origin được whitelist |
| **Zod Validation** | Validate input type-safe — chống injection, dữ liệu bẩn |
| **OTP Email** | Xác thực 2 bước qua email khi đổi mật khẩu |

---

## 📊 Giám Sát & Logging

| Thành phần | URL | Mô tả |
|---|---|---|
| **Prometheus** | `http://localhost:9090` | Thu thập metrics: CPU, RAM, HTTP request count, response time |
| **Grafana** | `http://localhost:3000` | Dashboard trực quan hoá metrics (mặc định admin/admin) |
| **Elasticsearch** | `http://localhost:9200` | Lưu trữ log tập trung |
| **Kibana** | `http://localhost:5601` | Tìm kiếm và trực quan hoá log |
| **Metrics Endpoint** | `http://localhost:3069/metrics` | Endpoint Prometheus scrape (prom-client) |

---

## 🌱 Dữ Liệu Mẫu

File `prisma/seed.js` dùng để nạp lại các bảng tra cứu từ CSV trong `prisma/data/`.

Script hiện tại import các nhóm dữ liệu sau:

- `material_grades` — Cơ tính vật liệu (mác thép)
- `standard_modules` — Dãy mô đun tiêu chuẩn
- `standard_center_distances` — Dãy khoảng cách trục tiêu chuẩn
- `standard_shaft_diameters` — Dãy đường kính trục tiêu chuẩn
- `standard_key_lengths` — Dãy chiều dài then tiêu chuẩn
- `key_dimensions` — Bảng tra kích thước then
- `chains` — Bảng tra xích truyền động
- `bearings` — Bảng tra ổ lăn
- `motors` — Bảng tra động cơ điện

Chạy lại seed khi:

- Database vừa được tạo mới
- Cần đồng bộ lại dữ liệu tra cứu sau khi thay đổi file CSV
- Muốn nạp thêm danh sách động cơ, bạc đạn hoặc xích mới

---

## 🌐 API Endpoints

### 🔑 Authentication

| Method | Endpoint | Mô tả | Auth |
|--------|----------|-------|------|
| POST | `/api/auth/register` | Đăng ký tài khoản | - |
| POST | `/api/auth/verify-otp` | Xác thực OTP đăng ký | - |
| POST | `/api/auth/login` | Đăng nhập | - |
| GET | `/api/auth/get-info` | Lấy thông tin người dùng hiện tại | ✅ JWT |
| POST | `/api/auth/refresh-token` | Làm mới Access Token | - |
| POST | `/api/auth/request-change-password` | Yêu cầu đổi mật khẩu (gửi OTP qua email) | ✅ JWT |
| POST | `/api/auth/verify-change-password` | Xác thực OTP & đổi mật khẩu | ✅ JWT |

### 👤 Users

| Method | Endpoint | Mô tả | Auth |
|--------|----------|-------|------|
| GET | `/api/user` | Lấy danh sách user | - |
| GET | `/api/user/:id` | Lấy chi tiết user | - |
| POST | `/api/user/avatar-local` | Upload avatar xuống local storage | ✅ JWT |
| POST | `/api/user/avatar-cloud` | Upload avatar lên Cloudinary | ✅ JWT |

### 📐 Projects (CRUD + Tính Toán)

| Method | Endpoint | Mô tả | Auth |
|--------|----------|-------|------|
| POST | `/api/projects` | Tạo project mới | ✅ JWT |
| GET | `/api/projects` | Lấy danh sách project | ✅ JWT |
| GET | `/api/projects/:id` | Lấy thông tin project | ✅ JWT |
| PUT | `/api/projects/:id` | Cập nhật project | ✅ JWT |
| DELETE | `/api/projects/:id` | Xoá project (soft delete) | ✅ JWT |
| PATCH | `/api/projects/:id/cover` | Upload ảnh bìa project lên Cloudinary | ✅ JWT |
| POST | `/api/projects/:id/kinematics` | Tính toán động học | ✅ JWT |
| GET | `/api/projects/:id/kinematics` | Lấy kết quả động học | ✅ JWT |

### ⚙️ Motors

| Method | Endpoint | Mô tả | Auth |
|--------|----------|-------|------|
| GET | `/api/motors` | Lấy toàn bộ danh sách động cơ | - |
| GET | `/api/projects/:projectId/motors/suggestions` | Gợi ý top 3 động cơ phù hợp | ✅ JWT |
| GET | `/api/projects/:projectId/motors/candidates` | Lấy danh sách ứng viên động cơ | ✅ JWT |
| POST | `/api/projects/:projectId/motors/select` | Lưu động cơ đã chọn | ✅ JWT |

### 🔧 Design & Report

| Method | Endpoint | Mô tả | Auth |
|--------|----------|-------|------|
| POST | `/api/projects/:projectId/design/calculate` | Tính toán thiết kế hộp giảm tốc | ✅ JWT |
| GET | `/api/projects/:projectId/report` | Xuất báo cáo (PDF/DOCX) | ✅ JWT |

### 🧱 Materials

| Method | Endpoint | Mô tả | Auth |
|--------|----------|-------|------|
| GET | `/api/materials/grades` | Lấy danh sách vật liệu (mác thép) | - |

> 📖 Xem đầy đủ và test trực tiếp tại: **http://localhost:3069/api-docs**

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
  Xây dựng với ❤️ bằng Node.js & Express.js<br/>
  <sub>Bảo mật bởi Helmet · Rate Limit · JWT · Zod | Giám sát bởi ELK · Prometheus · Grafana</sub>
</div>
