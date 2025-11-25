import path from 'path';

/**
 * Renderiza la página principal (Home).
 * @param {object} req - Objeto de solicitud.
 * @param {object} res - Objeto de respuesta.
 */
export const renderHome = (req, res) => {
    res.sendFile(path.join(process.cwd(), 'src/views/index.html'));
};

/**
 * Renderiza la página "Acerca de" (About).
 * @param {object} req - Objeto de solicitud.
 * @param {object} res - Objeto de respuesta.
 */
export const renderAbout = (req, res) => {
    res.sendFile(path.join(process.cwd(), 'src/views/about.html'));
};

/**
 * Manejador para rutas no encontradas (404 Not Found).
 * @param {object} req - Objeto de solicitud.
 * @param {object} res - Objeto de respuesta.
 */
export const pageNotFound = (req, res) => {
    res.status(404).json({
        message: "Ruta no encontrada"
    });
};