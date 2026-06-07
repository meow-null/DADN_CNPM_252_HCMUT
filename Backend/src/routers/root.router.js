import express from "express";
import authRouter from "./auth.router.js";
import userRouter from "./user.router.js";
import inputRouter from "./input.router.js";
import kinematicsRouter from './kinematics.router.js';
import motorRouter from "./motor.router.js";
import designRouter from "./design.router.js";
import materialRouter from "./material.router.js";
import reportRouter from "./report.router.js";

const rootRouter = express.Router()
rootRouter.use("/projects", inputRouter);
rootRouter.use("/auth", authRouter);
rootRouter.use("/user", userRouter);
rootRouter.use("/projects", kinematicsRouter);
rootRouter.use("/motors", motorRouter);
rootRouter.use("/projects/:projectId/motors", motorRouter);
rootRouter.use("/projects/:projectId/design", designRouter);
rootRouter.use("/projects/:projectId/report", reportRouter);
rootRouter.use("/materials", materialRouter);

export default rootRouter