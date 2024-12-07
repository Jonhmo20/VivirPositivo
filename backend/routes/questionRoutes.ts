import express from 'express';
import { 
  saveQuestion, 
  respondToQuestion, 
  getQuestions,
  editQuestion,
  deleteQuestion,
  editResponse,
  deleteResponse
} from '../controllers/questionController';

const router = express.Router();

//Ruta para manejar las preguntas
router.post('/', saveQuestion);

// Ruta para manejar las respuestas a las preguntas 
router.post('/:id/responses', respondToQuestion);

//Nueva ruta para obtener todas las preguntas
router.get('/', async (req, res) => {
  try {
    const questions = await getQuestions();
    res.status(200).json(questions);
  } catch (error) {
    console.error('Error al obtener las preguntas:', error); // Agrega un log para depuración
    res.status(500).json({ message: 'Error al obtener las preguntas' });
  }
});

//Ruta para editar una pregunta
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;

    try {    
      const updatedQuestion = await editQuestion(id, content);
      res.status(200).json(updatedQuestion);
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la pregunta' });
  }
});

//Ruta para eliminar una pregunta
router.delete('/:id', async (req, res) => {
 const { id } = req.params;
 
     try {
       await deleteQuestion(id);
       res.status(200).json({ messsage: 'Pregunta eliminada correctamente'});
        } catch (error) {
          res.status(500).json({ message: 'Error al eliminar la pregunta' });  
  }
});

//Ruta para editar una respuesta
router.put('/:id/responses/:responseId', async (req, res) => {
  const { id, responseId } = req.params;
  const { content } = req.body;
  
  try {    
    const updatedResponse = await editResponse(id, responseId, content);
    res.status(200).json(updatedResponse);
  } catch (error) {    
    res.status(500).json({ error: 'Error al eliminar la pregunta' });
  }
});

//Ruta para eliminar una respuesta
router.delete('/:id/responses/:responseId', async (req, res) => {
  const { id, responseId } = req.params;
  
  try {    
    await deleteResponse(id, responseId);
    res.status(200).json({ message: 'Respuesta eliminada correctamente'});
  } catch (error) {
    console.error('Error al eliminar la respuesta:', error);
    res.status(500).json({ message: 'Error al eliminar la respuesta' });  
  }
});

export default router;