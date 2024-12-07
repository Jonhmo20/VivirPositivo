import React, { useState } from "react";
import { FaThumbsUp, FaThumbsDown, FaEdit, FaTrash, FaShareAlt } from "react-icons/fa";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

interface BlogCardProps {
    title: string;
    description: string;
    image?: string;
    videoUrl?: string;
    author?: string;
    type: "text" | "video";
    blogId?: number;
}

const Blogcard: React.FC<BlogCardProps> = ({ title, description, image, videoUrl, author, type, blogId }) => {
   const [showMore, setShowMore] = useState(false);
   const [shareMenuOpen, setShareMenuOpen] = useState(false);
   const [likes, setLikes] = useState(0);
   const [dislikes, setDislikes] = useState(0);
   const [userAction, setUserAction] = useState<"like" | "dislike" | null>(null);

   const { isAuthenticated } = useAuth();
   const navigate = useNavigate();

   const handleLike = () => {
    if (userAction === "like") {
        setLikes(likes - 1);
        setUserAction(null);
    } else {
        setLikes(likes + 1);
        if (userAction === "dislike") {
            setDislikes(dislikes - 1);
        }
        setUserAction("like");
    }
   };

   const handleDislike = () =>  {
    if (userAction === "dislike") {
        setDislikes(dislikes - 1);
        setUserAction(null);
    } else {
        setDislikes(dislikes + 1);
        if (userAction === "like") {
            setLikes(likes - 1);
        }
        setUserAction("dislike");
    }
   };

   const handleEdit = () => {
    navigate(`/create-blog?blogId=${blogId}`);
   };

   const handleDelete = () => {
    console.log("Eliminar blog con ID:", blogId);
   };

      
    //Funcion para rebderizar el video si corresponde a la publicacion
    const renderVideoEmbed = () => {
        if (videoUrl && (videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be"))) {
            const youtubeId = videoUrl.includes("youtu.be")
            ? videoUrl.split("/").pop()
            : new URL(videoUrl).searchParams.get("v");

            return (
                <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${youtubeId}`}
                title="YouTube video Player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                ></iframe>    
            );
        } else if (videoUrl && videoUrl.includes("tiktok.com")) {
            return (
                <blockquote
                className="tiktok-embed"
                cite={videoUrl}
                data-video-id={videoUrl}
                style={{maxWidth: "325px", minWidth: "325px"}}
                >
                    <section>Loading...</section>
                </blockquote>
            );
        }
        return null;
        
    };

    return (
        <div className="bg-white shadow-lg rounded-lg p-6 mb-4 relative transition transform hover:scale-105 hover:shadow-xl" >
        <div className="flex justify-between items-start">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
            {title}
        </h2>
        {isAuthenticated && (
            <div className="absolute top-2 right-2 space-x-2">
                <button 
                    onClick={handleEdit}
                    className="text-gray-500 hover:text-gray-700">
                    <FaEdit size={20} />
                </button>
                <button className="text-red-500 hover:text-red-700">
                    <FaTrash size={20} />
                </button>
                </div>
        )}
        </div>

        {/*imagen o video*/}
        <div className="w-full mb-4 flex justify-center">
        {type === "text" && image && (
                        <img 
                            src={image}    
                            alt="Blog preview"
                            className="w-auto h-auto max-h-64 rounded-lg"
                            style={{objectFit: "contain", maxWidth: "100%"}}
                        />
        )}
                 {type === "video" && (
                <div className="w-full">
                    {renderVideoEmbed()}
                </div>
            )}   
            </div>                    

        <div className="text-left">
         {description && (
            <div 
                className="text-gray-700 mb-4 " 
                style={{whiteSpace: 'pre-wrap'}}
                dangerouslySetInnerHTML={{ __html: showMore ? description : `${description.slice(0, 150)} ...` }}
            />
            )}    

         {/*ver mas*/}
         {description.length > 150 && (
            <button
                className="text-blue-500 hover:text-blue-700 font-semibold"
                onClick={() => setShowMore(!showMore)}
            >
                {showMore ? "Ver menos" : "Ver mas"}
            </button>
         )}
        </div>



         {author && (
            <div className="flex justify-between items-center mt-4">
            <p className="text-gray-600 font-medium">
                <strong>Autor:</strong> {author}
            </p>
            <div className="flex items-center space-x-4">
                
                <button 
                className={'flex items-center text-gray-500 hover:text-blue-500 ${userAction === "like" ? "text-blue-500" : ""}'}
                onClick={handleLike}
                >
                    <FaThumbsUp size={20} className="mr-1" />
                    {likes}
                    </button> 
                    
                    <button
                    className={'flex items-center text-gray-500 hover:text-red-500 ${userAction === "dislike" ? "text-red-500" : ""}'}
                    onClick={handleDislike}
                    >
                        <FaThumbsDown size={20} className="mr-1" />
                        {dislikes}
                        </button>
                        </div>
                        </div>
         )}

         <div className="flex justify-end mt-4">
            <button className="text-gray-500 hover:text-green-500" onClick={() =>setShareMenuOpen(!shareMenuOpen)}>
                <FaShareAlt size={20} />
            </button>
            {shareMenuOpen &&(
                <div className="absolute right-4 mt-2 bg-white border rounded shadow-lg p-2">
                    <button className="block w-full text-left p-1 hover:bg-gray-100">Facebook</button>
                    <button className="block w-full text-left p-1 hover:bg-gray-100">Twitter</button>
                    <button className="block w-full text-left p-1 hover:bg-gray-100">LinkedIn</button>
                </div>
            )}
         </div>
         </div>
    );
};

export default Blogcard;