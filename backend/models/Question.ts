import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IResponse {
  _id?: mongoose.Types.ObjectId; // Usar el tipo de ID de mongoose
  content: string;
  createdAt: Date;
  isPsychologist: boolean;
  authorName: string;
}


// Definición de la interfaz para typscript
export interface IQuestion extends Document {
  name: string;
  email: string;
  question: string;
  category: string;
  createdAt: Date;
  isAnswered: boolean;
  responses: Types.DocumentArray<IResponse>;
}

// Define el esquema para respuestas
const responseSchema = new Schema<IResponse>({
  content: { type: String },
  createdAt: { type: Date, default: Date.now },
  isPsychologist: { type: Boolean },
  authorName: { type: String },
});

// Definición del esquema de mongoose
const questionSchema = new Schema<IQuestion>({
  name: { type: String, default: 'Anonimo' },
  email: { type: String, required: true },
  question: { type: String, required: true },
  category: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  isAnswered: { type: Boolean, default: false },
  responses: [responseSchema],// Usar el esquema de respuesta aquí
});

//Modelo de mongoose
const Question = mongoose.model<IQuestion>('Question', questionSchema);

export default Question;

