// backend/services/emailService.ts
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVICE,
  port: Number(process.env.EMAIL_PORT),
  secure: false,// cambia a true si usas puerto 465
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export const sendEmail = async (to: string, subject: string, text: string, html?: string) => {
  try {
    const mailOptions = {
      from: process.env.ADMIN_EMAIL,//direccion del correo remitente
      to,//destinatario
      subject,//asunto del correo
      text,//texto del correo
      html//html del correo opcional
    };
      
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email enviado con éxito: ${info.messageId}`);
    } catch (error) {
      console.error('Error al enviar el correo:', error);
    throw new Error('Error al enviar el correo');
    }
    };