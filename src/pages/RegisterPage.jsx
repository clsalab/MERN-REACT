import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useAuth } from "../context/useAuth"; // Ahora importas el hook desde el archivo adecuado
import { useNavigate } from "react-router-dom";

function RegisterPage() {
    // Usamos react-hook-form para manejar el formulario
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [successMessage, setSuccessMessage] = useState("");
    const { signup, isAuthenticated, errors: registerErrors } = useAuth(); // Usa el hook aquí
    const navigate = useNavigate();

    // Verificamos si el usuario ya está autenticado
    useEffect(() => {
        if (isAuthenticated) navigate("/tasks");
    }, [isAuthenticated, navigate]);

    // Función que maneja el envío del formulario
    const onSubmit = handleSubmit(async (values) => {
        try {
            setSuccessMessage("");  // Limpiar el mensaje de éxito si hay alguno previo
            await signup(values);   // Llama a la función signup
            setSuccessMessage("Usuario registrado exitosamente.");
        } catch (error) {
            console.error("Error al registrar usuario:", error);
        }
    });

    return (
        <div className="bg-zinc-800 max-w-md p-10 rounded-md mx-auto mt-10">
            {/* Mostrar errores de la respuesta del backend, si los hay */}
            {registerErrors && registerErrors.length > 0 && (
                <div className="bg-red-500 p-3 text-white rounded-md mb-4">
                    {registerErrors.map((error, index) => (
                        <div key={index}>{error}</div>
                    ))}
                </div>
            )}
    
            {/* Formulario de registro */}
            <form onSubmit={onSubmit}>
                {/* Campo para el nombre de usuario */}
                <div className="mb-4">
                    <label htmlFor="username" className="text-white block mb-1">Nombre de usuario</label>
                    <input
                        id="username"
                        type="text"
                        {...register("username", { required: "El nombre de usuario es obligatorio" })}
                        className={`w-full bg-zinc-700 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.username ? 'border-red-500' : 'border-transparent'}`}
                        placeholder="Nombre de usuario"
                    />
                    {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>}
                </div>
    
                {/* Campo para el correo electrónico */}
                <div className="mb-4">
                    <label htmlFor="email" className="text-white block mb-1">Correo electrónico</label>
                    <input
                        id="email"
                        type="email"
                        {...register("email", {
                            required: "El correo electrónico es obligatorio",
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: "El formato del correo es inválido",
                            },
                        })}
                        className={`w-full bg-zinc-700 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.email ? 'border-red-500' : 'border-transparent'}`}
                        placeholder="Correo electrónico"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                </div>
    
                {/* Campo para la contraseña */}
                <div className="mb-4">
                    <label htmlFor="password" className="text-white block mb-1">Contraseña</label>
                    <input
                        id="password"
                        type="password"
                        {...register("password", {
                            required: "La contraseña es obligatoria",
                            minLength: { value: 6, message: "La contraseña debe tener al menos 6 caracteres" },
                        })}
                        className={`w-full bg-zinc-700 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.password ? 'border-red-500' : 'border-transparent'}`}
                        placeholder="Contraseña"
                    />
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                </div>
    
                {/* Campo para determinar si es administrador */}
                <div className="flex items-center mb-4">
                    <input
                        id="isAdmin"
                        type="checkbox"
                        {...register("isAdmin")}
                        className="my-2 mr-2"
                    />
                    <label htmlFor="isAdmin" className="text-white">¿Es administrador?</label>
                </div>
    
                {/* Botón de registro */}
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Registrar
                </button>
            </form>
    
            {/* Mostrar el mensaje de éxito si lo hay */}
            {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}
        </div>
    );
    
}

export default RegisterPage;
