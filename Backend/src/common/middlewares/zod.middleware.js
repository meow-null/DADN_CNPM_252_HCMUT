import { z } from "zod";
import { BadRequestException } from "../helpers/exception.helper.js";

export const validateRequest = (schema) => async (req, res, next) => {
    try {
        await schema.parseAsync(req.body);
        next();
    } catch (error) {
        if (error instanceof z.ZodError) {
            const errorMessages = error.errors.map((issue) => `${issue.path.join('.')}: ${issue.message}`);
            next(new BadRequestException(`Validation failed: ${errorMessages.join(', ')}`));
        } else {
            next(error);
        }
    }
};
