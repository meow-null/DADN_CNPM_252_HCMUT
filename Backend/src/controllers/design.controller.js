import designService from "../services/design.service.js";
import { responseSuccess } from "../common/helpers/response.helper.js"; // Giả định bạn có helper này

export const calculateDesign = async (req, res, next) => {
  try {
    const { projectId } = req.params;

    // Gọi Service chạy toàn bộ UC05
    const { designResult, warning } = await designService.processUC05(Number(projectId), req.body?.overrides);
    return res.status(200).json({
      status: "success",
      message: "Tính toán thiết kế chi tiết máy thành công",
      warning,
      data: designResult
    });
  } catch (error) {
    // Pass lỗi (EF1, EF2...) sang Middleware xử lý lỗi
    next(error);
  }
};