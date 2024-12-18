// AuthProvider.jsx
import { useState } from "react";
import PropTypes from "prop-types";
import { registerRequest } from "../api/auth.js"
import { AuthContext } from "./AuthContext.jsx";

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);

    const signup = async (user) => {
        try {
            const data = await registerRequest(user); // Realiza la solicitud de registro
            setIsAuthenticated(true); // Si la respuesta es exitosa
            setUser(data.user); // Guarda la información del usuario si es necesario
            return data;
        } catch (error) {
            console.error("Error en la solicitud:", error);
            // Aquí manejamos mejor el error, considerando que `error.message` puede ser más claro
            setErrors([error.message || "Error en la solicitud, intenta de nuevo más tarde."]);
            throw error; // Re-lanzamos el error para que se maneje en el componente de registro
        }
    };

    const value = {
        signup,
        isAuthenticated,
        errors,
        user
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};


AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
