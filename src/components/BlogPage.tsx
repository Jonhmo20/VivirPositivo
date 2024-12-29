import React, { useEffect, useState } from "react";
import Blogs from "./Blogs";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BlogFormulario from "./BlogFormulario";


interface BlogPost {
    _id: string;
    title: string;
    description?: string;
    author?: string;
    videoUrl?: string;
    image?: string;
    type: "text" | "video";
}


const BlogPage: React.FC = () => {
    const [localBlogs, setLocalBlogs] = useState<BlogPost[]>([]); // Estado de blogs
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();


    // Eliminar un blog
    const handleDeleteBlog = async (blogId: string) => {
      try {
        await axios.delete(`http://localhost:5000/api/blogs/${blogId}`);
        setLocalBlogs((prev) => 
          prev.filter((blog) => blog._id !== blogId)
      );
      } catch (err) {
        console.error("Error al eliminar el blog:", err);
        setError("Error al eliminar el blog");
        setTimeout(() => setError(null), 5000);
      }
    };
    

    // Editar un blog
    const handleEditBlog = (blogId: string) => {
      if (!blogId) {
        console.error("No se ha proporcionado el id del blog a editar");
        return;
      }
      navigate(`/edit-blog/${blogId}`);
    };
    
  
// Cargar los blogs desde el servidor
    useEffect(() => {
      const fetchBlogs = async () => {
        try {
          const response = await axios.get("http://localhost:5000/api/blogs");
          console.log("Blogs cargados:", response.data); 
          setLocalBlogs(response.data);
        } catch (err) {
          console.error("Error al cargar los blogs:", err);
          setError("Error en la solicitud");
        } finally {
          setLoading(false);
        }
      };
  
      fetchBlogs();
    }, []);

    if (loading) return <div className="spinner">Cargando...</div>;
    if (error) return <div className="error">Error: {error}. Por favor, inténtelo de nuevo.</div>;
  
    return (
        <div>
        {/* Renderiza la lista de blogs */}
        <Blogs 
        {...{blogs: localBlogs,
          onDelete: handleDeleteBlog,
          onEdit: handleEditBlog}}
        />
               
      </div>
    );
  };
  
  export default BlogPage;