import { responseSuccess } from '../common/helpers/response.helper.js';
import { kinematicsService } from '../services/kinematics.service.js';

export const kinematicsController = {
  async calculate(req, res, next) {
    try {
      const result = await kinematicsService.calculate(req);
      const response = responseSuccess(result, 'Calculated kinematics successfully');
      res.status(response.statusCode).json(response);
    } catch (err) { next(err); }
  },

  async findOne(req, res, next) {
    try {
      const result = await kinematicsService.findOne(req);
      const response = responseSuccess(result, 'Found kinematics successfully');
      res.status(response.statusCode).json(response);
    } catch (err) { next(err); }
  },
};