import { callOpenAIAPI } from './../services/openAIService';
import { Request, Response } from 'express';

export const handleMessage = async (req: Request, res: Response) => {
  try {
    console.log('1. Recibiendo mensaje:', req.body);
    
    const { message, conversationContext } = req.body;
    console.log('2. Mensaje extraído:', message);
    
    const prompt = `${conversationContext}\nUser: ${message}`;
    console.log('3. Prompt preparado:', prompt);
    
    const aiResponse = await callOpenAIAPI(prompt);
    console.log('4. Respuesta de OpenAI:', aiResponse);
    
    res.json({ response: aiResponse });
    console.log('5. Respuesta enviada al cliente');
  } catch (error) {
    console.error('Error completo:', error);
    res.status(500).json({ error: 'Error al procesar el mensaje.'});
  }
};