import Question from '../models/Question'; // El modelo de la base de datos

export const createQuestion = async (name: string, email: string, question: string, category: string) => {
  try {
    const newQuestion = new Question({
      name,
      email,
      question,
      category,
      createdAt: new Date(),
      isAnswered: false,
      responses: []
    });
    await newQuestion.save();
    return { success: true, question: newQuestion };
  } catch (error) {
    console.error('Error creando la pregunta:', error);
    return { success: false, error };
  }
};
