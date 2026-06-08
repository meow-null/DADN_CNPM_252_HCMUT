import designService from "../services/design.service.js";

export const calculateDesign = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    
    // Đọc overrides từ request body (cho cả DADN live calculate và chạy thường)
    const overrides = req.body?.overrides || req.body;
    
    // Gọi Service chạy toàn bộ UC05
    const { designResult, project, warning } = await designService.processUC05(Number(projectId), overrides);
    
    return res.status(200).json({
      status: "success",
      message: "Tính toán thiết kế chi tiết máy thành công",
      data: designResult,
      project: project,
      warning: warning
    });
  } catch (error) {
    // Pass lỗi (EF1, EF2...) sang Middleware xử lý lỗi
    next(error); 
  }
};