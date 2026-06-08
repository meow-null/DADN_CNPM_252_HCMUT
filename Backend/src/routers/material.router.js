import express from "express";
import { materialController } from "../controllers/material.controller.js";

const materialRouter = express.Router();

materialRouter.get("/", materialController.getMaterialGrades);
materialRouter.get("/grades", materialController.getMaterialGrades);

export default materialRouter;
