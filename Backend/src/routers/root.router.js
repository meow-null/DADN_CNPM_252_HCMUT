import express from "express";
import authRouter from "./auth.router.js";
import userRouter from "./user.router.js";
import inputRouter from "./input.router.js";
import kinematicsRouter from './kinematics.router.js';
import motorRouter from "./motor.router.js";
import designRouter from "./design.router.js";
import { prisma } from "../common/prisma/connect.prisma.js";
import { protect } from "../common/middlewares/protect.middleware.js";

const rootRouter = express.Router()
rootRouter.use("/projects", inputRouter);
rootRouter.use("/auth", authRouter);
rootRouter.use("/user", userRouter);
rootRouter.use("/projects", kinematicsRouter);
rootRouter.use("/motors", motorRouter);
rootRouter.use("/projects/:projectId/motors", motorRouter);
rootRouter.use("/projects/:projectId/design", designRouter);

rootRouter.get("/materials", protect, async (req, res, next) => {
  try {
    const materials = await prisma.material_grades.findMany();
    return res.status(200).json({
      status: "success",
      message: "Lấy danh sách vật liệu thành công",
      data: materials
    });
  } catch (error) {
    next(error);
  }
});

export default rootRouter