import nodemailer from 'nodemailer';

export const mailService = {
  async sendVerificationEmail(email, name, token) {
    const transporter = nodemailer.createTransport({
      host: 'smtp-relay.brevo.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.BREVO_SMTP_USER, 
        pass: process.env.BREVO_SMTP_PASS,
      },
    });

    const mailOptions = {
      from: `"Thiết kế dẫn động Bách Khoa - HCM" <${process.env.BREVO_SENDER_EMAIL}>`,
      to: email,
      subject: 'Mã xác thực tài khoản của bạn',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
          <h2 style="color: #030391; text-align: center;">Chào ${name},</h2>
          <p style="color: #334155; font-size: 16px;">Cảm ơn bạn đã đăng ký tài khoản. Đây là mã xác thực (OTP) của bạn, vui lòng nhập mã này trên trang web:</p>
          <div style="text-align: center; margin: 30px 0;">
            <span style="background-color: #f1f5f9; color: #1488D8; padding: 16px 32px; border-radius: 8px; font-weight: 800; font-size: 32px; letter-spacing: 4px; border: 2px dashed #94a3b8;">${token}</span>
          </div>
          <p style="color: #ef4444; font-size: 14px; text-align: center; font-weight: 500;">Lưu ý: Mã OTP này chỉ có hiệu lực trong vòng 5 phút.</p>
          <p style="color: #64748b; font-size: 14px; text-align: center; margin-top: 20px;">Nếu bạn không đăng ký tài khoản này, vui lòng bỏ qua email này.</p>
        </div>
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
      return true;
    } catch (error) {
      console.error('Lỗi gửi email:', error);
      throw new Error('Không thể gửi email xác thực.');
    }
  },

  async sendChangePasswordOtpEmail(email, name, token) {
    const transporter = nodemailer.createTransport({
      host: 'smtp-relay.brevo.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.BREVO_SMTP_USER, 
        pass: process.env.BREVO_SMTP_PASS,
      },
    });

    const mailOptions = {
      from: `"Thiết kế dẫn động Bách Khoa - HCM" <${process.env.BREVO_SENDER_EMAIL}>`,
      to: email,
      subject: 'Cảnh báo: Yêu cầu đổi mật khẩu tài khoản',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ef4444; border-radius: 8px; border-top: 6px solid #ef4444;">
          <h2 style="color: #b91c1c; text-align: center;">Cảnh báo bảo mật</h2>
          <p style="color: #334155; font-size: 16px;">Chào ${name},</p>
          <p style="color: #334155; font-size: 16px;">Hệ thống vừa nhận được yêu cầu đổi mật khẩu cho tài khoản của bạn. Để hoàn tất việc đổi mật khẩu, vui lòng nhập mã OTP dưới đây:</p>
          <div style="text-align: center; margin: 30px 0;">
            <span style="background-color: #fef2f2; color: #b91c1c; padding: 16px 32px; border-radius: 8px; font-weight: 800; font-size: 32px; letter-spacing: 4px; border: 2px dashed #fca5a5;">${token}</span>
          </div>
          <p style="color: #ef4444; font-size: 14px; text-align: center; font-weight: 500;">Lưu ý: Mã OTP này chỉ có hiệu lực trong vòng 5 phút.</p>
          <p style="color: #64748b; font-size: 14px; text-align: center; margin-top: 20px;"><strong>Nếu bạn KHÔNG yêu cầu đổi mật khẩu:</strong> Tài khoản của bạn có thể đang gặp rủi ro. Vui lòng phớt lờ email này và ngay lập tức đổi mật khẩu của bạn.</p>
        </div>
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
      return true;
    } catch (error) {
      console.error('Lỗi gửi email cảnh báo đổi pass:', error);
      throw new Error('Không thể gửi email cảnh báo đổi mật khẩu.');
    }
  }
};
