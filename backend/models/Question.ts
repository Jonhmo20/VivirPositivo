import mongoose, { Document, Schema } from 'mongoose';

export interface IResponse {
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
  responses: IResponse[];
}

// Definición del esquema de mongoose
const questionSchema = new Schema<IQuestion>({
  name: { type: String, default: 'Anonimo' },
  email: { type: String, required: true },
  question: { type: String, required: true },
  category: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  isAnswered: { type: Boolean, default: false },
  responses: [
    { 
      content: {type: String }, 
      createdAt: { type: Date, default: Date.now }, 
      isPsychologist: {type: Boolean }, 
      authorName: { type: String },
    },
  ],
});

//Modelo de mongoose
const Question = mongoose.model<IQuestion>('Question', questionSchema);

export default Question;

