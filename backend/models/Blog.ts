import { updateBlog } from './../controllers/BlogController';
import mongoose, { Document, Schema } from 'mongoose'

// Definición de la interfaz para el documento de Blog 
interface IBlog extends Document { 
    title: string; 
    description: string; 
    author?: string; 
    videoUrl?: string; 
    image?: string; 
    type: string; 
    createdAt?: Date; 
    updatedAt?: Date;
}

// Esquema de Blog basado en los campos de BlogFormulario
const blogSchema: Schema = new Schema({
    title: { // Campo para el título
        type: String,
        required: true,
        trim: true,
        minlength: [3, 'El título debe tener al menos 3 caracteres'],
        maxlength: [100, 'El título no puede tener más de 100 caracteres']
    },
    description: {
        type:String,
        required: true,
        trim: true,
        minlength: [10, 'La descripción debe tener al menos 10 caracteres'],
    },
    author: { // Campo para el autor
        type: String,
        required: function(this: IBlog) { return this.type === "text"; }, // Solo requerido si el tipo es texto
        trim: true,
    },
    videoUrl: { // Campo para la URL del video
        type: String,
        required: function(this: IBlog) { return this.type === "video"; }, // Solo requerido si el tipo es video
        validate: {
            validator: function(v: string) {
                //validacion basica de URL
                return /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/.test(v);
                },
                message: ' URL de video no válido'
                }
        },
    image: { // Campo para la imagen
        type: String,
        required: function(this: IBlog) { return this.type === "text"; } // Solo requerido si el tipo es texto
    },
    type: { // Campo para el tipo de publicación
        type: String,
        enum: {
            values: ["text", "video"],
            message: '{VALUE} no es un tipo valido'
        },
        required: true,
    },
    createdAt: { // Campo para la fecha de creación
        type: Date,
        default: Date.now,
        inmutable: true
    },
    updatedAt: { // Campo para la fecha de actualización
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true // Esto maneja las fechas de creación y actualización
});

// Exporta el modelo
const Blog = mongoose.model<IBlog>('Blog', blogSchema);
export { Blog, IBlog };