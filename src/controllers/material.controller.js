import { responseSuccess } from "../common/helpers/response.helper.js";
import { materialService } from "../services/material.service.js";

export const materialController = {
  async getMaterialGrades(req, res, next) {
    try {
      const result = await materialService.getMaterialGrades();
      const response = responseSuccess(result, "Lấy danh sách vật liệu thành công.");
      res.status(response.statusCode).json(response);
    } catch (error) {
      next(error);
    }
  },

  async getMaterialGradeById(req, res, next) {
    try {
      const { gradeId } = req.params;
      const result = await materialService.getMaterialGradeById(gradeId);
      const response = responseSuccess(result, "Lấy chi tiết vật liệu thành công.");
      res.status(response.statusCode).json(response);
    } catch (error) {
      next(error);
    }
  }
};
