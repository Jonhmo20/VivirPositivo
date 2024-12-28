import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"
import ReactQuill from "react-quill";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from '../firebase'; 
import Blogcard from "./BlogCard";
import { blogService } from "./blogService";
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

      // Cargar datos del blog al editar
  useEffect(() => {
    const fetchBlog = async () => {
      if (id) {
        try {
          const response = await fetch(`${API_URL}/blogs/${id}`);
          if (!response.ok) {
            throw new Error("Blog no encontrado");
          }
          const blog = await response.json();
          setTitle(blog.title);
          setDescription(blog.description || "");
          setAuthor(blog.author || "");
          setVideoUrl(blog.videoUrl || "");
          setPostType(blog.type);
          setImageURL(blog.image || "");
        } catch (error) {
          console.error("Error al cargar el blog:", error);
          navigate('/');
        }
      }
    };

    fetchBlog();
  }, [id, navigate]);

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
        <div className="min-h-screen bg-neutral p-4 md:p-6 lg:p-8">
            {/* Contenedor principal con fondo y padding responsivo */}
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Formulario de publicación */}
                    <div className="w-full lg:w-1/2">
                        <div className="bg-white rounded-xl shadow-md transitio-shadow hover:shadow-lg p-6 md:p-8">
                            {/* Encabezado del formulario */}
                            <h1 className="text-3xl font-bold text-prymary mb-8 transition-colors">
                                {id ? "Editar Publicación" : "Crear Publicación"} 
                            </h1>

            <form onSubmit={handlesumit} className="space-y-6">
            {/* Selección del tipo de publicación */}
            <div className="form-group">
                <label className="block text-secondary font-medium mb-2">
                    Tipo de Publicación:
                </label>
                <select 
                    className="w-full p-3 rounded-lg border-2 border-accent focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 bg-white"
                    value={postType} 
                    onChange={(e) => setPostType(e.target.value as "text" | "video")}
                >
                    <option value= "text">Articulo de texto</option>
                    <option value= "video">Contenido en video</option>
                </select>
            </div>

            {/*campo del titulo*/}
            <div className="form-group">
                <label className="block text-secondary font-medium mb-2">
                    Titulo
                </label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-3 rounded-lg border-2 border-accent focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                    required
                />
            </div>

            {/* Campo de imagen para publicacion de texto*/}
            {postType === "text" && (
                < div className="form-group">
                    <label className="block text-secondary font-medium mb-2">
                        Imagen Principal
                    </label>
                    < div className="relativ">
                    <input
                    type="file"
                    accept=".jpg, .png, .gif" //formatos permitidos
                    onChange={handleImageUpload}
                    className="w-full p-3 rounded-lg border-2 border-accent file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-primary file:text-white hover:file:bg-primary-hover transition-all duration-200"
                    />
                </div>
                <p className="text-sm text-gray-500 mt-1">
                    Formatos admitidos: JPG, PNG, GIF
                </p>
                </div>
            )}

            {/*Editor de texto para la publicación de texto*/}
            {postType === "text" || postType === "video" ? (
                <div className="form-group">
                        <label className="block text-secondary font-medium mb-2">
                            Contenido
                        </label>
                        <div className="border-2 border-accent rounded-lg overflow-hidden">
                        <ReactQuill
                        value={description}
                        onChange={setDescription}
                        className="bg-white"
                        modules={{
                            toolbar: [
                                [{ header: [1, 2, false] }],
                                ["bold", "italic", "underline"],
                                ["image", "code-block"],
                                ["clean"],
                            ],
                        }}
                        formats={['bold', 'italic', 'underline', 'header', 'image', 'code-block']}
                        placeholder="Comparte tu conocimiento aquí..."
                    />
                    </div>
                    </div>
            ): null }

            {/*Campos especificos segun el tipo de publicación*/}
            {postType === "text" && (
                <div className="form-group">
                    <label className="block text-secondary font-medium mb-2">
                        Autor
                    </label>
                    <input
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        required
                        className="w-full p-3 rounded-lg border-2 border-accent focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                        placeholder="Nombre del autor"
                        />
                    </div>
                )}

            {/*Campo de URL para la publicación de video */}
            {postType === "video" && (
                <div  className="form-group">
                     <label className="block text-secondary font-medium mb-2">
                        URL del Video
                     </label>
                      <input  
                            type="url"
                            value={videoUrl}
                            onChange={(e) => setVideoUrl(e.target.value)}
                            required
                            className="w-full p-3 rounded-lg border-2 border-accent focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                            placeholder="Enlace de YouTube o TikTok"
                       /> 
                       <p className="text-sm text-gray-500 mt-1">
                        Soporta enlaces de YouTube o TikTok
                       </p>
                </div>
            )}

            <button 
                type="submit"
                className="w-full bg-primary text-white font-medium py-3 px-6 rounded-lg hover:bg-primary-hover focus:ring-4 focus:ring-primary/30 transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
                {id ? "Guardar Cambios" : "Crear Publicación"}
                </button>
            </form>
            </div>
            </div>

            {/*Vista previa de la publicación*/}
            <div className="w-full lg:w-1/2">
                <div className="bg-accent/30 rounded-xl shadow-md p-6 md:p-8 sticky top-8">
                    <h2 className="text-2xl font-bold text-secondary mb-6">
                        Vista Previa
                    </h2>
                    <div className="bg-white rounded-lg shadow-sm p-4"> <Blogcard
                        blogId={id ? parseInt(id) : undefined}
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
            </div>
           </div> 
        </div>
    );
};

export default BlogFormulario;