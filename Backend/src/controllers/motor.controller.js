import { responseSuccess } from "../common/helpers/response.helper.js";
import {
  BadRequestException,
  ServiceUnavailableException,
} from "../common/helpers/exception.helper.js";
import { motorService } from "../services/motor.service.js";

const CATALOG_DB_ERROR_MESSAGE =
  "Lỗi truy xuất dữ liệu Catalog. Vui lòng thử lại sau";

const getProjectMotorSuggestions = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    if (!projectId) {
      throw new BadRequestException("Vui lòng cung cấp projectId hợp lệ");
    }
    const userId = req.user.id;

    const result = await motorService.suggestByProject({
      projectId,
      userId,
      takeTop3: true,
    });

    const response = responseSuccess(result, "Đề xuất top 3 động cơ phù hợp thành công");
    return res.status(response.statusCode).json(response);
  } catch (error) {
    if (error?.code?.startsWith?.("P") || error?.name?.includes?.("Prisma")) {
      return next(new ServiceUnavailableException(CATALOG_DB_ERROR_MESSAGE));
    }
    next(error);
  }
};

const getAllProjectMotorCandidates = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    if (!projectId) {
      throw new BadRequestException("Vui lòng cung cấp projectId hợp lệ");
    }
    const userId = req.user.id;

    const result = await motorService.suggestByProject({
      projectId,
      userId,
      takeTop3: false,
    });

    const response = responseSuccess(result, "Lấy danh sách động cơ thỏa mãn thành công");
    return res.status(response.statusCode).json(response);
  } catch (error) {
    if (error?.code?.startsWith?.("P") || error?.name?.includes?.("Prisma")) {
      return next(new ServiceUnavailableException(CATALOG_DB_ERROR_MESSAGE));
    }
    next(error);
  }
};

const selectProjectMotor = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    if (!projectId) {
      throw new BadRequestException("Vui lòng cung cấp projectId hợp lệ");
    }
    const userId = req.user.id;
    const motorId = Number(req.body?.motorId);

    if (!Number.isFinite(motorId)) {
      throw new BadRequestException("Vui lòng cung cấp motorId hợp lệ");
    }

    const result = await motorService.selectMotorForProject({
      projectId,
      userId,
      motorId,
    });

    const response = responseSuccess(result, "Lựa chọn động cơ thành công");
    return res.status(response.statusCode).json(response);
  } catch (error) {
    if (error?.code?.startsWith?.("P") || error?.name?.includes?.("Prisma")) {
      return next(new ServiceUnavailableException(CATALOG_DB_ERROR_MESSAGE));
    }
    next(error);
  }
};

export const motorController = {
  getProjectMotorSuggestions,
  getAllProjectMotorCandidates,
  selectProjectMotor,
};