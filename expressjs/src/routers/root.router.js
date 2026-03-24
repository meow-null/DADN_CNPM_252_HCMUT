import express from "express";
import authRouter from "./auth.router.js";
import userRouter from "./user.router.js";
import inputRouter from "./input.router.js";

const rootRouter = express.Router()
rootRouter.use("/projects", inputRouter);
rootRouter.use("/auth", authRouter);
rootRouter.use("/user", userRouter);
export default rootRouter