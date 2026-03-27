import express from 'express';
import { inputController } from '../controllers/input.controller.js';
import { protect } from '../common/middlewares/protect.middleware.js';

const inputRouter = express.Router({ mergeParams: true });

inputRouter.post('/',            protect, inputController.create);
inputRouter.get('/',             protect, inputController.findAll);  
inputRouter.get('/:projectId',   protect, inputController.findOne);  
inputRouter.put('/:projectId',   protect, inputController.update);  
inputRouter.delete('/:projectId',protect, inputController.delete);   

export default inputRouter;