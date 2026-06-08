import express from "express";
import { userController } from "../controllers/user.controller.js";
import { uploadDiskStorage } from "../common/multer/disk-storage.multer.js";
import { protect } from "../common/middlewares/protect.middleware.js";
import { uploadMemoryStorage } from "../common/multer/memory-storage.multer.js";

import { uploadCloud } from "../common/multer/cloudinary.config.js";

const userRouter = express.Router();

// Tạo route CRUD
userRouter.get("", userController.findAll)
userRouter.get("/:id", userController.findOne)
userRouter.patch("/avatar", protect, uploadCloud.single("avatar"), userController.avatarCloud);

export default userRouter;
