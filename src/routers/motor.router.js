import express from "express";
import { motorController } from "../controllers/motor.controller.js";
import { protect } from "../common/middlewares/protect.middleware.js";

const motorRouter = express.Router({ mergeParams: true });

motorRouter.get("/suggestions", protect, motorController.getProjectMotorSuggestions);
motorRouter.get("/candidates", protect, motorController.getAllProjectMotorCandidates);
motorRouter.post("/select", protect, motorController.selectProjectMotor);

export default motorRouter;