import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import BlogFormulario from './components/BlogFormulario';
import LoginForm from './components/LoginForm';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider, useAuth } from './components/AuthContext';
import BlogPage from './components/BlogPage';
import QASection from './components/QaSection';
import Header from './components/Header';

interface Blog {
  id: number;
  title: string;
  description?: string;
  image?: string;
  videoUrl?: string;
  author?: string;
  type: "text" | "video";
}

function App() {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  const agregarBlog = (nuevoBlog: Blog) => {
    setBlogs((prevBlogs) => [nuevoBlog, ...prevBlogs]);
  };

  return (
    <Router>
      <AuthProvider>
        <AppContent blogs={blogs} agregarBlog={agregarBlog} />
      </AuthProvider>
    </Router>
  );
}

// Componente para manejar el contenido con navegación
function AppContent({ 
  blogs, 
  agregarBlog 
}: { 
  blogs: Blog[], 
  agregarBlog: (blog: Blog) => void 
}) {
  const { user } = useAuth();
  const navigate = useNavigate();// Usa useNavigate para la navegación

  return (
    <>
      <Header 
        isAdmin={user?.rol === 'admin'} 
        onNavigate={(route) => {
          // Navegación usando useNavigate
          switch(route) {
            case 'home':
              navigate('/');//ruta de inicio
              break;
            case 'preguntas':
              navigate('/QAsection');//ruta de preguntas y respuestas
              break;
            case 'admin-blogs':
             navigate('/create-blog');//ruta de crear blog
              break;
            default:
              navigate('/');//ruta por defecto
          }
        }} 
      />
      
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/" element={<BlogPage blogs={blogs} addBlog={agregarBlog} />} />
        <Route path='/QAsection' element={<QASection />} />
        <Route path="/create-blog" element={
          <PrivateRoute>
            <BlogFormulario addBlog={agregarBlog} />
          </PrivateRoute>   
        }/>   
        <Route path='*' element={<h1>404 - Página no encontrada</h1>} />
      </Routes>
    </>
  );
}

export default App;