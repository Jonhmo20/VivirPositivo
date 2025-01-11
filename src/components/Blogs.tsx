import React from "react";
import Blogcard from "./BlogCard";

interface BlogPost {
  _id: string;
  title: string;
  description?: string;
  author?: string;
  videoUrl?: string;
  image?: string;
  type: "text" | "video";
}

interface BlogProps {
  blogs: BlogPost[];
  onDelete: (blogId: string) => void;
  onEdit: (blogId: string) => void;
}

const Blogs: React.FC<BlogProps> = ({ blogs, onDelete, onEdit }) => {

    return (
        <div className="w-full min-h-screen p-10 bg-cerceta-light">
          <div className="px-4 py-12 bg-gradient-to-b from-teal-10 to-teal-50/30">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-8 tracking-tight"> 
              Vivir Positivo Blog
            </h1>

            <p className="max-w-3xl mx-auto text-center text-lg md:text-xl leading-relaxed text-gray-700/90">
              Bienvenidos a nuestro espacio de aprendizaje y apoyo mutuo. Aquí compartimos 
              conocimientos, experiencias y recursos sobre salud sexual, creando un entorno 
              donde la educación y la comprensión rompen estigmas. Juntos, construimos una 
              comunidad más informada, empática y saludable. Tu bienestar es nuestra prioridad.
            </p>
          </div>
        </div>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
            {blogs.map((blog) => (
              <Blogcard
                key={blog._id}
                _id={blog._id}
                title={blog.title}
                description={blog.description || ""}
                author={blog.author || ""}
                videoUrl={blog.videoUrl || ""}
                image={blog.image || ""}
                type={blog.type}
                onDelete={onDelete}
                onEdit={onEdit}
                />
            ))}
           </div>
        </div>
   );
};

export default Blogs;