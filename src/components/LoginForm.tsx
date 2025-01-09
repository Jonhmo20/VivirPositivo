import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/ReactToastify.css';
import { Lock, User, Eye, EyeOff } from "lucide-react";

interface LoginFormProps {
    username: string;
    password: string;
}

const LoginForm: React.FC = () => {
    const [formData, setFormData] = useState<LoginFormProps>({
        username: '',
        password: ''
    });

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isFormFocused, setIsFormFocused] = useState(false);
    const [errors, setErrors] = useState<{username: string; password: string }>({
        username: '',
        password: ''
    });

    const navigate = useNavigate();
        const { login } = useAuth();

    useEffect(() => {
        setFormData({ username: '', password: ''});
    }, []);
    
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        //Limpia los errores al escribir
        if (errors[name as keyof typeof errors]) {
            setErrors(prev => ({ 
                ...prev, 
                [name]: '' 
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        let valid = true;
        let newErrors = { username: '', password: ''};

        if (!formData.username) {
            newErrors.username = 'El nombre de usuario es obligatorio';
            valid = false;
        }
        if (!formData.password) {
            newErrors.password = 'La contraseña es obligatoria';
            valid = false;
        }

        setErrors(newErrors);

        if(valid) {
            try {
                const response = await fetch('http://localhost:5000/api/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                const data = await response.json();

                if (response.ok) {
                    //Guardar el token en localStorage
                    localStorage.setItem("authToken", data.token);

                    //llama a login() para actualizar el estado de autenticacion
                    login();

                    //Muestra mensaje de inicio de sesion exitoso
                    toast.success('Inicio de sesion exitoso como administrador', {
                        position: "top-right",
                        autoClose: 1500
                    });

                    //Navega a la pagina de destino despues de un corto retraso
                    setTimeout(() => {
                        navigate('/create-blog');
                    },1500);
                } else {
                    toast.error(data.message || 'Nombre de usuario o contraseña incorrectos');                    
            }          
        }   catch (error) {
            toast.error('Error de conexion al servidor');
            console.error('Error de inicio de sesion:', error);
        }
      }
    };
            
            

    return (
        <div 
        className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-support to-accent p-4 "

        //Fondo con gradiente mas suave y profesional
        
    >
        <ToastContainer />
        
        <div 
            className={`
                w-full max-w-md 
                bg-white 
                rounded-2xl 
                shadow-xl 
                overflow-hidden 
                transform 
                transition-all 
                duration-500 
                ${isFormFocused ? 'scale-[1.02] shadow-2xl' : 'scale-100'}
                backdrop-blur-sm
                relative
            `}
        >
            {/* Elemento decorativo superior */}
            <div className="absolute top-0 left-0 right-0 h-2  bg-primary rounded-t-2xl" ></div>
            {/* Formulario de inicio de sesion */}
            <form 
                onSubmit={handleSubmit}
                className="p-8 space-y-6"
                autoComplete="off"
                onFocus={() => setIsFormFocused(true)}
                onBlur={() => setIsFormFocused(false)}
            >
                {/* Encabezado del formulario */}
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-primary tracking-wide ">
                        Iniciar Sesión
                    </h2>
                    <p className="text-secondary mt-2">
                        Accede a tu cuenta de administrador
                    </p>
                </div>

                {/* Campos del formulario */}
                <div className="space-y-4">
                    {/* Campo de usuario */}
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User className="h-5 w-5 text-primary" />
                        </div>
                        <input 
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            placeholder="Nombre de usuario"
                            aria-label="Nombre de usuario"
                            className={`
                                w-full 
                                pl-10 
                                pr-4 
                                py-3 
                                rounded-lg 
                                border
                                bg-neutral/50
                                text-secondary 
                                placeholder-secondary/50
                                focus:outline-none 
                                focus:ring-2 
                                focus:ring-prymary/30
                                focus:border-primary
                                transition-all 
                                duration-300
                                ${errors.username ? 'border-red-300' : 'border-secondary/20'}
                            `}
                            autoComplete="off"
                        />

                        {/*mensaje de error para usuario*/}
                        {errors.username && (
                            <p className="text-red-500 text-sm mt-1 pl-3" role="alert">
                                {errors.username}
                            </p>
                        )}
                    </div>

                    {/* Campo de contraseña */}
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-primary" />
                        </div>
                        <input
                            type={isPasswordVisible ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="Contraseña"
                            aria-label="Contraseña"
                            className={`
                                w-full 
                                pl-10 
                                pr-12 
                                py-3 
                                rounded-lg 
                                border
                                bg-neutral/50
                                text-secondary 
                                placeholder-secondary/50
                                focus:outline-none 
                                focus:ring-2 
                                focus:ring-primary/30
                                focus:border-primary
                                transition-all 
                                duration-300
                                ${errors.password ? 'border-red-300' : 'border-secondary/20'}
                            `}
                            autoComplete="new-password"
                        />

                        {/*boton para mostrar/ocultar contraseña*/}
                        <button
                            type="button"
                            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                            className="
                                absolute 
                                right-3
                                inset-y-0 
                                flex 
                                items-center 
                                text-primary/60
                                hover:text-primary
                                transition-colors 
                                duration-200
                            "
                            aria-label={ isPasswordVisible ? "Ocultar contraseña" : "Mostrar contraseña"}
                        >
                            {isPasswordVisible ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>

                            {/*mensaje de error para contraseña*/}
                            {errors.password && (
                                <p className="text-red-500 text-sm mt-1 pl-3" role="alert">
                                    {errors.password}
                                </p>
                            )}
                        </div>                        
                </div>


                {/* Boton de envio del formulario */}
                <button
                    type="submit"
                    className="
                        w-full 
                        py-3 
                        bg-primary 
                        text-white
                        font-semibold
                        rounded-lg 
                        hover:bg-primary-hover
                        focus:ring-4 
                        focus:ring-primary/30
                        transition-all 
                        duration-300 
                        transform 
                        hover:scale-[1.02] 
                        active:scale-[0.98]
                        shadow-lg
                        hover:shadow-xl
                        disabled:opacity-50
                        disabled:cursor-not-allowed
                    "
                >
                    Iniciar Sesión
                </button>

                {/* Boton de recuperación de contraseña */}
                {/*<div className="text-center">
                    <a 
                        href="#" 
                        className="
                            text-primary/80
                            text-sm 
                            hover:text-primary
                            transition-colors 
                            duration-300
                            focus:outline-none
                            focus:underline
                        "
                    >
                        ¿Olvidaste tu contraseña?
                    </a>
                </div>*/}
            </form>
        </div>
    </div>
);
};


 export default LoginForm;