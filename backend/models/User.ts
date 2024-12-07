import mongoose, { Document, Schema } from 'mongoose'; 
import bcrypt from 'bcrypt';

// Definición de la interfaz para el documento de usuario 
interface IUser extends Document { 
    username: string; 
    password: string; 
    role: 'admin' | 'user'; // Agregamos el campo 'role' con valores predefinidos
    isModified: (path: string) => boolean;
}

// Definición del esquema de usuario
const userSchema: Schema = new Schema({
    username: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    role: {
        type: String,
        enum: ['admin', 'user'], //solo permite valores 'admi' y 'user'
        default: 'user', //valor para usuarios comunes
    }
});

//Middleware para hashear la contrasena antes de guardarla
userSchema.pre<IUser>('save', async function (next: Function) { 
    if (!this.isModified('password')) return next(); 
    this.password = await bcrypt.hash(this.password, 10); 
    next();
});

// Creación del modelo de usuario
const User = mongoose.model<IUser>('User', userSchema);
export default User;