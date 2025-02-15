import React, { useState } from "react";
import { FaEdit, FaShareAlt } from "react-icons/fa";
import { FaThumbsUp, FaThumbsDown, FaTrash, FaFacebookF, FaXTwitter, FaInstagram } from "react-icons/fa6";
import { useAuth } from "./AuthContext";

interface BlogCardProps {
    _id: string;
    title: string;
    description: string;
    image?: string;
    videoUrl?: string;
    author?: string;
    type: "text" | "video";
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
}

const Blogcard: React.FC<BlogCardProps> = ({ 
    _id,
    title, 
    description, 
    image, 
    videoUrl, 
    author, 
    type, 
    onEdit,
    onDelete
}) => {
    const [isHovered, setIsHovered] = useState(false);
   const [showMore, setShowMore] = useState(false);
   const [shareMenuOpen, setShareMenuOpen] = useState(false);
   const [likes, setLikes] = useState(0);
   const [dislikes, setDislikes] = useState(0);
   const [userAction, setUserAction] = useState<"like" | "dislike" | null>(null);

   const { isAuthenticated } = useAuth();

   //funcion para compartir en twitter
   const handleShareTwitter = () => {
    const blogUrl = `${window.location.origin}/blog/${_id}`;
    const shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(blogUrl)}`;
    window.open(shareUrl, "_blank", "width=600,height=400");
    setShareMenuOpen(false);
   };

   //funcion para compartir en facebook
   const handleShareFacebook = () => {
    const blogUrl = `${window.location.origin}/blog/${_id}`;
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(blogUrl)}`;
    window.open(shareUrl, "_blank", "width=600,height=400");
    setShareMenuOpen(false);
   };

   //funcion para compartir en instagram
   const handleShareInstagram = () => {
    const blogUrl = `${window.location.origin}/blog/${_id}`;
    const shareUrl = `https://www.instagram.com/share/url?u=${encodeURIComponent(blogUrl)}`;
    window.open(shareUrl, "_blank", "width=600,height=400");
    setShareMenuOpen(false);
   };

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
  
   const handleEdit = () => onEdit(_id);  
  

   const handleDelete =  () => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este blog?")) {
        onDelete(_id);
    }
   };

      
    //Funcion para rebderizar el video si corresponde a la publicacion
    const renderVideoEmbed = () => {
        if (videoUrl && (videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be"))) {
            const youtubeId = videoUrl.includes("youtu.be")
            ? videoUrl.split("/").pop()
            : new URL(videoUrl).searchParams.get("v");

            return (
                <div className="w-full h-[300px]">
                <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${youtubeId}`}
                title="YouTube video Player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                ></iframe> 
                </div>   
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

        <div 
        className={`relative goup w-full ${ showMore ? "h-auto" : "h-[500px]" } transition-all duration-300`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        >

        
        {/* Tarjetas traseras */}
        <div className= "relative w-full h-full">
        <div
        className={`absolute top-0 left-0 w-[100%] h-[100%] bg-support/50  rounded-2xl shadow-lg  transition-all duration-300 ease-in-out transform-gpu ${
          isHovered ? "-rotate-6 -translate-y-6 " : "rotate-0 translate-y-0 "
        }`}
        style={{ zIndex: 1}}
      ></div>
      <div
        className={`absolute top-0 left-0 w-[100%] h-[100%] bg-secondary/40 rounded-2xl shadow-lg  transition-all duration-300 ease-in-out transform-gpu ${
          isHovered ? "rotate-6 -translate-y-3" : "rotate-0 translate-y-0"
        }`}
        style={{ zIndex: 0}}
      ></div>
      
        
        {/* Tarjeta principal */}
      <div className={`relative z-10 w-full h-full bg-white/50 rounded-2xl shadow-xl p-6 transition-all duration-300 ease-in-out hover:scale-[1.02] ${ showMore ? "h-auto" : "h-[500px]"         
      }`}>
        <div className="flex flex-col h-full">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-semibold text-primary hover:text-primary-hover">{title}</h2>
        {isAuthenticated && (
            <div className="absolute top-2 right-2 space-x-2">
                <button 
                    onClick={handleEdit}
                    className="text-gray-500 hover:text-gray-700"
                    aria-label="Editar blog"
                    >
                    <FaEdit size={20} />
                </button>
                <button 
                onClick={handleDelete}
                className="text-red-500 hover:text-red-700"
                aria-label="Eliminar blog"
                >
                    <FaTrash size={20} />
                </button>
                </div>
        )}
        </div>
    

        {/*imagen o video*/}
        <div className="relative w-full mb-4 flex-shrink-0 flex justify-center overflow-hidden">
        {type === "text" && image && (
            <div className="relative overflow-hidden rounded-lg">
                        <img 
                            src={image}    
                            alt="Blog preview"
                            className="w-full h-48 rounded-lg  object-contain transition-transform duration-300 hover:scale-110 hover:translate-y-[-10px] hover:shadow-xl"
                            style={{ zIndex: 10 }}
                        />
                        </div>
        )}
                 {type === "video" && (
                <div className="relative w-full h-48 overflow-hidden rounded-lg">
                    <div
                    className="transition-transform duration-300 hover:scale-110 hover:translate-y-[-10px] hover:shadow-xl"
                     style={{ zIndex: 10 }}
      >
                    {renderVideoEmbed()}
                </div>
                </div>
            )}   
            </div>                    

            {/*Descripcion */}
            <div 
            className="flex-1 overflow-y-auto pr-2 scrollbar-thin  scrollbar-thumb-gray-300 scrollbar-track-transparent">
        <div className="text-left">
         {description && (
            <div 
                className="text-gray-700 mb-4 " 
                style={{whiteSpace: 'pre-wrap'}}
                dangerouslySetInnerHTML={{ 
                    __html: showMore ? description : `${description.slice(0, 150)} ...` }}
            />
            )}    

         {/*ver mas*/}
         {description.length > 150 && (
            <button
                className="text-blue-500 hover:text-blue-700 font-semibold mb-4"
                onClick={() => setShowMore(!showMore)}
            >
                {showMore ? "Ver menos" : "Ver mas"}
            </button>
         )}
        </div>
        </div>


         <div className="mt-auto pt-4 border-t flex-shrink-0">
            <div className="flex justify-between items-center">
                {/*autor*/}
         {author && (
            <p className="text-gray-600 font-medium">
                <strong>Autor:</strong> {author}
            </p>
            )}

            {/*botones de like y dislike*/}
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
                        
            <div className="relative">
            <button 
            className="text-gray-500 hover:text-green-500" 
            onClick={() =>setShareMenuOpen(!shareMenuOpen)}
            >
                <FaShareAlt size={20} />
            </button>
            {shareMenuOpen &&(
                <div className="absolute right-0 bottom-full mb-2 bg-white border rounded-lg shadow-lg p-2 min-w-[150px]">
                    <button 
                    className="flex items-center w-full text-left p-2 hover:bg-gray-100 rounded-md text-blue-500 hover:text-blue-700"
                    onClick={handleShareFacebook}
                    >
                        <FaFacebookF className="mr-2"/>Facebook
                        </button>
                        <button 
                            className="flex items-center w-full text-left p-2 hover:bg-gray-100 rounded-md text-pink-600"
                            onClick={handleShareInstagram}
                        >
                            <FaInstagram className="mr-2" /> Instagram
                        </button>
                        <button 
                            className="flex items-center w-full text-left p-2 hover:bg-black/10 rounded-md text-black"
                            onClick={handleShareTwitter}
                        >
                            <FaXTwitter className="mr-2" /> X
                        </button>
                </div>
            )}
         </div>
         </div>
         </div>
         </div>
         </div>
         </div>
         </div>
         </div>

    );
};

export default Blogcard;