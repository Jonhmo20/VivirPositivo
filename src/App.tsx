import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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

  return (
    <>
      <Header 
        isAdmin={user?.rol === 'admin'} 
        onNavigate={(route) => {
          // Navegación usando window.location
          switch(route) {
            case 'home':
              window.location.href = '/';
              break;
            case 'blogs':
              window.location.href = '/';
              break;
            case 'preguntas':
              window.location.href = '/QAsection';
              break;
            case 'admin-blogs':
              window.location.href = '/create-blog';
              break;
            default:
              window.location.href = '/';
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
      </Routes>
    </>
  );
}

export default App;