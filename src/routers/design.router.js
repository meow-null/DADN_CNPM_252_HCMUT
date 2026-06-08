import express from "express";
import { calculateDesign } from "../controllers/design.controller.js";

// BẮT BUỘC phải có { mergeParams: true } để lấy được :projectId từ rootRouter
const designRouter = express.Router({ mergeParams: true });

/**
 * Route: POST /projects/:projectId/design/calculate
 * Description: Process UC05 - Design the transmission system
 */
designRouter.post("/calculate", calculateDesign);

export default designRouter;