import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/ReactToastify.css';
import { Lock, User } from "lucide-react";

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

    useEffect(() => {
        setFormData({ username: '', password: ''});
    }, []);
    
    const [errors, setErrors] = useState<{username: string; password: string }>({
        username: '',
        password: ''
    });

    const navigate = useNavigate();
    const { login } = useAuth();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
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
                    toast.success('Inicio de sesion exitoso como administrador');

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
        className="min-h-screen flex items-center justify-center bg-[#B7DBC8] p-4 transition-all duration-500 ease-in-out"
        style={{
            backgroundImage: `
                linear-gradient(
                    135deg, 
                    rgba(40, 93, 102, 0.1), 
                    rgba(109, 160, 149, 0.1)
                )
            `,
        }}
    >
        <ToastContainer />
        
        <div 
            className={`
                w-full max-w-md 
                bg-[#285D66] 
                rounded-2xl 
                shadow-2xl 
                overflow-hidden 
                transform 
                transition-all 
                duration-700 
                ${isFormFocused ? 'scale-105 shadow-lg' : 'scale-100'}
            `}
        >
            <form 
                onSubmit={handleSubmit}
                className="p-8 space-y-6"
                autoComplete="off"
                onFocus={() => setIsFormFocused(true)}
                onBlur={() => setIsFormFocused(false)}
            >
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-[#E1DF66] tracking-wide uppercase">
                        Iniciar Sesión
                    </h2>
                    <p className="text-[#6DA095] mt-2 text-sm">
                        Accede a tu cuenta de administrador
                    </p>
                </div>

                <div className="space-y-4">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User className="h-5 w-5 text-[#6DA095]" />
                        </div>
                        <input 
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            placeholder="Nombre de usuario"
                            className="
                                w-full 
                                pl-10 
                                pr-4 
                                py-3 
                                rounded-lg 
                                bg-[#B7DBC8] 
                                text-[#285D66] 
                                placeholder-[#285D66]/50 
                                focus:outline-none 
                                focus:ring-2 
                                focus:ring-[#E1DF66]
                                transition-all 
                                duration-300
                            "
                            autoComplete="off"
                        />
                        {errors.username && (
                            <p className="text-red-300 text-xs mt-1 pl-3">
                                {errors.username}
                            </p>
                        )}
                    </div>

                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-[#6DA095]" />
                        </div>
                        <input
                            type={isPasswordVisible ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="Contraseña"
                            className="
                                w-full 
                                pl-10 
                                pr-12 
                                py-3 
                                rounded-lg 
                                bg-[#B7DBC8] 
                                text-[#285D66] 
                                placeholder-[#285D66]/50 
                                focus:outline-none 
                                focus:ring-2 
                                focus:ring-[#E1DF66]
                                transition-all 
                                duration-300
                            "
                            autoComplete="new-password"
                        />
                        <button
                            type="button"
                            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                            className="
                                absolute 
                                right-0 
                                inset-y-0 
                                flex 
                                items-center 
                                pr-3 
                                text-[#6DA095] 
                                hover:text-[#E1DF66] 
                                transition-colors 
                                duration-200
                            "
                        >
                            {isPasswordVisible ? 
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                </svg>
                                :
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.78zm4.261 4.262l1.514 1.514a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                                    <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.742L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.064 7 9.542 7 .969 0 1.911-.134 2.803-.385z" />
                                </svg>
                            }
                        </button>
                        {errors.password && (
                            <p className="text-red-300 text-xs mt-1 pl-3">
                                {errors.password}
                            </p>
                        )}
                    </div>
                </div>

                <button
                    type="submit"
                    className="
                        w-full 
                        py-3 
                        bg-[#E1DF66] 
                        text-[#285D66] 
                        font-bold 
                        rounded-lg 
                        hover:bg-[#6DA095] 
                        hover:text-white 
                        transition-all 
                        duration-300 
                        transform 
                        hover:scale-105 
                        active:scale-95
                        shadow-lg 
                        hover:shadow-xl
                    "
                >
                    Iniciar Sesión
                </button>

                <div className="text-center">
                    <a 
                        href="#" 
                        className="
                            text-[#6DA095] 
                            text-sm 
                            hover:text-[#E1DF66] 
                            transition-colors 
                            duration-300
                        "
                    >
                        ¿Olvidaste tu contraseña?
                    </a>
                </div>
            </form>
        </div>
    </div>
);
};


 export default LoginForm;