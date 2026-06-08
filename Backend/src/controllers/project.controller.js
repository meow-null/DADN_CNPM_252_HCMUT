import { responseSuccess } from '../common/helpers/response.helper.js';
import { projectService }  from '../services/project.service.js';

export const projectController = {

  async create(req, res, next) {
    try {
      const result   = await projectService.create(req);
      const response = responseSuccess(result, 'Create project successfully');
      res.status(response.statusCode).json(response);
    } catch (err) {
      next(err);
    }
  },

  async findAll(req, res, next) {
    try {
      const result   = await projectService.findAll(req);
      const response = responseSuccess(result, 'Get all projects successfully');
      res.status(response.statusCode).json(response);
    } catch (err) {
      next(err);
    }
  },

  async findOne(req, res, next) {
    try {
      const result = await projectService.findOne(req);
      const response = responseSuccess(result, `Get one project successfully`);
      res.status(response.statusCode).json(response);
    } catch (err) {
      next(err);
    }
  },

  async update(req, res, next) {
    try {
      const result = await projectService.update(req);
      const response = responseSuccess(result, "Updated project successfully");
      res.status(response.statusCode).json(response);
    } catch (err) {
      next(err);
    }
  },

  async delete(req, res, next) {
    try {
      const result = await projectService.delete(req);
      const response = responseSuccess(result, "Deleted project successfully");
      res.status(response.statusCode).json(response);
    } catch (err) {
      next(err);
    }
  },
};
