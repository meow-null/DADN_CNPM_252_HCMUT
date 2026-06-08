import { responseSuccess } from "../common/helpers/response.helper.js";
import { authService } from "../services/auth.service.js";

export const authController = {
    async register(req, res, next) {
        const result = await authService.register(req);
        const response = responseSuccess(result, `Vui lòng kiểm tra email để nhận mã OTP.`);
        res.status(response.statusCode).json(response);
    },

    async verifyOtp(req, res, next) {
        const result = await authService.verifyOtp(req);
        const response = responseSuccess(result, `Xác thực email thành công.`);
        res.status(response.statusCode).json(response);
    },

    async login(req, res, next) {
        const result = await authService.login(req);

        const response = responseSuccess(true, `login auths successfully`);

        const isProduction = process.env.NODE_ENV === "production" || !req.hostname.includes("localhost");
        const cookieOptions = {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "none" : "lax",
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        };

        res.cookie("accessToken", result.accessToken, cookieOptions);
        res.cookie("refreshToken", result.refreshToken, cookieOptions);

        res.status(response.statusCode).json(response);
    },

    async getInfo(req, res, next) {
        const result = await authService.getInfo(req);
        const response = responseSuccess(result, `getInfo auth successfully`);
        res.status(response.statusCode).json(response);
    },

    async refreshToken(req, res, next) {
        const result = await authService.refreshToken(req);

        const response = responseSuccess(true, `refreshToken auths successfully`);

        const isProduction = process.env.NODE_ENV === "production" || !req.hostname.includes("localhost");
        const cookieOptions = {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "none" : "lax",
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        };

        res.cookie("accessToken", result.accessToken, cookieOptions);
        res.cookie("refreshToken", result.refreshToken, cookieOptions);

        res.status(response.statusCode).json(response);
    },

    async requestChangePassword(req, res, next) {
        const result = await authService.requestChangePassword(req);
        const response = responseSuccess(result, `Mã OTP xác thực đã được gửi đến email của bạn.`);
        res.status(response.statusCode).json(response);
    },

    async verifyChangePassword(req, res, next) {
        const result = await authService.verifyChangePassword(req);
        const response = responseSuccess(result, `Đổi mật khẩu thành công.`);
        res.status(response.statusCode).json(response);
    }
};
