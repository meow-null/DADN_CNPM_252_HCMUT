import { prisma } from "../common/prisma/connect.prisma.js";
import {
    BadRequestException,
    NotfoundException,
    ConflictException,
    ServiceUnavailableException,
} from "../common/helpers/exception.helper.js";
import { buildQueryPrisma } from "../common/helpers/build-query-prisma.helper.js";

const DB_ERROR_MESSAGE = "Lỗi truy xuất dữ liệu Catalog. Vui lòng thử lại sau";

const getModelDelegate = (modelName) => {
    const map = {
        motors: prisma.motors,
        bearings: prisma.bearings,
        chains: prisma.chains,
    };
    const delegate = map[modelName];
    if (!delegate) {
        throw new BadRequestException(`Model '${modelName}' không hợp lệ`);
    }
    return delegate;
};

const getModelLabel = (modelName) => {
    const labels = {
        motors: "Động cơ",
        bearings: "Ổ lăn",
        chains: "Xích",
    };
    return labels[modelName] || modelName;
};

const getAll = async (modelName, req) => {
    const delegate = getModelDelegate(modelName);
    const { index, page, pageSize, where } = buildQueryPrisma(req);

    try {
        const [items, totalItem] = await Promise.all([
            delegate.findMany({
                where: { ...where, isDeleted: false },
                skip: index,
                take: pageSize,
                orderBy: { id: "asc" },
            }),
            delegate.count({
                where: { ...where, isDeleted: false },
            }),
        ]);

        const totalPage = Math.ceil(totalItem / pageSize);

        return {
            totalItem,
            totalPage,
            page,
            pageSize,
            items,
        };
    } catch (error) {
        if (error?.code?.startsWith?.("P") || error?.name?.includes?.("Prisma")) {
            throw new ServiceUnavailableException(DB_ERROR_MESSAGE);
        }
        throw error;
    }
};

const getById = async (modelName, id) => {
    const delegate = getModelDelegate(modelName);
    const label = getModelLabel(modelName);
    const parsedId = Number(id);

    if (!Number.isFinite(parsedId)) {
        throw new BadRequestException("ID không hợp lệ");
    }

    try {
        const item = await delegate.findFirst({
            where: { id: parsedId, isDeleted: false },
        });

        if (!item) {
            throw new NotfoundException(`${label} không tồn tại hoặc đã bị xóa`);
        }

        return item;
    } catch (error) {
        if (error instanceof NotfoundException) throw error;
        if (error?.code?.startsWith?.("P") || error?.name?.includes?.("Prisma")) {
            throw new ServiceUnavailableException(DB_ERROR_MESSAGE);
        }
        throw error;
    }
};

const create = async (modelName, data, adminId) => {
    const delegate = getModelDelegate(modelName);
    const label = getModelLabel(modelName);

    try {
        const newItem = await delegate.create({
            data: {
                ...data,
                is_active: true,
                isDeleted: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        });

        return newItem;
    } catch (error) {
        if (error?.code === "P2002") {
            const fields = error.meta?.target?.join?.(", ") || "mã linh kiện";
            throw new ConflictException(
                `${label} đã tồn tại với ${fields}. Vui lòng kiểm tra lại.`
            );
        }
        if (error?.code?.startsWith?.("P") || error?.name?.includes?.("Prisma")) {
            throw new ServiceUnavailableException(DB_ERROR_MESSAGE);
        }
        throw error;
    }
};

const update = async (modelName, id, data, adminId) => {
    const delegate = getModelDelegate(modelName);
    const label = getModelLabel(modelName);
    const parsedId = Number(id);

    if (!Number.isFinite(parsedId)) {
        throw new BadRequestException("ID không hợp lệ");
    }

    const existing = await delegate.findFirst({
        where: { id: parsedId, isDeleted: false },
    });

    if (!existing) {
        throw new NotfoundException(`${label} không tồn tại hoặc đã bị xóa`);
    }

    try {
        const updatedItem = await delegate.update({
            where: { id: parsedId },
            data: {
                ...data,
                updatedAt: new Date(),
            },
        });

        return updatedItem;
    } catch (error) {
        if (error?.code === "P2002") {
            const fields = error.meta?.target?.join?.(", ") || "mã linh kiện";
            throw new ConflictException(
                `Mã linh kiện đã tồn tại hoặc dữ liệu không hợp lệ (${fields}). Vui lòng kiểm tra lại.`
            );
        }
        if (error?.code?.startsWith?.("P") || error?.name?.includes?.("Prisma")) {
            throw new ServiceUnavailableException(DB_ERROR_MESSAGE);
        }
        throw error;
    }
};

const softDelete = async (modelName, id, adminId) => {
    const delegate = getModelDelegate(modelName);
    const label = getModelLabel(modelName);
    const parsedId = Number(id);

    if (!Number.isFinite(parsedId)) {
        throw new BadRequestException("ID không hợp lệ");
    }

    const existing = await delegate.findFirst({
        where: { id: parsedId, isDeleted: false },
    });

    if (!existing) {
        throw new NotfoundException(`${label} không tồn tại hoặc đã bị xóa`);
    }

    if (modelName === "motors") {
        const usedInProjects = await prisma.projects.count({
            where: {
                selected_motor_id: parsedId,
                isDeleted: false,
            },
        });

        if (usedInProjects > 0) {
            throw new ConflictException(
                `Linh kiện này đang được sử dụng trong dự án của người dùng. ` +
                `Không thể xóa. Chỉ có thể chuyển trạng thái sang Ẩn (Vô hiệu hóa).`
            );
        }
    }

    try {
        const deletedItem = await delegate.update({
            where: { id: parsedId },
            data: {
                isDeleted: true,
                is_active: false,
                deletedAt: new Date(),
                deletedBy: adminId,
                updatedAt: new Date(),
            },
        });

        return deletedItem;
    } catch (error) {
        if (error?.code?.startsWith?.("P") || error?.name?.includes?.("Prisma")) {
            throw new ServiceUnavailableException(DB_ERROR_MESSAGE);
        }
        throw error;
    }
};

const toggleActive = async (modelName, id, adminId) => {
    const delegate = getModelDelegate(modelName);
    const label = getModelLabel(modelName);
    const parsedId = Number(id);

    if (!Number.isFinite(parsedId)) {
        throw new BadRequestException("ID không hợp lệ");
    }

    const existing = await delegate.findFirst({
        where: { id: parsedId, isDeleted: false },
    });

    if (!existing) {
        throw new NotfoundException(`${label} không tồn tại hoặc đã bị xóa`);
    }

    try {
        const updatedItem = await delegate.update({
            where: { id: parsedId },
            data: {
                is_active: !existing.is_active,
                updatedAt: new Date(),
            },
        });

        const status = updatedItem.is_active ? "kích hoạt" : "vô hiệu hóa";
        return { item: updatedItem, status };
    } catch (error) {
        if (error?.code?.startsWith?.("P") || error?.name?.includes?.("Prisma")) {
            throw new ServiceUnavailableException(DB_ERROR_MESSAGE);
        }
        throw error;
    }
};

export const catalogService = {
    getAll,
    getById,
    create,
    update,
    softDelete,
    toggleActive,
};
