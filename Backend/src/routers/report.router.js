import express from "express";
import { reportController } from "../controllers/report.controller.js";
import { protect } from "../common/middlewares/protect.middleware.js";

const reportRouter = express.Router({ mergeParams: true });

reportRouter.get("/preview", protect, reportController.generatePreview);
reportRouter.post("/pdf", protect, reportController.exportPdf);
reportRouter.post("/word", protect, reportController.exportWord);

export default reportRouter;
