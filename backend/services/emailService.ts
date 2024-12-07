// backend/services/emailService.ts
import nodemailer from 'nodemailer';

// Configuración del transportador de nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail', // O el servicio que uses, como SendGrid, Mailgun, etc.
  auth: {
    user: process.env.EMAIL_USER, // Define tu usuario de correo en variables de entorno
    pass: process.env.EMAIL_PASS, // Define tu contraseña de correo en variables de entorno
  },
});

interface EmailOptions {
  to: string;
  subject: string;
  text: string;
}

export async function sendEmail({ to, subject, text }: EmailOptions) {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    });
    console.log('Correo enviado: ', info.messageId);
    return { success: true };
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    return { success: false, error };
  }
}
