import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  name: { type: String, default: 'Anonimo' },
  email: { type: String, required: true },
  question: { type: String, required: true },
  category: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  isAnswered: { type: Boolean, default: false },
  responses: [{ 
    content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  isPsychologist: { type: Boolean, required: true },
  authorName: { type: String, required: true }
  }]
});

const Question = mongoose.model('Question', questionSchema);

export default Question;

