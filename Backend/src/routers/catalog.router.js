import express from "express";
import { protect } from "../common/middlewares/protect.middleware.js";
import { authorizeAdmin } from "../common/middlewares/authorize.middleware.js";
import { validateRequest } from "../common/middlewares/zod.middleware.js";
import { catalogSchema } from "../common/schema/catalog.schema.js";
import {
    motorCatalogController,
    bearingCatalogController,
    chainCatalogController,
} from "../controllers/catalog.controller.js";

const catalogRouter = express.Router();

catalogRouter.get("/motors", protect, motorCatalogController.getAll);
catalogRouter.get("/motors/:id", protect, motorCatalogController.getById);
catalogRouter.post(
    "/motors",
    protect,
    authorizeAdmin,
    validateRequest(catalogSchema.motor.create),
    motorCatalogController.create
);
catalogRouter.patch(
    "/motors/:id",
    protect,
    authorizeAdmin,
    validateRequest(catalogSchema.motor.update),
    motorCatalogController.update
);
catalogRouter.delete("/motors/:id", protect, authorizeAdmin, motorCatalogController.delete);
catalogRouter.patch(
    "/motors/:id/toggle-active",
    protect,
    authorizeAdmin,
    motorCatalogController.toggleActive
);
catalogRouter.patch(
    "/motors/:id/restore",
    protect,
    authorizeAdmin,
    motorCatalogController.restore
);

catalogRouter.get("/bearings", protect, bearingCatalogController.getAll);
catalogRouter.get("/bearings/:id", protect, bearingCatalogController.getById);
catalogRouter.post(
    "/bearings",
    protect,
    authorizeAdmin,
    validateRequest(catalogSchema.bearing.create),
    bearingCatalogController.create
);
catalogRouter.patch(
    "/bearings/:id",
    protect,
    authorizeAdmin,
    validateRequest(catalogSchema.bearing.update),
    bearingCatalogController.update
);
catalogRouter.delete("/bearings/:id", protect, authorizeAdmin, bearingCatalogController.delete);
catalogRouter.patch(
    "/bearings/:id/toggle-active",
    protect,
    authorizeAdmin,
    bearingCatalogController.toggleActive
);
catalogRouter.patch(
    "/bearings/:id/restore",
    protect,
    authorizeAdmin,
    bearingCatalogController.restore
);

catalogRouter.get("/chains", protect, chainCatalogController.getAll);
catalogRouter.get("/chains/:id", protect, chainCatalogController.getById);
catalogRouter.post(
    "/chains",
    protect,
    authorizeAdmin,
    validateRequest(catalogSchema.chain.create),
    chainCatalogController.create
);
catalogRouter.patch(
    "/chains/:id",
    protect,
    authorizeAdmin,
    validateRequest(catalogSchema.chain.update),
    chainCatalogController.update
);
catalogRouter.delete("/chains/:id", protect, authorizeAdmin, chainCatalogController.delete);
catalogRouter.patch(
    "/chains/:id/toggle-active",
    protect,
    authorizeAdmin,
    chainCatalogController.toggleActive
);
catalogRouter.patch(
    "/chains/:id/restore",
    protect,
    authorizeAdmin,
    chainCatalogController.restore
);

export default catalogRouter;
