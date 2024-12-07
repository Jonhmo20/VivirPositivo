import express from 'express';
import { sendEmail } from '../services/emailService';

const router = express.Router();

router.post('/send-email', async (req, res) => {
  const { to, subject, text } = req.body;

  const result = await sendEmail({ to, subject, text });
  if (result.success) {
    res.status(200).send('Correo enviado exitosamente');
  } else {
    res.status(500).send('Error al enviar el correo');
  }
});

export default router;