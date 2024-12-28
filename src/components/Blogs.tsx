import React from "react";
import Blogcard from "./BlogCard";

interface BlogPost {
    id: number;
    title: string;
    description?: string;
    author?: string;
    videoUrl?: string;
    image?: string;
    type: "text" | "video";
  }

  interface BlogProps {
    blogs: BlogPost[];
  }

const Blogs: React.FC<BlogProps> = ({ blogs }) => {

    return (
        <div className="w-full min-h-screen p-10 bg-cerceta-light">
           <h1 className="text-3xl font-bold mb-6"> Blogs </h1>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
            {blogs.map((blog: BlogPost) => (
                <Blogcard
                key={blog.id}
                blogId={blog.id}
                title={blog.title}
                description={blog.description || "Sin descripcion"}
                author={blog.author}
                videoUrl={blog.videoUrl}
                image={blog.image}           
                type={blog.type}
                />
            ))}
           </div>
        </div>
   );
};

export default Blogs;