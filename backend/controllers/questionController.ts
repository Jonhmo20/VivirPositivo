import { Request, Response } from 'express';
import Question, { IQuestion } from '../models/Question';
import mongoose, { Types } from 'mongoose';
import { sendEmail } from '../services/emailService';

export const saveQuestion = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, question, category } = req.body;

    //validacion 
    if (!name || !email || !question || !category) {
      res.status(400).json({ error: 'Todos los campos son obligatorios' });
      return;
    }

    const newQuestion = new Question({ name, email, question, category, createdAt: new Date(), isAnswered: false });
    const savedQuestion = await newQuestion.save();

    // Enviar correo electrónico
    await sendEmail(
      process.env.ADMIN_EMAIL!,
      `Nueva pregunta enviada por ${name}`,
     `Una nueva pregunta ha sido registrada.\n\nUsuario: ${name}\nEmail: ${email}\nCategoría: ${category}\nPregunta: ${question}`
      );

    res.status(201).json(savedQuestion);
  } catch (error) {
    console.error('Error al guardar la pregunta:', error);
    res.status(500).json({ error: 'Error al guardar la pregunta' });
  }
};

export const getQuestions = async (): Promise<any[]> => {
  try {
    return await Question.find().sort({ createdAt: -1 });  
  } catch (error) {
  console.error('Error al obtener las preguntas:', error);
  throw new Error('Error al obtener las preguntas');
}
};

export const respondToQuestion = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { content, isPsychologist, authorName } = req.body;

    const question = await Question.findById(id);
    if (!question) {
      res.status(404).json({ error: 'Pregunta no encontrada' });
      return;
    }

    const newResponse = {
      content,
      createdAt: new Date(),
      isPsychologist,
      authorName
    };

    //Agrega la respuesta al array de respuestas
    question.responses.push(newResponse);

    //Marca la pregunta como respondida
    question.isAnswered = true;

    await question.save();

    // Enviar correo electrónico al autor
    await sendEmail(
      question.email,//Dirección del autor
      'Tu pregunta ha sido respondida',
       `Tu pregunta "${question.question}" ha recibido una respuesta\n\nRespuesta: ${content}`
        );
    
    //Envia la pregunta actualizada 
    res.status(200).json({ message: 'Respuesta registrada correctamente' });
  } catch (error) {
    console.error('Error al responder la pregunta:', error);
    res.status(500).json({ error: 'Error al responder la pregunta' });
  }
};

// Editar una pregunta
export const editQuestion = async (id: string, content: string): Promise<IQuestion | null> => {
  try {
    const question = await Question.findById(id);
    if (!question) {
      throw new Error('Pregunta no encontrada');
    }

    //Actualiza el contenido de la pregunta
    question.question = content;

    //Guarda la pregunta modificada
    const updatedQuestion = await question.save();

    return updatedQuestion; //Retorna la pregunta actualizada
  } catch (error ) {
    console.error('Error al editar la pregunta:', error);
    throw error;
  }
};

// Eliminar una pregunta
export const deleteQuestion = async (id: string): Promise<void> => {
  const deletedQuestion = await Question.findByIdAndDelete(id);
  if (!deletedQuestion) {
    throw new Error('Pregunta no encontrada');
  }
};

    // Editar una respuesta
    export const editResponse = async (id: string, responseId: string, content: string): Promise<any> => {
      const question = await Question.findById(id);
      if (!question) throw new Error('Pregunta no encontrada');

      //Convierte el responseId a un objectId y encuentra la respuesta
      const objectId = new Types.ObjectId(responseId);
      const response = question.responses.id(objectId);
    
      if (!response) throw new Error('Respuesta no encontrada');
    
      response.content = content;// Actualiza el contenido de la respuesta
      await question.save();// Guarda los cambios en la base de datos

     
      return { ...response.toObject(), _id: response._id?.toString() };//Devuelve la respuesta actualizada
    };

// Eliminar una respuesta
export const deleteResponse = async (id: string, responseId: string): Promise<void> => {
  const question = await Question.findById(id);
  if (!question) throw new Error('Pregunta no encontrada');

  const responseIndex = question.responses.findIndex(
    (response) => response._id?.toString() === responseId
  );
  if (responseIndex === -1) throw new Error('Respuesta no encontrada');

  question.responses.splice(responseIndex, 1);
  await question.save();
};
