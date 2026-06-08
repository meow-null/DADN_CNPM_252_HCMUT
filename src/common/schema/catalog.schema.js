import { z } from "zod";

const motorCreateSchema = z.object({
    code: z
        .string({ required_error: "Mã động cơ là bắt buộc" })
        .min(1, "Mã động cơ không được để trống")
        .max(50, "Mã động cơ tối đa 50 ký tự"),
    series: z.string().max(10).optional().nullable(),
    P_dm: z
        .number({ required_error: "Công suất định mức (P_dm) là bắt buộc" })
        .positive("P_dm phải lớn hơn 0"),
    n_dm: z
        .number({ required_error: "Số vòng quay định mức (n_dm) là bắt buộc" })
        .int("n_dm phải là số nguyên")
        .positive("n_dm phải lớn hơn 0"),
    efficiency: z.number().min(0).max(1).optional().nullable(),
    cos_phi: z.number().min(0).max(1).optional().nullable(),
    t_start_ratio: z.number().positive().optional().nullable(),
    t_max_ratio: z.number().positive().optional().nullable(),
    mass_kg: z.number().positive().optional().nullable(),
    price: z.number().min(0).optional().nullable(),
});

const motorUpdateSchema = motorCreateSchema.partial();

const bearingCreateSchema = z.object({
    code: z
        .string({ required_error: "Mã ổ lăn là bắt buộc" })
        .min(1, "Mã ổ lăn không được để trống")
        .max(50, "Mã ổ lăn tối đa 50 ký tự"),
    type: z.string().max(50).optional().nullable(),
    inner_d: z
        .number({ required_error: "Đường kính trong (inner_d) là bắt buộc" })
        .positive("inner_d phải lớn hơn 0"),
    outer_D: z
        .number({ required_error: "Đường kính ngoài (outer_D) là bắt buộc" })
        .positive("outer_D phải lớn hơn 0"),
    width_B: z
        .number({ required_error: "Chiều rộng (width_B) là bắt buộc" })
        .positive("width_B phải lớn hơn 0"),
    C: z.number().positive().optional().nullable(),
    C0: z.number().positive().optional().nullable(),
    Y: z.number().optional().nullable(),
    alpha_deg: z.number().min(0).max(90).optional().nullable(),
    e: z.number().optional().nullable(),
});

const bearingUpdateSchema = bearingCreateSchema.partial();

const chainCreateSchema = z.object({
    pitch: z
        .number({ required_error: "Bước xích (pitch) là bắt buộc" })
        .positive("pitch phải lớn hơn 0"),
    breaking_load: z.number().positive().optional().nullable(),
    mass_per_m: z.number().positive().optional().nullable(),
    A_mm2: z.number().positive().optional().nullable(),
    P_allow: z.number().positive().optional().nullable(),
    n_ref: z.number().int().positive().optional().nullable(),
    s_allow: z.number().positive().optional().nullable(),
});

const chainUpdateSchema = chainCreateSchema.partial();

export const catalogSchema = {
    motor: {
        create: motorCreateSchema,
        update: motorUpdateSchema,
    },
    bearing: {
        create: bearingCreateSchema,
        update: bearingUpdateSchema,
    },
    chain: {
        create: chainCreateSchema,
        update: chainUpdateSchema,
    },
};
