import path from "path";
import { BadRequestException } from "../common/helpers/exception.helper.js";
import { prisma } from "../common/prisma/connect.prisma.js";
import { buildQueryPrisma } from "../common/helpers/build-query-prisma.helper.js";
export const userService = {
    async findAll(req) {
        // sequelize
        // const resultSequelize = await Article.findAll();

        const { index, page, pageSize, where } = buildQueryPrisma(req);

        const resultPrismaPromise = prisma.users.findMany({
            where: where,
            skip: index, // skip tương đương với OFFSET
            take: pageSize, // take tương đương với LIMIT
        });
        const totalItemPromise = prisma.users.count({
            // ở findMany mà where cái gì thì đưa vào count giống như vậy
            where: where,
        });

        const [resultPrisma, totalItem] = await Promise.all([resultPrismaPromise, totalItemPromise]);

        const totalPage = Math.ceil(totalItem / pageSize);

        return {
            totalItem: totalItem,
            totalPage: totalPage,
            page: page,
            pageSize: pageSize,
            items: resultPrisma,
        };
    },

    async findOne(req) {
        const { id } = req.params;

        const user = await prisma.users.findUnique({
            where: {
                id: Number(id),
            },
        });

        return user;
    },

    async avatarCloud(req) {
        if (!req.file) {
            throw new BadRequestException("Thiếu file upload");
        }

        const avatarUrl = req.file.path; // URL do Cloudinary trả về thông qua multer-storage-cloudinary

        await prisma.users.update({
            where: {
                id: req.user.id,
            },
            data: {
                avatar_url: avatarUrl,
            },
        });

        return { avatar_url: avatarUrl };
    },
};
