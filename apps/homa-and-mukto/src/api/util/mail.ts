import { createTransport } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

const mailConfigured = process.env.MAIL_USER && process.env.MAIL_PASSWORD;
const transporter = mailConfigured ? createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD
  }
}) : undefined;

export const sendMail = async (mailOptions: Mail.Options) => transporter?.sendMail(mailOptions);
