import nodemailer from 'nodemailer';

export const mailService = {
  async sendVerificationEmail(email, name, token) {
    // 1. Kiểm tra nếu có API Key của Brevo để gửi qua HTTP API (Tránh bị chặn cổng SMTP trên Railway)
    if (process.env.BREVO_API_KEY) {
      try {
        const response = await fetch("https://api.brevo.com/v3/smtp/email", {
          method: "POST",
          headers: {
            "api-key": process.env.BREVO_API_KEY,
            "content-type": "application/json",
            "accept": "application/json"
          },
          body: JSON.stringify({
            sender: {
              name: "Thiết kế dẫn động Bách Khoa - HCM",
              email: process.env.BREVO_SENDER_EMAIL
            },
            to: [{ email, name }],
            subject: 'Mã xác thực tài khoản của bạn',
            htmlContent: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
                <h2 style="color: #030391; text-align: center;">Chào ${name},</h2>
                <p style="color: #334155; font-size: 16px;">Cảm ơn bạn đã đăng ký tài khoản. Đây là mã xác thực (OTP) của bạn, vui lòng nhập mã này trên trang web:</p>
                <div style="text-align: center; margin: 30px 0;">
                  <span style="background-color: #f1f5f9; color: #1488D8; padding: 16px 32px; border-radius: 8px; font-weight: 800; font-size: 32px; letter-spacing: 4px; border: 2px dashed #94a3b8;">${token}</span>
                </div>
                <p style="color: #ef4444; font-size: 14px; text-align: center; font-weight: 500;">Lưu ý: Mã OTP này chỉ có hiệu lực trong vòng 5 phút.</p>
                <p style="color: #64748b; font-size: 14px; text-align: center; margin-top: 20px;">Nếu bạn không đăng ký tài khoản này, vui lòng bỏ qua email này.</p>
              </div>
            `
          })
        });

        const payload = await response.json();
        if (response.ok) {
          return true;
        } else {
          console.error('Lỗi từ Brevo HTTP API:', payload);
          throw new Error(payload.message || 'Lỗi gửi email qua HTTP API');
        }
      } catch (error) {
        console.error('Lỗi gửi email qua HTTP API:', error);
        throw new Error('Không thể gửi email xác thực.');
      }
    }

    // 2. Fallback gửi qua SMTP (dành cho chạy local hoặc khi không có BREVO_API_KEY)
    const transporter = nodemailer.createTransport({
      host: 'smtp-relay.brevo.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.BREVO_SMTP_USER, 
        pass: process.env.BREVO_SMTP_PASS,
      },
      connectionTimeout: 8000, // 8 giây timeout để tránh bị treo vô hạn
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
      console.error('Lỗi gửi email SMTP:', error);
      throw new Error('Không thể gửi email xác thực.');
    }
  },

  async sendChangePasswordOtpEmail(email, name, token) {
    // 1. Kiểm tra nếu có API Key của Brevo để gửi qua HTTP API
    if (process.env.BREVO_API_KEY) {
      try {
        const response = await fetch("https://api.brevo.com/v3/smtp/email", {
          method: "POST",
          headers: {
            "api-key": process.env.BREVO_API_KEY,
            "content-type": "application/json",
            "accept": "application/json"
          },
          body: JSON.stringify({
            sender: {
              name: "Thiết kế dẫn động Bách Khoa - HCM",
              email: process.env.BREVO_SENDER_EMAIL
            },
            to: [{ email, name }],
            subject: 'Cảnh báo: Yêu cầu đổi mật khẩu tài khoản',
            htmlContent: `
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
            `
          })
        });

        const payload = await response.json();
        if (response.ok) {
          return true;
        } else {
          console.error('Lỗi từ Brevo HTTP API (Đổi pass):', payload);
          throw new Error(payload.message || 'Lỗi gửi email đổi pass qua HTTP API');
        }
      } catch (error) {
        console.error('Lỗi gửi email đổi pass qua HTTP API:', error);
        throw new Error('Không thể gửi email cảnh báo đổi mật khẩu.');
      }
    }

    // 2. Fallback SMTP
    const transporter = nodemailer.createTransport({
      host: 'smtp-relay.brevo.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.BREVO_SMTP_USER, 
        pass: process.env.BREVO_SMTP_PASS,
      },
      connectionTimeout: 8000,
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
      console.error('Lỗi gửi email SMTP (Đổi pass):', error);
      throw new Error('Không thể gửi email cảnh báo đổi mật khẩu.');
    }
  }
};
