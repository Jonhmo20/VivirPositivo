import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"
import ReactQuill from "react-quill";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from '../firebase'; 
import Blogcard from "./BlogCard";
import "quill/dist/quill.snow.css";
import '../index.css';

const API_URL = "http://localhost:5000/api"; // URL base del backend


interface BlogPost {
    id: number;
    title: string;
    description?: string;
    author?: string;
    videoUrl?: string;
    image?: string;
    type: "text" | "video";
}

interface BlogFormularioProps {
    addBlog: (newBlog: BlogPost) => void;
}

const BlogFormulario: React.FC<BlogFormularioProps> = ({addBlog}) => {
    const {id} = useParams<{id:string}>();
    const navigate = useNavigate();


    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [author, setAuthor] = useState<string>("");
    const [videoUrl, setVideoUrl] = useState<string>("");
    const [postType, setPostType] = useState<"text" | "video">("text");
    const [image, setImage] = useState<File | null>(null); //cambia a tipo file para manejar la imagen
    const [imageURL, setImageURL] = useState<string>("")

    
    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);

            try {
                //subir la imagen a Firebase Storage
                const imageRef = ref(storage, `images/${file.name}`);
                await uploadBytes(imageRef, file);
                    
                //Se obtine la url de la imagen subida
                const url = await getDownloadURL(imageRef);
                setImageURL(url);//guardar la url en el estado
                console.log('Referencia de la imagen:', imageRef);
            
                console.log('URL de la imagen subida:', url);
                
            } catch (error) {
                console.error("Error al subir la imagen:", error);
            }
        }
    };
    

    const handlesumit = async (e: React.FormEvent) => {
        e.preventDefault();

        let uploadedImageURL = imageURL;

        if (image) {
            //subir imagen a firebase Storage si se selecciono una imagen
            const imageRef = ref(storage, `images/${image.name}`);
            const snapshot = await uploadBytes(imageRef, image);
            uploadedImageURL = await getDownloadURL(snapshot.ref);
            setImageURL(uploadedImageURL); //Guardar la URL en el estado
        }


        const newBlog: BlogPost = {
            id: id ? parseInt(id) : Date.now(),
            title,
            description,
            author: postType === "text" ? author : undefined,
            videoUrl: postType === "video" ? videoUrl : undefined,
            image: postType === "text" ? uploadedImageURL : undefined,//usa la URL subida
            type: postType,
        };

            const response = id
                ? await fetch(`${API_URL}/blogs/${id}`, {
                      method: "PUT",
                      headers: {
                          "Content-Type": "application/json",
                      },
                      body: JSON.stringify(newBlog),
                  })
                : await fetch(`${API_URL}/blogs`, {
                      method: "POST",
                      headers: {
                          "Content-Type": "application/json",
                      },
                      body: JSON.stringify(newBlog),
                  });

            if (response.ok) {
                const createdBlog = await response.json();
                addBlog(createdBlog);
                navigate("/");
            } else {
        console.error("Error al guardar el blog");
    }
};


     // Función para generar el iframe basado en la URL
  const renderVideoEmbed = () => {
    if (videoUrl && (videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be"))) {
      // Detecta y genera el iframe para YouTube
      const youtubeId= videoUrl.includes("youtu.be")
      ? videoUrl.split("/").pop()?.split('?')[0]
      : new URL(videoUrl).searchParams.get("v");
      return (
        <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${youtubeId}`}
            title="YouTube video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
        ></iframe>
    );
    
    } else if (videoUrl.includes("tiktok.com")) {
      // Incrustar video de TikTok usando el bloque oficial
      return (
        <blockquote 
            className="tiktok-embed"
            cite={videoUrl}
            data-video-id={videoUrl}
            style={{ maxWidth: "325px", minWidth: "325px" }}
        >
            <section>Loading...</section>
        </blockquote>
         );
    } 
      return <p>URL no válida. Por favor, ingresa un enlace válido de YouTube o TikTok.</p>;

  };

    // Cargar el script de TikTok cuando el componente cargue
    useEffect(() => {
        if (videoUrl.includes("tiktok.com")) {
            const script = document.createElement("script");
            script.src = "https://www.tiktok.com/embed.js";
            script.async = true;
            document.body.appendChild(script);

            return () => {
                document.body.removeChild(script);
            };
        }
    }, [videoUrl]);

    

    return (
        <div className="container mx-auto my-10">

        <div className="flex flex-wrap lg:flex-nowrap gap-8">

        <div className="w-full lg:w-1/2 bg-white shadow-lg rounded-lg p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">
            {id ? "Editar Publicación" : "Crear Publicación"} 
            </h1>
            <form onSubmit={handlesumit} className="space-y-6">
            {/* Selección del tipo de publicación */}
            <div>
                <label className="block text-gray-600 text-sm font-semibold mb-2">
                    Tipo de Publicación:
                </label>
                <select 
                    className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500"
                    value={postType} 
                    onChange={(e) => setPostType(e.target.value as "text" | "video")}
                >
                    <option value= "text">Texto</option>
                    <option value= "video">Video</option>               
                </select>
            </div>

            {/*campo del titulo*/}
            <div>
                <label className="block text-gray-600 text-sm font-semibold mb-2">Titulo:</label>
                <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                autoComplete="off"
                />
            </div>

            {/* Campo de imagen para publicacion de texto*/}
            {postType === "text" && (
                <>
                <div>
                    <label>Subir Imagen (Formatos admitidos: JPG, PNG, GIF):</label>
                    <input
                    type="file"
                    accept=".jpg, .png, .gif" //formatos permitidos
                    onChange={handleImageUpload}
                    />
                </div>
                </>
            )}

            {/*Campos especificos para la publicacion de texto*/}
            {postType === "text" || postType === "video" ? (
                <>
                    <div>
                        <label>Descripción:</label>
                        <ReactQuill
                        value={description}
                        onChange={setDescription}
                        className="border border-gray-300 rounded-lg"
                        modules={{
                            toolbar: [
                                [{ header: [1, 2, false] }],
                                ["bold", "italic", "underline"],
                                ["image", "code-block"],
                                ["clean"],
                            ],
                        }}
                        formats={['bold', 'italic', 'underline', 'header', 'image', 'code-block']}
                        placeholder="Escribe aquí..."
                    /></div>
                
                {postType === "text" && (
                    <div>
                        <label>Autor:</label>
                        <input
                            type="text"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg"
                        />
                    </div>
                )}
                </>
            ): null }

            {/*Campo de URL para la publicación de video */}
            {postType === "video" && (
                <div>
                     <label>URL del Video:</label>
                      <input  
                            type="url"
                            value={videoUrl}
                            onChange={(e) => setVideoUrl(e.target.value)}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg"
                       /> 
                </div>
            )}

            <button 
            type="submit"
            className="w-full p-3 bg-CIELO-light text-white rounded-lg hover:bg-CIELO-dark">
            {id ? "Guardar Cambios" : "Crear Publicación"}</button>
            </form>
            </div>

            {/*Vista previa de la publicación*/}
            <div className="w-full lg:w-1/2 bg-cerceta-light p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Vista Previa:</h2>
            <Blogcard
                blogId={id ? parseInt(id) : Date.now()}
                title={title}
                description={description}
                image={imageURL}
                videoUrl={videoUrl}
                author={author}
                type={postType}
                
                />
            </div>
           </div> 
        </div>
    );
};

export default BlogFormulario;