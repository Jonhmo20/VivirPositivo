import React, { useEffect, useState } from "react";
import Blogs from "./Blogs";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BlogFormulario from "./BlogFormulario";


interface BlogPost {
    id: number;
    title: string;
    description?: string;
    author?: string;
    videoUrl?: string;
    image?: string;
    type: "text" | "video";
}

interface BlogPageProps {
  blogs: BlogPost[];
  addBlog: (blog: BlogPost) => void;
}


const BlogPage: React.FC<BlogPageProps> = ({ addBlog }) => {
    const [localBlogs, setLocalBlogs] = useState<BlogPost[]>([]); // Estado de blogs
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
  
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
    }, [addBlog]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
  
    return (
        <div>
        {/* Renderiza la lista de blogs */}
        <Blogs blogs={localBlogs} />
      </div>
    );
  };
  
  export default BlogPage;