import React, { useEffect, useState } from "react";
import Blogs from "./Blogs";
import axios from "axios";
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

const BlogPage: React.FC = () => {
    const [blogs, setBlogs] = useState<BlogPost[]>([]); // Estado de blogs
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const fetchBlogs = async () => {
        try {
          const response = await axios.get("http://localhost:5000/api/blogs");
          setBlogs(response.data);
        } catch (err) {
          setError("Error en la solicitud");
        } finally {
          setLoading(false);
        }
      };
  
      fetchBlogs();
    }, []);
  
    const agregarBlog = (nuevoBlog: BlogPost) => {
        setBlogs((prevBlogs) => [nuevoBlog, ...prevBlogs]); // Agrega el nuevo blog al inicio de la lista
    };
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
  
    return (
        <div>
        {/* Renderiza la lista de blogs */}
        <Blogs blogs={blogs} />
      </div>
    );
  };
  
  export default BlogPage;