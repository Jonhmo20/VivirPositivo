import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext'; //importa el contexto de autenticacion
import { Loader2, Send, Edit2, Trash2, MessageCircle, CheckCircle, XCircle  } from 'lucide-react';

// Interfaces
interface Question {
  _id: { $oid: string } | string;
  id?: string;
  name: string;
  email: string;
  question: string;
  createdAt: Date;
  responses: Response[];
  isAnswered: boolean;
}

interface Response {
  _id?: string;
  content: string;
  createdAt: Date;
  isPsychologist: boolean;
  authorName: string;
}



const QASection: React.FC = () => {
  //Estados existentes
  const [questions, setQuestions] = useState<Question[]>([]);
  const [newQuestion, setNewQuestion] = useState({ 
    name: '', 
    email: '', 
    question: '', 
    category: ''
  });
  const [responseInputs, setResponseInputs] = useState<{ [key: string]: string }>({});
  const [editingQuestionId, setEditingQuestionId] = useState<string | null>(null);
  const [editingResponseId, setEditingResponseId] = useState<string | null>(null);// ID de la respuesta en edición
  const [updatedQuestion, setUpdatedQuestion] = useState("");
  const [updatedResponseContent, setUpdatedResponseContent] = useState<string>(""); // Contenido actualizado de la respuesta

  //Estados para UX mejorada
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  //const [isLoading, setIsLoading] = useState(false);

  //simulacion de autenticacion
  const { isAuthenticated } = useAuth(); //obtener el estado de autenticacion

   // Función para obtener ID consistente
   const getQuestionId = (question: Question)=> 
    typeof question._id === 'object' ? question._id.$oid : question._id;
    

  
 
  // Cargar preguntas desde el servidor 
  useEffect(()=> {
    const fetchQuestions = async () => { 
      //setIsLoading(true);
      try { 
        const response = await axios.get('http://localhost:5000/api/questions'); 
        const processedQuestions = response.data.map((q: Question) => ({
          ...q,
          id: getQuestionId(q),
        }));
        setQuestions(processedQuestions); 
      } catch (error) { 
        console.error('Error al cargar las preguntas:', error); 
        setSubmitError('Error al cargar las preguntas');
        
      }
    }; 

    
      fetchQuestions(); 
    }, []);


  const handleSubmitQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitSuccess(false);
    
    // Validación del correo electrónico
    if (!newQuestion.email.trim() || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(newQuestion.email)) {
      setSubmitError('Ingrese un correo válido');
      setIsSubmitting(false);
      return; // Detiene la ejecución si el correo es inválido
  }

    try {
      const response = await axios.post(`http://localhost:5000/api/questions`, {
        name: newQuestion.name || 'Anonimo',
        email: newQuestion.email,
        question: newQuestion.question,
        category: newQuestion.category,
      }, {

        validateStatus: function (status) {
          return status >= 200 && status < 300; 
      }
      });
      
      if (response.status === 201) {
        const newQuestionWithId = {
          ...response.data,// La pregunta creada devuelta por el servidor
          id: typeof response.data._id === 'object' 
          ? response.data._id.$oid 
          : response.data._id,//resetea los campos de texto
        };

        // Agrega la nueva pregunta y limpia el formulario
        setQuestions([newQuestionWithId, ...questions]);// Agrega la pregunta al final de la lista
        setNewQuestion({ 
          name: '', 
          email: '', 
          question: '', 
          category: '' 
        });
      

      // Marca el estado de éxito
      //setIsSubmitting(false);
      setSubmitSuccess(true);
      setSubmitError('');

      // Limpia los estados de éxito y error después de 3 segundos
      setTimeout(() => {
        setSubmitSuccess(false);
        setSubmitError('');
      }, 3000);
      } else {
        alert(`Error al guardar la pregunta: ${response.data.message || 'Unknown error'}`);
      }

    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error:', {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status,
        });
        
        setSubmitError(`Error en la conexión con el servidor: ${error.response?.data?.message || error.message}`);
      } else {
        console.error('Unexpected Error:', error);
        setSubmitError(`Error inesperado al guardar la pregunta`);
      } 
    } finally {
      setIsSubmitting(false);
    }
}; 
        

  const handleResponseChange = (questionId: string, value: string) => {
      setResponseInputs((prev) => ({
        ...prev, 
        [questionId]: value,// Actualiza solo el campo relacionado con questionId
        }));
    };

  const handleSubmitResponse = async (questionId: string) => {
    const newResponse = responseInputs[questionId] || '';
    if (!newResponse.trim()) return; //evita respuesta vacias
    
    try { 
      const response = await axios.post(
        `http://localhost:5000/api/questions/${questionId}/responses`, 
        { 
        content: newResponse, 
        isPsychologist: true, 
        authorName: 'Admin',
      }
    ); 
      
      if (response.status === 200) { 
        console.log('Respuesta recibida correctamente:', response.data);

        //Actualiza loaclmente el estado de las preguntas
        setQuestions((prevQuestions) => 
          prevQuestions.map((q) =>  
            q.id === questionId 
              ? { 
                ...q, 
                isAnswered: true, //Marca la pregunta como respondida
                responses: [
                  ...(q.responses || []), //Asegura que responses no sea undefined
                  {
                    content: newResponse,
                    isPsychologist: true,
                    authorName: 'Admin',
                    createdAt: new Date(),//Opcional:  Ajusta la fecha de creación
                  },
                ],
              } 
              : q
          )
         );

         //Limpia el campo de texto respuesta despues de enviar
        setResponseInputs((prev) => ({
          ...prev,
        [questionId]: '', //Limpia el campo de texto despues de enviar
        }));

        alert('Respuesta enviada y guardada correctamente.'); 
      } else { 
        alert('Error al guardar la respuesta'); 
      } 
    } catch (error) { 
      alert('Error en la conexión con el servidor'); 
      console.error(error);
    }
  };

  // Nuevas funciones de edición y eliminación
  const handleEditQuestion = async (questionId: string, updatedQuestion: string) => {
    if (!questionId || !updatedQuestion) return;
    try {
      const response = await axios.put(`http://localhost:5000/api/questions/${questionId}`, {
        question: updatedQuestion
      });

      if (response.status === 200) {
        const updatedQuestions = questions.map(q => 
          q.id === questionId ? {...q, question: updatedQuestion} : q
        );
        setQuestions(updatedQuestions);
        setEditingQuestionId(null);
        alert('Pregunta actualizada correctamente');
      }
    } catch (error) {
      console.error('Error al actualizar pregunta:', error);
      alert('No se pudo actualizar la pregunta');
    }
  };

  const handleDeleteQuestion = async (questionId: string) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/questions/${questionId}`);

      if (response.status === 200) {
        const updatedQuestions = questions.filter(q =>  q.id !== questionId);
        setQuestions(updatedQuestions);
        alert('Pregunta eliminada correctamente');
      }
    } catch (error) {
      console.error('Error al eliminar pregunta:', error);
      alert('No se pudo eliminar la pregunta');
    }
  };

  const handleEditResponse = async (questionId: string, responseId: string, updatedContent: string) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/questions/${questionId}/responses/${responseId}`, 
        {content: updatedContent}
      );

      if (response.status === 200) {
        const updatedQuestions = questions.map((q) => {
          if (q.id === questionId) {
            const updatedResponses = q.responses.map((r) => 
              r._id === responseId ? {...r, content: updatedContent} : r
            );
            return {...q, responses: updatedResponses};
          }
          return q;
        });
        
        setQuestions(updatedQuestions);
        setEditingResponseId(null);
        setUpdatedResponseContent(""); // Limpia el campo de texto despues de guardar
        alert('Respuesta actualizada correctamente');
      }
    } catch (error) {
      console.error('Error al actualizar respuesta:', error);
      alert('No se pudo actualizar la respuesta');
    }
  };

  const handleDeleteResponse = async (questionId: string, responseId: string) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/questions/${questionId}/responses/${responseId}`);

      if (response.status === 200) {
        const updatedQuestions = questions.map(q => {
          if (q.id === questionId) {
            const updatedResponses = q.responses.filter(r => r. _id !== responseId);
            return {...q, responses: updatedResponses};
          }
          return q;
        });
        
        setQuestions(updatedQuestions);
        alert('Respuesta eliminada correctamente');
      }
    } catch (error) {
      console.error('Error al eliminar respuesta:', error);
      alert('No se pudo eliminar la respuesta');
    }
  };

  

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-8">
      {/*{isLoading && (
        <div className="flex items-center justify-center h-screen">
          <Loader2 className="w-20 h-20 animate-spin" />
        </div>
      )}*/}
      {/* Formulario de Preguntas */}

     
      <div className="bg-gradient-to-br from-[#7FC8A9]/10 to-[#4A90B6]/10 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl border border-[#3BACA3]/20">
        <div className="p-8">
          <h2 className="text-3xl font-bold text-[#3BACA3] mb-6 flex items-center gap-3">
            <MessageCircle className="w-8 h-8 " />
            ¿Tienes alguna pregunta?
          </h2>

          <form onSubmit={handleSubmitQuestion} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Nombre (opcional)
                </label>
              <input
                type="text"
                placeholder="Tu nombre (opcional)"
                value={newQuestion.name}
                onChange={(e) => setNewQuestion({...newQuestion, name: e.target.value})}
                className="w-full px-4 py-3 rounded-lg bg-white border border-[#4A90B6]/30 focus:outline-none focus:ring-2 focus:ring-[#3BACA3] focus:border-transparent transition-all"
                aria-label='Tu nombre'
              />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Correo electrónico
                </label>
              <input
                type="email"
                placeholder="tu@email.com"
                value={newQuestion.email}
                onChange={(e) => setNewQuestion({...newQuestion, email: e.target.value})}
                className="w-full px-4 py-3 rounded-lg bg-white border border-[#4A90B6]/30 focus:outline-none focus:ring-2 focus:ring-[#3BACA3] focus:border-transparent transition-all"
                required
                aria-label='Tu correo electrónico'
              />
            </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Categoría
                </label>
            <select
            id="category"
            className="w-full px-4 py-3 rounded-lg bg-white border border-[#4A90B6]/30 focus:outline-none focus:ring-2 focus:ring-[#3BACA3] focus:border-transparent transition-all text-[#3BACA3] font-semibold"
          value={newQuestion.category}
          onChange={(e) => setNewQuestion({...newQuestion, category: e.target.value})}
          required
          aria-label='Selecciona una categoría'
          
        >
          <option  value="">Selecciona una categoría</option>
          <option value="salud">Salud</option>
          <option value="psicología">Psicología</option>
        </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="question" className="block text-sm font-medium text-gray-700">
                Tu Pregunta
              </label>
            <textarea
              placeholder="Escribe tu pregunta aquí..."
              value={newQuestion.question}
              onChange={(e) => 
                setNewQuestion({...newQuestion, question: e.target.value})
              }
              className="w-full px-4 py-3 rounded-lg bg-white border border-[#4A90B6]/30 focus:outline-none focus:ring-2 focus:ring-[#3BACA3] focus:border-transparent transition-all min-h-[120px]"
              required
              aria-label='Escribe tu pregunta aquí'
            />
            </div>

            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full md:w-auto px-6 py-3 rounded-lg bg-[#3BACA3] hover:bg-[#4A90B6] text-white font-semibold transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
              aria-label={isSubmitting ? 'Enviando pregunta...' : 'Enviar pregunta'}
            >
              
              {isSubmitting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <div className="flex items-center gap-2">
                  <span>Enviar Pregunta</span>
                  <Send className="w-5 h-5" />
                </div>
              )}
            </button>

          {submitSuccess && (
            <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-lg">
              <CheckCircle className="w-5 h-5" />
              Pregunta enviada con éxito
              </div>
          )}

          {submitError && (
            <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg">
              <XCircle className="w-5 h-5" />
              {submitError}
            </div>
          )}

          </form>
          </div>
          </div>
    

      {/* Lista de Preguntas */}
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-[#3BACA3] border-b-2 border-[#7FC8A9] pb-2">
          Preguntas Recientes
        </h3>
        
       {/* Verificación de tipo antes de usar map */}
        {questions.length > 0 ? (
          <div className="space-y-6">
          {questions.map((q) => (
          <div 
          key={q.id}
          className="bg-gradient-to-br from-[#7FC8A9]/10 to-[#4A90B6]/10 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-[#4A90B6] overflow-hidden"
          >

            
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-semibold text-[#285D66] text-lg">{q.name || 'Anonimo'}
                  </h4>
                  
                </div>
                <span 
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  q.isAnswered 
                    ? 'bg-[#B7DBC8] text-[#285D66]' 
                    : 'bg-[#E1DF66] text-[#285D66]'
                }`}
                >
                  {q.isAnswered ? 'Respondida' : 'Pendiente'}
                </span>
              </div>
              
              
              {/* Logica de Texto o Formulario de Edicion */}
              {editingQuestionId === q.id ? (
                <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleEditQuestion(q.id!, updatedQuestion);
                }}
                >
                  <input
                  type='text'
                  value={updatedQuestion }
                  onChange={(e) => setUpdatedQuestion(e.target.value)}
                  className='border px-2 py-1 rounded-md w-full'
                  />
                  <button
                  type='submit'
                  className='mt-2 px-4 py-2 rounded-md bg-green-500 text-white hover:bg-green-600 transition-colors'
                  >
                    Guardar
                  </button>
                  <button
                      type="button"
                      className="mt-2 ml-2 px-4 py-2 rounded-md bg-gray-500 text-white hover:bg-gray-600 transition-colors"
                      onClick={() => setEditingQuestionId(null)} // Cancelar edición
                    >
                      Cancelar
                    </button>
                  </form>
              ) : (
                <p className="text-gray-800 mb-6">{q.question}</p>
                )}

               {/* Botones para Editar y Eliminar Pregunta */}
      {isAuthenticated && (
        <div className="flex gap-4 mt-4">
          <button
            className="px-4 py-2 rounded-md bg-[#285D66] text-white hover:bg-[#6DA095] transition-colors flex items-center gap-2"
            onClick={() => {
              setEditingQuestionId(q.id ?? null); //Activa modo de edicion
              setUpdatedQuestion(q.question); //Prellena el texto actual
            }}
          >
            <Edit2 className="w-4 h-4" />
            Editar Pregunta
          </button>
          <button
            className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition-colors flex items-center gap-2"
            onClick={() => {
              const confirmDelet = window.confirm("¿Estas seguro que deseas eliminar esta pregunta?");
              if (confirmDelet) {
              handleDeleteQuestion(q.id!);
            }
          }}
          >
            <Trash2 className="w-4 h-4" />
            Eliminar Pregunta
          </button>
          </div>
      

      )}

              {/* Respuestas */}
              {q.responses.length > 0 && (
        <div className="mt-6">
          <h5 className="font-semibold text-[#285D66]">Respuestas:</h5>
          <ul className="space-y-4 mt-4">
            {q.responses.map((r) => (
              <li
                key={r. _id}
                className="bg-gradient-to-br from-[#7FC8A9]/5 to-[#4A90B6]/5 p-4 rounded-lg shadow-md border-l-4 border-[#B7DBC8]"
              >
                {/* Logica de edicion o visualizacion */}
                {editingResponseId === r._id ? (
                  <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const confirmEdit = window.confirm(
                      "Estas seguro de que deseas guardar los cambios?"
                    );
                    if (confirmEdit) {
                      handleEditResponse(q.id!, r._id!, updatedResponseContent);
                    }
                  }}
                  >
                    <input
                    type='text'
                    value={updatedResponseContent}
                    onChange={(e) => setUpdatedResponseContent(e.target.value)}
                    className='border px-2 py-1 rounded-md w-full'
                    />
                    <button
                    type='submit'
                    className='mt-2 px-4 py-2 rounded-md bg-green-500 text-white hover:bg-green-600 transition-colors'
                    >
                      Guardar 
                    </button>
                    <button
                      type="button"
                      className="mt-2 ml-2 px-4 py-2 rounded-md bg-gray-500 text-white hover:bg-gray-600 transition-colors"
                      onClick={() => setEditingResponseId(null)} // Cancelar edición
                    >
                      Cancelar
                    </button>
                    </form>
                ) : (
                  <div className='flex justify-between items-center'>
                    <p className="text-sm-20 text-gray-800">{r.content}</p>

                    {/* Botones para editar y eliminar */}
                {isAuthenticated && (
                  <div className="flex gap-2">
                    <button
                      className="px-3 py-2 text-sm rounded-md bg-[#285D66] text-white hover:bg-[#6DA095] transition-colors"
                      onClick={() => {
                        setEditingResponseId(r._id!)
                        setUpdatedResponseContent(r.content);
                      }}
                    >
                      <Edit2 className="w-4 h-4" />
                      Editar
                    </button>
                    <button
                      className="px-3 py-2 text-sm rounded-md bg-red-500 text-white hover:bg-red-600 transition-colors"
                      onClick={() => {
                        const confirmDelet = window.confirm(
                          "Estas seguro de que deseas eliminar esta respuesta?"
                        );
                        if (confirmDelet) {
                        handleDeleteResponse(q.id!, r._id!);
                      }
                    }}
                    >
                      <Trash2 className="w-4 h-4" />
                      Eliminar
                    </button>
                  </div>
                )}
                </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

              {/* Input de Respuesta solo si es admin*/}
              {isAuthenticated && (
                < div className="mt-6 flex gap-2">
                  <textarea
                    placeholder="Escribe una respuesta..."
                    value={responseInputs[typeof q._id === 'object' ? q._id.$oid : q._id]  || ''}// Usa el ID de la pregunta para acceder a su respuesta
                    onChange={(e) => handleResponseChange(
                      typeof q._id === 'object' ? q._id.$oid : q._id,
                      e.target.value
                    )}// Actualiza solo esta pregunta
                    className="flex-1 px-4 py-2 rounded-lg border-2 border-[#6DA095] focus:outline-none focus:border-[#285D66] transition-colors"
                  />
                  <button
                    onClick={() => handleSubmitResponse(typeof q._id === 'object' ? q._id.$oid : q._id)}
                    className="px-4 py-2 rounded-lg bg-[#285D66] hover:bg-[#6DA095] text-white font-medium transition-colors duration-200"
                  >
                    Responder
                  </button>
            </div>
          )}
          </div>
          </div>
          ))}
          </div>
      ) :(

          <p className="text-center py-8 text-gray-500">
            No hay preguntas aún. ¡Sé el primero en preguntar!
          </p>
        )}
      </div>
      </div>
  );
};

export default QASection;