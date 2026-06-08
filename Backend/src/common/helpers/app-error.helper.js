import { responseError } from "./response.helper.js";
import { statusCodes } from "./status-code.helper.js";

export const appError = (err, req, res, next) => {
    console.log("mid đặc biệt bắt lỗi", err);

    let statusCode = err?.code;
    // Nếu status code không phải số (ví dụ mã Prisma "P2022"), chuyển thành 500 Internal Server Error
    if (typeof statusCode !== 'number' || isNaN(statusCode)) {
        statusCode = statusCodes.INTERNAL_SERVER_ERROR;
    }

    const response = responseError(err?.message, statusCode, err?.stack);

    res.status(response.statusCode).json(response);
};

