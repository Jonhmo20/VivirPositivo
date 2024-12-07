import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/ReactToastify.css';

interface LoginFormProps {
    username: string;
    password: string;
}

const LoginForm: React.FC = () => {
    const [formData, setFormData] = useState<LoginFormProps>({
        username: '',
        password: ''
    });

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
        <>
        <ToastContainer />
        <div className="flex justify-center items-center h-screen bg-teal-200">
            <form
            onSubmit={handleSubmit}
            className="bg-teal-300 p-8 rounded-lg shadow-md w-full max-w-sm"
            autoComplete="off"
           >
                <h2 className="text-2xl font-bold mb-6 text-center text-white">
                    Iniciar Sesión 
                </h2>

                <div className="mb-4">
                    <label
                    htmlFor="login-username"
                    className="block text-white font-bold mb-2"
                    >
                        Nombre de usuario
                    </label>
                    <input 
                    type="text"
                    id="login-username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400"
                    placeholder="Ingresa tu nombre de usuario"
                    autoComplete="off"
                    />
                    {errors.username && (
                        <p className="text-red-500 text-sm mt-1">{errors.username}</p>
                    )}
                    </div>

                    <div className="mb-6">
                        <label
                        htmlFor="login-password"
                        className="block text-white font-bold mb-2"
                        >
                            Contraseña
                        </label>
                        <input
                        type="password"
                        id="login-password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400"
                        placeholder="Ingresa tu contraseña"
                        autoComplete="new-password"
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                        )}
                        </div>

                        <button
                        type="submit"
                        className="w-full bg-teal-400 text-white font-bold py-2 px-4 rounded-lg hover:bg-teal-500 transition duration-300"
                        >
                            Iniciar Sesión 
                        </button>
                        </form>
                        </div>
        </>
    );
 };

 export default LoginForm;