import React, { useState, useEffect } from 'react';
import { X, MinusCircle, Send } from 'lucide-react';

interface Message {
  type: 'user' | 'assistant';
  content: string;
}

interface OwlAssistantProps {
  onSendMessage?: (message: string) => Promise<string>;
}

const OwlAssistant: React.FC<OwlAssistantProps> = ({ onSendMessage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [conversationContext, setConversationContext] = useState("");

  const motivationalMessages = [
    "Recuerda que cada día es una nueva oportunidad para cuidar de ti y de los demás.",
    "La información es tu mejor aliada. ¡Tú puedes tomar el control!",
    "No estás solo. Juntos podemos hacer la diferencia.",
    "Cuidar de tu salud es un acto de amor propio.",
    "Pequeños pasos pueden llevar a grandes cambios. ¡Sigue adelante!",
    "Tu bienestar es importante. Tómate un momento para ti.",
    "La prevención es la clave. Infórmate y actúa.",
    "Cada acción positiva cuenta. ¡Tú puedes marcar la diferencia!",
  ];

  //Estado para el mensaje actual y si se muestra o no
  const [currentMessage, setCurrentMessage] = useState(motivationalMessages[0]);
  const [isMessageVisible, setIsMessageVisible] = useState(true);


  // Efecto para mostrar el mensaje de motivación cada 30 segundos y mostrarlo durante 10 segundos
  useEffect(() => {
    const messagesInterval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * motivationalMessages.length);
      setCurrentMessage(motivationalMessages[randomIndex]);
      setIsMessageVisible(true);

      //Ocultar el mensaje después de 10 segundos
      setTimeout(() => {
        setIsMessageVisible(false);
      }, 5000);// 10 segundos
    }, 8000);//cambiar el mensaje cada 30 segundos

    return () => clearInterval(messagesInterval);
  }, []);

  // Funcion para cerrar el mensaje manualmente
  const handleCloseMessage = () => {
    setIsMessageVisible(false);
  };


  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const userMessage: Message = {
      type: 'user',
      content: message
    };

    setChatHistory(prev => [...prev, userMessage]);
    setIsTyping(true);
    setMessage('');

    try {
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ message, conversationContext })
      });

      const data = await response.json();

      const assistantMessage: Message = {
        type: 'assistant',
        content: data.response
      };

          setChatHistory(prev => [...prev, assistantMessage]);
          setConversationContext(`${conversationContext}\nUser: ${message}\nAssistant: ${data.response}`);
      
    } catch (error) {
      const errorMessage: Message = {
        type: 'assistant',
        content: "Lo siento, hubo un error al procesar tu mensaje. Por favor, intenta de nuevo."
      };
      setChatHistory(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-40 right-2 z-50 ">
      {/* Botón flotante con imagen del búho */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-40 h-40 rounded-full overflow-hidden hover:opacity-80 transition-opacity duration-300 "
        >
          <img
            src="/Imagen1.png" 
            alt="Doc el búho asistente"
            className="w-full h-full object-cover"
          />
        </button>
      )}

      {/* Mensaje de motivación */}
      {!isOpen && isMessageVisible && (
        <div className='fixed bottom-80 right-20 bg-[#3BACA3]/80 text-white p-4 rounded-lg shadow-lg flex items-center gap-2 animate-fadeIn'>
          {/* Triangulo que apunta al buho */}
          <div className='absolute  -bottom-3 right-4 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-[#3BACA3]'></div>
          <p>{currentMessage}</p>
          <button 
          onClick={handleCloseMessage}
          className='text-white hover:text-[#E2E6FF] p-1'
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Ventana del chat */}
      {isOpen && (
        <div className={`bg-white rounded-lg shadow-xl w-80 ${isMinimized ? 'h-14' : 'h-98'} transition-all duration-300`}>
          {/* Header */}
          <div className="bg-[#3BACA3] p-1 rounded-t-lg flex justify-between items-center">
            <div className="flex items-center gap-1">
              <img
                src="/Imagen1.png" // Asegúrate de reemplazar esto con la ruta correcta a tu imagen
                alt="Doc el búho"
                className="w-14 h-18 rounded-full"
              />
              <span className="text-white font-medium">Doc, el Búho Asistente</span>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-white hover:text-[#E2E6FF] p-1"
              >
                <MinusCircle className="h-5 w-5" />
              </button>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-[#E2E6FF] p-1"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Área de chat */}
              <div className="h-64 overflow-y-auto p-4 bg-[#F5F7FA]">
                {chatHistory.map((msg, index) => (
                  <div
                    key={index}
                    className={`mb-4 ${
                      msg.type === 'user' ? 'text-right' : 'text-left'
                    }`}
                  >
                    <div
                      className={`inline-block p-3 rounded-lg ${
                        msg.type === 'user'
                          ? 'bg-[#4A90B6] text-white'
                          : 'bg-white border border-[#E2E6FF]'
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="text-[#4A90B6] text-sm">Doc está escribiendo...</div>
                )}
              </div>

              {/* Input área */}
              <div className="p-4 border-t border-[#E2E6FF]">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Escribe tu pregunta aquí..."
                    className="flex-1 p-2 rounded-lg border border-[#E2E6FF] focus:outline-none focus:ring-2 focus:ring-[#3BACA3]"
                    aria-label="Mensaje"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="p-2 rounded-lg bg-[#4A90B6] hover:bg-[#3BACA3] transition-colors duration-300 text-white"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default OwlAssistant;