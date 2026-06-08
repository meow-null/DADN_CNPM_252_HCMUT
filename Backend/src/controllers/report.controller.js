import { reportService } from "../services/report.service.js";
import { responseSuccess } from "../common/helpers/response.helper.js";

export const reportController = {
  async generatePreview(req, res, next) {
    try {
      const { projectId } = req.params;
      const result = await reportService.generatePreview(projectId, req.user.id);
      res.status(200).json(responseSuccess(result, "Generated preview successfully", 200));
    } catch (error) {
      next(error);
    }
  },

  async exportWord(req, res, next) {
    try {
      const { markdown } = req.body;
      const buffer = await reportService.exportWord(markdown);
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
      res.setHeader('Content-Disposition', 'attachment; filename=Thuyet-Minh-Ky-Thuat.docx');
      res.send(buffer);
    } catch (error) {
      next(error);
    }
  },

  async exportPdf(req, res, next) {
    try {
      const { markdown } = req.body;
      const buffer = await reportService.exportPdf(markdown);
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=Thuyet-Minh-Ky-Thuat.pdf');
      res.send(buffer);
    } catch (error) {
      next(error);
    }
  }
};
