import { responseSuccess } from "../common/helpers/response.helper.js";
import {
    BadRequestException,
    ServiceUnavailableException,
} from "../common/helpers/exception.helper.js";
import { catalogService } from "../services/catalog.service.js";
import { statusCodes } from "../common/helpers/status-code.helper.js";

const DB_ERROR_MESSAGE = "Lỗi truy xuất dữ liệu Catalog. Vui lòng thử lại sau";

const createCatalogHandlers = (modelName, label) => {
    return {
        getAll: async (req, res, next) => {
            try {
                const result = await catalogService.getAll(modelName, req);
                const response = responseSuccess(
                    result,
                    `Lấy danh sách ${label} thành công`
                );
                return res.status(response.statusCode).json(response);
            } catch (error) {
                if (error?.code?.startsWith?.("P") || error?.name?.includes?.("Prisma")) {
                    return next(new ServiceUnavailableException(DB_ERROR_MESSAGE));
                }
                next(error);
            }
        },

        getById: async (req, res, next) => {
            try {
                const { id } = req.params;
                const result = await catalogService.getById(modelName, id);
                const response = responseSuccess(
                    result,
                    `Lấy thông tin ${label} thành công`
                );
                return res.status(response.statusCode).json(response);
            } catch (error) {
                if (error?.code?.startsWith?.("P") || error?.name?.includes?.("Prisma")) {
                    return next(new ServiceUnavailableException(DB_ERROR_MESSAGE));
                }
                next(error);
            }
        },

        create: async (req, res, next) => {
            try {
                const adminId = req.user.id;
                const result = await catalogService.create(modelName, req.body, adminId);
                const response = responseSuccess(
                    result,
                    `Thêm mới ${label} thành công`,
                    statusCodes.CREATED
                );
                return res.status(response.statusCode).json(response);
            } catch (error) {
                if (error?.code?.startsWith?.("P") || error?.name?.includes?.("Prisma")) {
                    return next(new ServiceUnavailableException(DB_ERROR_MESSAGE));
                }
                next(error);
            }
        },

        update: async (req, res, next) => {
            try {
                const { id } = req.params;
                const adminId = req.user.id;
                const result = await catalogService.update(modelName, id, req.body, adminId);
                const response = responseSuccess(
                    result,
                    `Cập nhật ${label} thành công`
                );
                return res.status(response.statusCode).json(response);
            } catch (error) {
                if (error?.code?.startsWith?.("P") || error?.name?.includes?.("Prisma")) {
                    return next(new ServiceUnavailableException(DB_ERROR_MESSAGE));
                }
                next(error);
            }
        },

        delete: async (req, res, next) => {
            try {
                const { id } = req.params;
                const adminId = req.user.id;
                const result = await catalogService.softDelete(modelName, id, adminId);
                const response = responseSuccess(
                    result,
                    `Xóa ${label} thành công`
                );
                return res.status(response.statusCode).json(response);
            } catch (error) {
                if (error?.code?.startsWith?.("P") || error?.name?.includes?.("Prisma")) {
                    return next(new ServiceUnavailableException(DB_ERROR_MESSAGE));
                }
                next(error);
            }
        },

        toggleActive: async (req, res, next) => {
            try {
                const { id } = req.params;
                const adminId = req.user.id;
                const { item, status } = await catalogService.toggleActive(
                    modelName,
                    id,
                    adminId
                );
                const response = responseSuccess(
                    item,
                    `${label} đã được ${status} thành công`
                );
                return res.status(response.statusCode).json(response);
            } catch (error) {
                if (error?.code?.startsWith?.("P") || error?.name?.includes?.("Prisma")) {
                    return next(new ServiceUnavailableException(DB_ERROR_MESSAGE));
                }
                next(error);
            }
        },

        restore: async (req, res, next) => {
            try {
                const { id } = req.params;
                const adminId = req.user.id;
                const result = await catalogService.restore(modelName, id, adminId);
                const response = responseSuccess(
                    result,
                    `Phục hồi ${label} thành công`
                );
                return res.status(response.statusCode).json(response);
            } catch (error) {
                if (error?.code?.startsWith?.("P") || error?.name?.includes?.("Prisma")) {
                    return next(new ServiceUnavailableException(DB_ERROR_MESSAGE));
                }
                next(error);
            }
        },
    };
};

export const motorCatalogController = createCatalogHandlers("motors", "Động cơ");
export const bearingCatalogController = createCatalogHandlers("bearings", "Ổ lăn");
export const chainCatalogController = createCatalogHandlers("chains", "Xích");
