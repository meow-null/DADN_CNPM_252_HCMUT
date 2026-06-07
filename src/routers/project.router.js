import express from 'express';
import { projectController } from '../controllers/project.controller.js';
import { protect } from '../common/middlewares/protect.middleware.js';

const projectRouter = express.Router({ mergeParams: true });

projectRouter.post('/',            protect, projectController.create);
projectRouter.get('/',             protect, projectController.findAll);
projectRouter.get('/:projectId',   protect, projectController.findOne);
projectRouter.put('/:projectId',   protect, projectController.update);
projectRouter.delete('/:projectId',protect, projectController.delete);

export default projectRouter;
