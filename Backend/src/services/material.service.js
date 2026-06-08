import { prisma } from "../common/prisma/connect.prisma.js";

export const materialService = {
  async getMaterialGrades() {
    try {
      const grades = await prisma.material_grades.findMany({
        orderBy: { id: 'asc' }
      });
      return grades.map(g => ({
        id: g.id,
        grade_name: g.grade_name,
        HB: g.HB,
        sigma_b: g.sigma_b,
        sigma_ch: g.sigma_ch,
        sigma_Hlim: g.sigma_Hlim,
        sigma_Flim: g.sigma_Flim
      }));
    } catch (error) {
      console.error('Lỗi khi lấy danh sách vật liệu từ DB:', error);
      throw new Error('Không thể lấy danh sách vật liệu');
    }
  }
};
