import { prisma } from "../common/prisma/connect.prisma.js";
import { BadRequestException } from "../common/helpers/exception.helper.js";
import { marked } from "marked";
import htmlPdf from "html-pdf-node";
import HTMLtoDOCX from "html-to-docx";

export const reportService = {
  async generatePreview(projectId, userId) {
    const project = await prisma.projects.findFirst({
      where: { id: Number(projectId), user_id: userId, isDeleted: false },
      include: { motors: true }
    });

    if (!project) throw new BadRequestException("Project không tồn tại");

    if (!process.env.LM_STUDIO_URL) {
       throw new BadRequestException("Chưa cấu hình LM_STUDIO_URL");
    }

    const prompt = `
Bạn là một kỹ sư cơ khí chuyên nghiệp. Dựa vào các thông số sau của chương trình THIẾT KẾ HỆ 
THỐNG DẪN ĐỘNG THÙNG TRỘN, hãy viết một bản báo cáo THIẾT KẾ HỆ 
THỐNG DẪN ĐỘNG THÙNG TRỘN chi tiết bằng tiếng Việt. Định dạng kết quả bằng Markdown.

Thông số đầu vào:
- Công suất cần thiết trên trục (P): ${project.input_P} kW
- Số vòng quay công tác (n_ct): ${project.input_n_ct} vòng/phút
- Tuổi thọ (L): ${project.input_L} giờ

Động học:
- Tỷ số truyền tổng (u_t): ${project.total_ratio || 'Chưa tính'}
- Hiệu suất tổng (eta): ${project.efficiency || 'Chưa tính'}
- Công suất tính toán (Pct): ${project.Pct || 'Chưa tính'}

Động cơ đã chọn:
- Mã động cơ: ${project.motors?.code || 'Chưa chọn'}
- Công suất định mức: ${project.motors?.P_dm || ''} kW
- Số vòng quay định mức: ${project.motors?.n_dm || ''} vòng/phút

Yêu cầu báo cáo:
1. Có tiêu đề chính: "BÁO CÁO THIẾT KẾ HỆ THỐNG DẪN ĐỘNG THÙNG TRỘN"
2. TUYỆT ĐỐI tin tưởng và sử dụng các giá trị tính toán đã cho (đặc biệt là Pct). Không tự tính toán lại bằng các công thức tự chế và tuyệt đối không nhận xét các giá trị hệ thống cung cấp là sai hay không phù hợp.
3. Động học & Chọn động cơ (dựa vào thông số P, n_ct, u_t, eta, Pct và động cơ đã chọn).
4. Đưa ra một số lời khuyên kỹ thuật.
5. Trình bày rõ ràng, không sinh ra ký tự rác.
`;

    try {
      const response = await fetch(process.env.LM_STUDIO_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "local-model",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.7
        })
      });

      if (!response.ok) {
        throw new Error(`LM Studio trả về lỗi: ${response.statusText}`);
      }

      const data = await response.json();
      const text = data.choices?.[0]?.message?.content || "";
      return { markdown: text };
    } catch (error) {
      throw new BadRequestException("Lỗi khi gọi API LM Studio: " + error.message);
    }
  },

  async exportWord(markdown) {
    const htmlContent = marked(markdown);
    const wrappedHtml = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Report</title></head><body>${htmlContent}</body></html>`;
    const fileBuffer = await HTMLtoDOCX(wrappedHtml, null, {
      table: { row: { cantSplit: true } },
      footer: true,
      pageNumber: true,
    });
    return fileBuffer;
  },

  async exportPdf(markdown) {
    const htmlContent = marked(markdown);
    const wrappedHtml = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Report</title><style>body { font-family: sans-serif; line-height: 1.6; padding: 20px; } table { border-collapse: collapse; width: 100%; margin-bottom: 20px; } th, td { border: 1px solid #ddd; padding: 8px; text-align: left; } th { background-color: #f2f2f2; }</style></head><body>${htmlContent}</body></html>`;
    const options = { format: 'A4', margin: { top: "20px", bottom: "20px", left: "20px", right: "20px" } };
    const file = { content: wrappedHtml };
    return await htmlPdf.generatePdf(file, options);
  }
};
