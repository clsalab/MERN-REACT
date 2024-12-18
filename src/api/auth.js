import axios from 'axios';

const API = 'http://localhost:3000/api';

/**
 * Realiza una solicitud POST para registrar un usuario.
 * @param {Object} user - Los datos del usuario a registrar.
 * @returns {Promise<Object>} - La respuesta de la API.
 * @throws {Error} - Lanza un error si la solicitud falla.
 */
export const registerRequest = async (user) => {
    try {
        console.log('Datos enviados:', user); // Depuración de los datos enviados

        const response = await axios.post(`${API}/register`, user, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        console.log('Respuesta del servidor:', response.data); // Depuración de la respuesta
        return response.data; // Retorna los datos si es exitoso
    } catch (error) {
        // Depura el error
        console.error('Error en la solicitud:', error);

        if (error.response) {
            console.error('Datos de la respuesta:', error.response.data);
            const errorMessages = error.response.data.errors || ['Error desconocido'];
            throw new Error(errorMessages.join(', ')); // Unir los mensajes de error si hay más de uno
        } else if (error.request) {
            console.error('Sin respuesta del servidor:', error.request);
            throw new Error('No se pudo contactar con el servidor. Verifica que el servidor esté corriendo.');
        } else {
            console.error('Error de configuración:', error.message);
            throw new Error('Error al procesar la solicitud.');
        }
    }
};


