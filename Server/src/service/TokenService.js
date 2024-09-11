const nodemailer = require('nodemailer');
require('dotenv').config();

class TokenService {
    // send code
    async sendEmailCode(email, code) {
        try {
            console.log(code);
            const transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                secure: false, // Use `true` for port 465, `false` for all other ports
                auth: {
                    user: process.env.USER_EMAIL,
                    pass: process.env.PASS_EMAIL,
                },
            });

            // send mail with defined transport object
            const info = await transporter.sendMail({
                from: '"Mã Xác Thực LearnEnglish" <LearnEnglish@gmail.com>', // Địa chỉ người gửi
                to: email, // Danh sách người nhận
                subject: 'Mã Xác Thực Của Bạn Từ LearnEnglish', // Tiêu đề
                text: 'authentication code', // Nội dung dạng text
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border-radius: 10px; border: 1px solid #ddd;">
                        <div style="text-align: center; padding: 10px; background-color: #ffccd5; border-radius: 10px 10px 0 0;">
                            <h1 style="color: #ff5a6e; margin: 0;">Mã Xác Thực</h1>
                        </div>
                        <div style="padding: 20px; text-align: center;">
                            <p style="font-size: 16px; color: #333;">Chào mừng bạn đến với <strong>LearnEnglish</strong>!</p>
                            <p style="font-size: 16px; color: #333;">Để hoàn tất đăng ký, hãy nhập mã xác thực dưới đây:</p>
                            <div style="padding: 15px; background-color: #fff5f8; border-radius: 5px; display: inline-block;">
                                <h3 style="color: #ff5a6e; font-size: 24px; margin: 0;">${code}</h3>
                            </div>
                            <p style="font-size: 14px; color: #999; margin-top: 20px;">Mã xác thực này sẽ hết hạn sau 2 phút.</p>
                        </div>
                        <div style="padding: 15px; text-align: center; background-color: #ffccd5; border-radius: 0 0 10px 10px;">
                            <p style="font-size: 14px; color: #fff; margin: 0;">&copy; 2024 LearnEnglish. All Rights Reserved.</p>
                            <p style="font-size: 14px; color: #fff; margin: 0;">Website: "</p>
                        </div>
                    </div>
                `,
            });

            return info;
        } catch (e) {
            res.status(500).json({ message: e.message });
        }
    }
}
module.exports = new TokenService();
