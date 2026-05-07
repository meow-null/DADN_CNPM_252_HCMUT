import express from "express";
import { calculateDesign } from "../controllers/design.controller.js";

const designRouter = express.Router({ mergeParams: true });

// Route thực thi UC05: Tính toán chi tiết máy
designRouter.post("/calculate", calculateDesign);

export default designRouter;