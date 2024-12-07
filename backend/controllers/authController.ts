import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';


// Inicio de sesión
export const login = async (req:Request, res:Response): Promise<void> => {
  const { username, password } = req.body;

  try {
    //Busca usuario en la base de datos 
    const user = await User.findOne({ username });
    if (!user) {
      res.status(401).json({ error: 'Usuario no encontrado' });
      return;
    }

    //Verifica la contrasena
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ error: 'Contraseña incorrecta' });
      return;
    }

    //Genera Token
    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
       process.env.JWT_SECRET!, // Define una variable JWT_SECRET en el archivo .env
        { expiresIn: '1h' } // Expira en una hora
      );

      // Responder con el token
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error en el inicio de sesión' });
  }
};