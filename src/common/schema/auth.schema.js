import { z } from "zod";

export const authSchema = {
    register: z.object({
        email: z.string().email({ message: "Email không hợp lệ" }),
        password: z.string().min(6, { message: "Mật khẩu phải từ 6 ký tự trở lên" }),
        name: z.string().min(2, { message: "Tên phải từ 2 ký tự trở lên" }).optional(),
    }),
    login: z.object({
        email: z.string().email({ message: "Email không hợp lệ" }),
        password: z.string().min(1, { message: "Vui lòng nhập mật khẩu" }),
    }),
};
