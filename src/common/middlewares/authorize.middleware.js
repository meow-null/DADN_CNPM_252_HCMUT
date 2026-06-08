import { ForbiddenException } from "../helpers/exception.helper.js";

export const authorizeAdmin = (req, res, next) => {
    if (req.user?.role !== "admin") {
        throw new ForbiddenException(
            "Bạn không có quyền thực hiện thao tác này. Chỉ Admin mới có quyền."
        );
    }
    next();
};
