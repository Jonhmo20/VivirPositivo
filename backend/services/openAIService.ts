import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Store in .env file
});

export const callOpenAIAPI = async (prompt: string): Promise<string> => {
  try {
    const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    max_tokens: 1024,
    messages: [{ 
      role: 'user', 
      content: prompt 
    }]
  });

  //verifica si hay contenido y es de tipo string
  if (response.choices && response.choices.length > 0 && response.choices[0].message?.content) {
    return response.choices[0].message.content;
  }

  throw new Error('No se pudo obtener respuesta del modelo de OpenAI');
} catch (error) {
  console.error('Error al llamar a OpenAI API:', error);
  throw error;
}
};