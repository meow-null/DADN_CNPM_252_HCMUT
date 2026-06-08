import jwt from "jsonwebtoken";
import { BadRequestException } from "../common/helpers/exception.helper.js";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../common/constant/app.constant.js";

export const tokenService = {
    createAccessToken(userId) {
        if (!userId) {
            throw new BadRequestException("không có userId để tạo token");
        }

        // accessToken <=> AT (ghi tắt)
        const accessToken = jwt.sign({ userId: userId }, ACCESS_TOKEN_SECRET, { expiresIn: "1d" });

        return accessToken;
    },
    createRefreshToken(userId) {
        if (!userId) {
            throw new BadRequestException("không có userId để tạo token");
        }

        // refreshToken <=> RT (ghi tắt)
        const refreshToken = jwt.sign({ userId: userId }, REFRESH_TOKEN_SECRET, { expiresIn: "1d" });

        return refreshToken;
    },

    verifyAccessToken(acccessToken, option) {
        const decode = jwt.verify(acccessToken, ACCESS_TOKEN_SECRET, option);
        return decode
    },
    verifyRefreshToken(refreshToken, option) {
        const decode = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, option);
        return decode
    },
};
