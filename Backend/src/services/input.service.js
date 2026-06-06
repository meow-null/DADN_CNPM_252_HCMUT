import { BadRequestException, NotfoundException, UnprocessableEntityException } from "../common/helpers/exception.helper.js";
import { prisma } from "../common/prisma/connect.prisma.js";
export const inputService = {

  async create(req) {
    const userId = req.user.id;
    const { name, input_P, input_n_ct, input_L, selected_material_id } = req.body;
    const errors = [];
    if (!name) errors.push('Vui lòng nhập tên dự án');
    if (!input_P || input_P <= 0) errors.push('Vui lòng nhập công suất dương hợp lệ');
    if (!input_n_ct || input_n_ct <= 0) errors.push('Vui lòng nhập số vòng quay dương hợp lệ');
    if (!input_L || input_L <= 0) errors.push('Vui lòng nhập thời gian phục vụ dương hợp lệ');

    if (errors.length > 0) {
      throw new BadRequestException(errors.join('; ')); 
    }

    const newProject = await prisma.projects.create({
      data: {
        name:       name,
        user_id:    userId,
        input_P:    Number(input_P),
        input_n_ct: Number(input_n_ct),
        input_L:    Number(input_L),
        selected_material_id: selected_material_id ? Number(selected_material_id) : null,
        step:       'inputs',
      },
      select: {
        id:         true,
        name:       true,
        input_P:    true,
        input_n_ct: true,
        input_L:    true,
        selected_material_id: true,
        step:       true,
      },
    });

    return newProject;
  },

  async findAll(req) {
    const userId = req.user.id;
    const inputs = await prisma.projects.findMany({
      where: { user_id: userId, isDeleted: false },
      select: { id: true, name: true, input_P: true, input_n_ct: true, input_L: true, selected_material_id: true, step: true },
      orderBy: { createdAt: 'desc' } 
    });

    return inputs;
  },

  async findOne(req) {
    const { projectId } = req.params;
    const userId = req.user.id;

    const input = await prisma.projects.findFirst({
      where: { id: Number(projectId), user_id: userId, isDeleted: false },
      select: { id: true, name: true, input_P: true, input_n_ct: true, input_L: true, selected_material_id: true, step: true },
    });

    if (!input) throw new NotfoundException('Dự án không tồn tại hoặc không thuộc về bạn');
    return input;
  },

  async update(req) {
    const { projectId } = req.params;
    const userId = req.user.id;
    const { input_P, input_n_ct, input_L, selected_material_id } = req.body;

    const errors = [];
    if (input_P && input_P <= 0) errors.push('Công suất phải là số dương');
    if (input_n_ct && input_n_ct <= 0) errors.push('Số vòng quay phải là số dương');
    if (input_L && input_L <= 0) errors.push('Thời gian phục vụ phải là số dương');
    
    if (errors.length > 0) {
      throw new BadRequestException(errors.join('; '));
    }

    const project = await prisma.projects.findFirst({
      where: { id: Number(projectId), user_id: userId, isDeleted: false },
    });
    if (!project) throw new NotfoundException('Dự án không tồn tại hoặc không thuộc về bạn');

    const updatedInput = await prisma.projects.update({
      where: { id: Number(projectId) },
      data: {
        ...(input_P && { input_P: Number(input_P) }),
        ...(input_n_ct && { input_n_ct: Number(input_n_ct) }),
        ...(input_L && { input_L: Number(input_L) }),
        ...(selected_material_id !== undefined && { selected_material_id: selected_material_id ? Number(selected_material_id) : null }),
        updatedAt: new Date(),
      },
      select: { id: true, name: true, input_P: true, input_n_ct: true, input_L: true, selected_material_id: true, step: true },
    });

    return updatedInput;
  },

  async delete(req) {
    const { projectId } = req.params;
    const userId = req.user.id;

    const project = await prisma.projects.findFirst({
      where: { id: Number(projectId), user_id: userId, isDeleted: false },
    });
    if (!project) throw new NotfoundException('Dự án không tồn tại hoặc đã bị xóa');

    await prisma.projects.update({
      where: { id: Number(projectId) },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
        deletedBy: userId
      }
    });

    return { id: projectId, status: "Đã xóa thành công" };
  }
};