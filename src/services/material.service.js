import { prisma } from "../common/prisma/connect.prisma.js";

export const materialService = {
  async getMaterialGrades() {
    try {
      const grades = await prisma.material_grades.findMany({
        orderBy: { id: 'asc' }
      });
      return grades.map(g => ({
        id: g.id,
        name: g.grade_name,
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
  },

  async getMaterialGradeById(gradeId) {
    try {
      const grade = await prisma.material_grades.findUnique({
        where: { id: Number(gradeId) }
      });
      if (!grade) throw new Error('Vật liệu không tồn tại');
      return {
        id: grade.id,
        name: grade.grade_name,
        HB: grade.HB,
        sigma_b: grade.sigma_b,
        sigma_ch: grade.sigma_ch,
        sigma_Hlim: grade.sigma_Hlim,
        sigma_Flim: grade.sigma_Flim
      };
    } catch (error) {
      console.error('Lỗi khi lấy vật liệu từ DB:', error);
      throw error;
    }
  }
};
