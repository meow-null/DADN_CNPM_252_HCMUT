import express from "express";
import { appError } from "./src/common/helpers/app-error.helper.js";
import rootRouter from "./src/routers/root.router.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { logApi } from "./src/common/middlewares/log-api.middleware.js";
import swaggerUi from "swagger-ui-express";
import { swaggerDocument } from "./src/common/swagger/init.swagger.js";
import { initSocket } from "./src/common/socket/init.socket.js";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { metricsEndpoint } from "./src/common/helpers/metrics.helper.js";
import { initLoginGooglePassport } from "./src/common/passport/login-google.passport.js";

const app = express();

// Security: Helmet
app.use(helmet());

// Security: Rate Limit (100000 requests per 15 minutes for all routes in dev)
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100000,
    message: "Quá nhiều request từ IP này, vui lòng thử lại sau 15 phút.",
});
app.use(limiter);

// System Metrics for Grafana
app.get("/metrics", metricsEndpoint);

// xử lý cors bằng cơm
// app.use((req, res, next) => {
//     console.log(req.headers);

//     res.setHeader("access-control-allow-methods", "GET,HEAD,PUT,PATCH,DELETE,POST");
//     res.setHeader("access-control-allow-headers", "content-type")
//     res.setHeader("access-control-allow-origin", "*")
//     next();
// });
const allowedOrigins = [
    "http://localhost:3000", 
    "http://localhost:5173", 
    "http://localhost:5174",
    "http://localhost:5175",
    "http://localhost:5176",
    "http://127.0.0.1:5173", 
    "http://127.0.0.1:5174",
    "http://127.0.0.1:5175",
    "http://127.0.0.1:5176"
];
// Thêm domain Vercel frontend từ biến môi trường (khi deploy production)
if (process.env.FRONTEND_URL) {
    // Loại bỏ dấu nháy đơn, nháy kép và dấu gạch chéo cuối url nếu có
    const formattedOrigin = process.env.FRONTEND_URL.replace(/['"]/g, "").replace(/\/$/, "");
    allowedOrigins.push(formattedOrigin);
    allowedOrigins.push(`${formattedOrigin}/`);
}
app.use(cors({ 
    origin: (origin, callback) => {
        // Cho phép các request không có origin (ví dụ: Mobile app, Postman, server-to-server)
        if (!origin) return callback(null, true);
        
        // Kiểm tra xem origin có nằm trong danh sách được định nghĩa sẵn không
        if (allowedOrigins.indexOf(origin) !== -1) {
            return callback(null, true);
        }
        
        // Hỗ trợ Vercel Preview/Branch deployments: Cho phép mọi domain kết thúc bằng .vercel.app
        if (origin.endsWith(".vercel.app") || origin.endsWith("vercel.app")) {
            return callback(null, true);
        }
        
        // Chặn các origin khác
        callback(null, false);
    },
    credentials: true 
}));


// để lấy được body (đảm bảo trước "/api")
app.use(express.json());
// để lấy được cookie (đảm bảo trước "/api")
app.use(cookieParser());
app.use(logApi("product"));
initLoginGooglePassport();
app.use(express.static("public"));

// swwagger
// http://localhost:3069/api-docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Health Check endpoint — Railway sẽ dùng endpoint này để kiểm tra service còn sống không
app.get("/health", async (req, res) => {
    try {
        // Kiểm tra kết nối database
        const { prisma } = await import("./src/common/prisma/connect.prisma.js");
        await prisma.$queryRaw`SELECT 1`;
        res.status(200).json({
            status: "healthy",
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
            services: {
                database: "connected",
                server: "running",
            },
        });
    } catch (error) {
        res.status(503).json({
            status: "unhealthy",
            timestamp: new Date().toISOString(),
            error: error.message,
        });
    }
});

app.use("/api", rootRouter);
app.use(appError);

const httpServer = initSocket(app);

const PORT = process.env.PORT || 3069;
const server = httpServer.listen(PORT, () => {
    console.log(`Server online at port: ${PORT}`);
});
server.requestTimeout = 0;

// js Version cũ: common-js
// const express =  required("express")

// ES6: phiên bản nâng cấp rất rất nhiều của js

// js Version mới: es-module
// import express from "express"

// npx prisma db pull: kéo database vào code và tạo ra model
// npx prisma generate: tạo ra object CLIENT để sử dụng trong code (để dev)

// EXPRESSS verssion <5: phải bắt try/catch trong controller

