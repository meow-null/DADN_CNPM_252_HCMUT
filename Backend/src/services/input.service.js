import { BadRequestException, NotfoundException, UnprocessableEntityException } from "../common/helpers/exception.helper.js";
import { prisma } from "../common/prisma/connect.prisma.js";
export const inputService = {

  async create(req) {
    const userId = req.user.id;
    const { name, input_P, input_n_ct, input_L } = req.body;
    const errors = [];
    
    if (!name || name.trim().length < 1 || name.trim().length > 50) {
      errors.push('Tên dự án phải dài từ 1 đến 50 ký tự');
    }
    
    if (input_P === undefined || input_P === null || input_P === '') {
      errors.push('Vui lòng nhập Công suất P');
    } else {
      const p = Number(input_P);
      if (p < 0.01 || p > 55) errors.push('Công suất P phải nằm trong khoảng 0.01 kW đến 55.0 kW');
    }

    if (input_n_ct === undefined || input_n_ct === null || input_n_ct === '') {
      errors.push('Vui lòng nhập Số vòng quay n');
    } else {
      const n = Number(input_n_ct);
      if (n < 1 || n > 1000) errors.push('Số vòng quay n phải nằm trong khoảng 1 đến 1000 v/p');
    }

    if (input_L === undefined || input_L === null || input_L === '') {
      errors.push('Vui lòng nhập Thời gian phục vụ L');
    } else {
      const l = Number(input_L);
      if (l < 1 || l > 100) errors.push('Thời gian phục vụ L phải nằm trong khoảng 1 đến 100 năm');
    }

    if (errors.length > 0) {
      throw new BadRequestException(errors.join('; ')); 
    }

    // Check if project name already exists for this user
    const existingProject = await prisma.projects.findFirst({
      where: { user_id: userId, name: name, isDeleted: false }
    });
    if (existingProject) {
      throw new BadRequestException('Tên dự án đã tồn tại trong danh sách của bạn. Vui lòng chọn tên khác.');
    }

    const newProject = await prisma.projects.create({
      data: {
        name:       name,
        user_id:    userId,
        input_P:    Number(input_P),
        input_n_ct: Number(input_n_ct),
        input_L:    Number(input_L),
        step:       'inputs',
      },
      select: {
        id:         true,
        name:       true,
        input_P:    true,
        input_n_ct: true,
        input_L:    true,
        cover_url:  true,
        step:       true,
      },
    });

    return newProject;
  },

  async findAll(req) {
    const userId = req.user.id;
    const inputs = await prisma.projects.findMany({
      where: { user_id: userId, isDeleted: false },
      select: { id: true, name: true, input_P: true, input_n_ct: true, input_L: true, cover_url: true, step: true, selected_motor_snapshot: true, design_result: true, transmission: true, shafts: true },
      orderBy: { createdAt: 'desc' } 
    });

    return inputs;
  },

  async findOne(req) {
    const { projectId } = req.params;
    const userId = req.user.id;

    const input = await prisma.projects.findFirst({
      where: { id: Number(projectId), user_id: userId, isDeleted: false },
      select: { id: true, name: true, input_P: true, input_n_ct: true, input_L: true, cover_url: true, step: true, selected_motor_snapshot: true, design_result: true, transmission: true, shafts: true },
    });

    if (!input) throw new NotfoundException('Dự án không tồn tại hoặc không thuộc về bạn');
    return input;
  },

  async update(req) {
    const { projectId } = req.params;
    const userId = req.user.id;
    const { name, input_P, input_n_ct, input_L } = req.body;

    const errors = [];
    if (name !== undefined) {
      if (!name || name.trim().length < 3 || name.trim().length > 100) {
        errors.push('Tên dự án phải dài từ 3 đến 100 ký tự');
      }
    }

    if (input_P === '') {
      errors.push('Vui lòng nhập Công suất P');
    } else if (input_P !== undefined && input_P !== null) {
      const p = Number(input_P);
      if (p < 0.1 || p > 55) errors.push('Công suất P phải nằm trong khoảng 0.1 kW đến 55.0 kW');
    }

    if (input_n_ct === '') {
      errors.push('Vui lòng nhập Số vòng quay n');
    } else if (input_n_ct !== undefined && input_n_ct !== null) {
      const n = Number(input_n_ct);
      if (n < 5 || n > 300) errors.push('Số vòng quay n phải nằm trong khoảng 5 đến 300 v/p');
    }

    if (input_L === '') {
      errors.push('Vui lòng nhập Thời gian phục vụ L');
    } else if (input_L !== undefined && input_L !== null) {
      const l = Number(input_L);
      if (l < 1 || l > 20) errors.push('Thời gian phục vụ L phải nằm trong khoảng 1 đến 20 năm');
    }
    
    if (errors.length > 0) {
      throw new BadRequestException(errors.join('; '));
    }

    if (name) {
      const existingProject = await prisma.projects.findFirst({
        where: { user_id: userId, name: name, isDeleted: false, id: { not: Number(projectId) } }
      });
      if (existingProject) {
        throw new BadRequestException('Tên dự án đã tồn tại trong danh sách của bạn. Vui lòng chọn tên khác.');
      }
    }

    const project = await prisma.projects.findFirst({
      where: { id: Number(projectId), user_id: userId, isDeleted: false },
    });
    if (!project) throw new NotfoundException('Dự án không tồn tại hoặc không thuộc về bạn');

    const updatedInput = await prisma.projects.update({
      where: { id: Number(projectId) },
      data: {
        ...(name && { name }),
        ...(input_P && { input_P: Number(input_P) }),
        ...(input_n_ct && { input_n_ct: Number(input_n_ct) }),
        ...(input_L && { input_L: Number(input_L) }),
        updatedAt: new Date(),
      },
      select: { id: true, name: true, input_P: true, input_n_ct: true, input_L: true, cover_url: true, step: true, selected_motor_snapshot: true, design_result: true, transmission: true, shafts: true },
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
  },

  async uploadCover(req) {
    const { projectId } = req.params;
    const userId = req.user.id;

    if (!req.file) {
      throw new BadRequestException("Thiếu file upload");
    }

    const project = await prisma.projects.findFirst({
      where: { id: Number(projectId), user_id: userId, isDeleted: false },
    });

    if (!project) {
      throw new NotfoundException('Dự án không tồn tại hoặc đã bị xóa');
    }

    const coverUrl = req.file.path; // URL from Cloudinary

    await prisma.projects.update({
      where: { id: Number(projectId) },
      data: {
        cover_url: coverUrl,
      },
    });

    return { id: Number(projectId), cover_url: coverUrl };
  }
};