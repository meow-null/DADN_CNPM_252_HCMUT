import { responseSuccess } from '../common/helpers/response.helper.js';
import { inputService }    from '../services/input.service.js';

export const inputController = {

  async create(req, res, next) {
    try {
      const result   = await inputService.create(req);
      const response = responseSuccess(result, 'Create input successfully');
      res.status(response.statusCode).json(response);
    } catch (err) {
      next(err);
    }
  },

  async findAll(req, res, next) {
    try {
      const result   = await inputService.findAll(req);
      const response = responseSuccess(result, 'Get all inputs successfully');
      res.status(response.statusCode).json(response);
    } catch (err) {
      next(err);
    }
  },

  async findOne(req, res, next) {
    try {
      const result = await inputService.findOne(req);
      const response = responseSuccess(result, `Get one input successfully`);
      res.status(response.statusCode).json(response);
    } catch (err) {
      next(err);
    }
  },

  async update(req, res, next) {
    try {
      const result = await inputService.update(req);
      const response = responseSuccess(result, "Updated input successfully");
      res.status(response.statusCode).json(response);
    } catch (err) {
      next(err);
    }
  },

  async delete(req, res, next) {
    try {
      const result = await inputService.delete(req);
      const response = responseSuccess(result, "Deleted input successfully");
      res.status(response.statusCode).json(response);
    } catch (err) {
      next(err);
    }
  },

  async uploadCover(req, res, next) {
    try {
      const result = await inputService.uploadCover(req);
      const response = responseSuccess(result, "Upload cover successfully");
      res.status(response.statusCode).json(response);
    } catch (err) {
      next(err);
    }
  },
};