import express from "express";
import { authController } from "../controllers/auth.controller.js";
import { protect } from "../common/middlewares/protect.middleware.js";

const authRouter = express.Router();

authRouter.post("/register", authController.register);
authRouter.post("/verify-otp", authController.verifyOtp);
authRouter.post("/login", authController.login);
authRouter.get("/get-info", protect, authController.getInfo);
authRouter.post("/refresh-token", authController.refreshToken);
authRouter.post("/request-change-password", protect, authController.requestChangePassword);
authRouter.post("/verify-change-password", protect, authController.verifyChangePassword);

export default authRouter;