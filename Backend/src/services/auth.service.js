import { BadRequestException, UnauthorizedException } from "../common/helpers/exception.helper.js";
import { prisma } from "../common/prisma/connect.prisma.js";
import bcrypt from "bcrypt";
import { tokenService } from "./token.service.js";
import { mailService } from "./mail.service.js";
import crypto from "crypto";


export const authService = {
    async register(req) {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
        throw new BadRequestException("Vui lòng cung cấp đủ email, password và name.");
    }

    if (name.length > 30) {
        throw new BadRequestException("Tên người dùng tối đa 30 ký tự.");
    }

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{4,20}$/;
    if (!passwordRegex.test(password)) {
        throw new BadRequestException("Mật khẩu từ 4-20 ký tự, phải có ít nhất 1 số, 1 chữ thường, 1 chữ hoa, và 1 ký tự đặc biệt.");
    }

    const userExist = await prisma.users.findUnique({
        where: { email },
    });

    if (userExist) {
        if (!userExist.is_verified && userExist.verify_token_expiry < new Date()) {
            // Xóa user cũ chưa xác thực và đã hết hạn để cho phép đăng ký lại
            await prisma.users.delete({ where: { id: userExist.id } });
        } else {
            throw new BadRequestException("Tài khoản đã được đăng ký.");
        }
    }

    const passwordHash = bcrypt.hashSync(password, 10);
    // Sinh OTP 4 số
    const verifyToken = Math.floor(1000 + Math.random() * 9000).toString();
    const expiryDate = new Date(Date.now() + 5 * 60 * 1000); // 5 phút

    const userNew = await prisma.users.create({
        data: {
            email,
            password: passwordHash,            
            name: name,
            verify_token: verifyToken,
            verify_token_expiry: expiryDate,
            is_verified: false
        },
    });

    // Gửi email xác thực
    await mailService.sendVerificationEmail(email, name, verifyToken);

    return true;
},

async login(req) {
    const { email, password } = req.body;       // ← thêm dòng này

    const userExist = await prisma.users.findUnique({
        where: { email },
        omit: { password: false },
    });

    if (!userExist) {
        throw new BadRequestException("Account Invalid.");
    }

    const isPassword = bcrypt.compareSync(password, userExist.password);

    if (!isPassword) {
        throw new BadRequestException("Tài khoản hoặc mật khẩu không chính xác!");
    }

    if (!userExist.is_verified) {
        throw new UnauthorizedException("Tài khoản chưa được xác thực. Vui lòng kiểm tra email của bạn.");
    }

    const accessToken  = tokenService.createAccessToken(userExist.id);
    const refreshToken = tokenService.createRefreshToken(userExist.id);

    return { accessToken, refreshToken };
},

async refreshToken(req) {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
        throw new UnauthorizedException("Không có refresh token");
    }

    try {
        const decode = tokenService.verifyRefreshToken(refreshToken);
        const userExist = await prisma.users.findUnique({
            where: { id: decode.userId },
        });

        if (!userExist) {
            throw new UnauthorizedException("Người dùng không tồn tại");
        }

        const newAccessToken = tokenService.createAccessToken(userExist.id);
        const newRefreshToken = tokenService.createRefreshToken(userExist.id);

        return { accessToken: newAccessToken, refreshToken: newRefreshToken };
    } catch (error) {
        throw new UnauthorizedException("Refresh token không hợp lệ hoặc đã hết hạn");
    }
},

async getInfo(req) {
    const userInfo = await prisma.users.findUnique({
        where: { id: req.user.id },
        select: {
            id: true,
            name: true,
            email: true,
            avatar_url: true,
            role: true,
            createdAt: true,
            updatedAt: true,
        },
    });

    if (!userInfo) {
        throw new UnauthorizedException("Người dùng không tồn tại");
    }

    return userInfo;
},

async requestChangePassword(req) {
    const { oldPassword, newPassword } = req.body;
    const userId = req.user.id;

    if (!oldPassword || !newPassword) {
        throw new BadRequestException("Vui lòng cung cấp mật khẩu cũ và mật khẩu mới.");
    }

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{4,20}$/;
    if (!passwordRegex.test(newPassword)) {
        throw new BadRequestException("Mật khẩu mới từ 4-20 ký tự, phải có ít nhất 1 số, 1 chữ thường, 1 chữ hoa, và 1 ký tự đặc biệt.");
    }

    const user = await prisma.users.findUnique({
        where: { id: userId },
        omit: { password: false },
    });

    if (!user) {
        throw new UnauthorizedException("Người dùng không tồn tại.");
    }

    const isPasswordValid = bcrypt.compareSync(oldPassword, user.password);
    if (!isPasswordValid) {
        throw new BadRequestException("Mật khẩu cũ không chính xác.");
    }

    const changePasswordOtp = Math.floor(1000 + Math.random() * 9000).toString();
    const expiryDate = new Date(Date.now() + 5 * 60 * 1000);

    await prisma.users.update({
        where: { id: userId },
        data: {
            change_password_token: changePasswordOtp,
            change_password_token_expiry: expiryDate,
        },
    });

    await mailService.sendChangePasswordOtpEmail(user.email, user.name, changePasswordOtp);

    return true;
},

async verifyChangePassword(req) {
    const { otp, newPassword } = req.body;
    const userId = req.user.id;

    if (!otp || !newPassword) {
        throw new BadRequestException("Vui lòng cung cấp mã OTP và mật khẩu mới.");
    }

    const user = await prisma.users.findUnique({
        where: { id: userId },
    });

    if (!user || user.change_password_token !== otp) {
        throw new BadRequestException("Mã OTP không chính xác.");
    }

    if (user.change_password_token_expiry < new Date()) {
        throw new BadRequestException("Mã OTP đã hết hạn (quá 5 phút). Vui lòng thử lại.");
    }

    const newPasswordHash = bcrypt.hashSync(newPassword, 10);

    await prisma.users.update({
        where: { id: userId },
        data: {
            password: newPasswordHash,
            change_password_token: null,
            change_password_token_expiry: null,
        },
    });

    return true;
},

async verifyOtp(req) {
    const { email, otp } = req.body;

    if (!email || !otp) {
        throw new BadRequestException("Thiếu email hoặc mã OTP.");
    }

    const user = await prisma.users.findFirst({
        where: { email, verify_token: otp },
    });

    if (!user) {
        throw new BadRequestException("Mã OTP không chính xác.");
    }

    if (user.verify_token_expiry < new Date()) {
        throw new BadRequestException("Mã OTP đã hết hạn (quá 5 phút). Vui lòng đăng ký lại.");
    }

    await prisma.users.update({
        where: { id: user.id },
        data: {
            is_verified: true,
            verify_token: null, // Xóa token sau khi dùng xong
            verify_token_expiry: null,
        },
    });

    return true;
},
};


