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
}

// Esquema de Blog basado en los campos de BlogFormulario
const blogSchema: Schema = new Schema({
    title: { // Campo para el título
        type: String,
        required: true,
    },
    description: {
        type:String,
        required: true,
    },
    author: { // Campo para el autor
        type: String,
        required: function(this: IBlog) { return this.type === "text"; } // Solo requerido si el tipo es texto
    },
    videoUrl: { // Campo para la URL del video
        type: String,
        required: function(this: IBlog) { return this.type === "video"; } // Solo requerido si el tipo es video
    },
    image: { // Campo para la imagen
        type: String,
        required: function(this: IBlog) { return this.type === "text"; } // Solo requerido si el tipo es texto
    },
    type: { // Campo para el tipo de publicación
        type: String,
        enum: ["text", "video"],
        required: true,
    },
    createdAt: { // Campo para la fecha de creación
        type: Date,
        default: Date.now,
    },
});

// Exporta el modelo
const Blog = mongoose.model<IBlog>('Blog', blogSchema);
export { Blog };