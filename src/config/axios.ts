{/*// src/config/axios.ts
import { useEffect, useState } from 'react';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

export { api };

// src/components/QASection.tsx
import api from '../config/axios'; // Importa la instancia configurada de axios

const QASection: React.FC = () => {
  // ... otros estados y configuraciones

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setIsLoading(true);
        // Usa la instancia de api en lugar de axios directamente
        const response = await api.get('/questions');
        setQuestions(response.data);
      } catch (error) {
        console.error('Error fetching questions:', error);
        setError('Error al cargar las preguntas');
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const handleSubmitQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Usa la instancia de api para las peticiones
      const response = await api.post('/questions', {
        name: newQuestion.name || 'Anónimo',
        email: newQuestion.email,
        question: newQuestion.question,
        category: newQuestion.category,
      });

      if (response.status === 201) {
        setQuestions([response.data, ...questions]);
        setNewQuestion({ name: '', email: '', question: '', category: '' });
        alert('Pregunta enviada y guardada correctamente.');
      }
    } catch (error) {
      console.error('Error submitting question:', error);
      alert('Error al enviar la pregunta');
    }
  };

  const handleSubmitResponse = async (questionId: string) => {
    if (!newResponse.trim()) return;
    
    try {
      // Usa la instancia de api para las respuestas
      const response = await api.post(`/questions/${questionId}/responses`, {
        content: newResponse,
        isPsychologist: isAdmin,
        authorName: isAdmin ? 'Vivir Positivo' : 'Anónimo'
      });

      if (response.status === 200) {
        const updatedQuestions = questions.map(q => 
          q.id === questionId ? response.data : q
        );
        setQuestions(updatedQuestions);
        setNewResponse('');
        alert('Respuesta enviada y guardada correctamente.');
      }
    } catch (error) {
      console.error('Error submitting response:', error);
      alert('Error al enviar la respuesta');
    }
  };

  // ... resto del componente
};

export default QASection;*/}