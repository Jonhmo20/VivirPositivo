import mongoose from 'mongoose';
import User from '../models/User';  // Asegúrate de que la ruta sea correcta

const initAdmin = async () => {
    try {
        // Conexión a la base de datos
        await mongoose.connect('mongodb://localhost:5000/tuBaseDeDatos', {
        });

        // Verifica si ya existe un usuario admin
        const adminExists = await User.findOne({ role: 'admin' });

        if (adminExists) {
            console.log('El usuario admin ya existe');
            return;
        }

        // Crear un usuario admin
        const admin = new User({
            username: 'admin',  // Cambia esto según tu preferencia
            password: 'adminpassword',  // Cambia esto a una contraseña más segura
            role: 'admin',
        });

        // Guarda el usuario en la base de datos
        await admin.save();
        console.log('Usuario admin creado con éxito');
        
        // Cierra la conexión con la base de datos
        mongoose.connection.close();
    } catch (err) {
        console.error('Error al crear el admin:', err);
        mongoose.connection.close();
    }
};

// Llama a la función para crear el admin
initAdmin();
