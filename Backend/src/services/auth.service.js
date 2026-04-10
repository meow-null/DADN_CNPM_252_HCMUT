import { BadRequestException, UnauthorizedException } from "../common/helpers/exception.helper.js";
import { prisma } from "../common/prisma/connect.prisma.js";
import bcrypt from "bcrypt";
import { tokenService } from "./token.service.js";


export const authService = {
    async register(req) {
    const { email, password, name } = req.body;

    const userExist = await prisma.users.findUnique({
        where: { email },
    });

    if (userExist) {
        throw new BadRequestException("User already existed.");
    }

    const passwordHash = bcrypt.hashSync(password, 10);

    const userNew = await prisma.users.create({
        data: {
            email,
            password: passwordHash,            
            name: name,                  
        },
    });

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
        throw new BadRequestException("Account Invalid!");
    }

    const accessToken  = tokenService.createAccessToken(userExist.id);
    const refreshToken = tokenService.createRefreshToken(userExist.id);

    return { accessToken, refreshToken };
},

async getInfo(req) {
    const userInfo = await prisma.users.findUnique({
        where: { id: req.user.id },
        select: {
            id: true,
            name: true,
            email: true,
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
};


