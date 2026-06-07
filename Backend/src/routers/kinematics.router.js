import express from 'express';
import { kinematicsController } from '../controllers/kinematics.controller.js';
import { protect } from '../common/middlewares/protect.middleware.js';

const kinematicsRouter = express.Router({ mergeParams: true });

kinematicsRouter.post('/:projectId/kinematics', protect, kinematicsController.calculate);
kinematicsRouter.get('/:projectId/kinematics', protect, kinematicsController.findOne);

export default kinematicsRouter;