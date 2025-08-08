import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const sendMail = async (email, subject, message) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  await transporter.sendMail({
    from: `"Reset Password" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: subject,
    html: message  
  });
};

export default sendMail;
