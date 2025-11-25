import express from 'express';
import path from 'path';
// import bodyParser from 'body-parser'; // Ya no es necesario, usamos express nativo

import pagesRouter from './routes/pages.routes.js';
import tasksRouter from './routes/tasks.routes.js';

const app = express(); // Instancia de la aplicación
const PORT = process.env.PORT || 3000;

// 1. MIDDLEWARES PRINCIPALES
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Archivos estáticos
const publicPath = path.join(process.cwd(), 'src', 'public');
app.use(express.static(publicPath));

// 2. RUTAS
app.use('/', pagesRouter); // Rutas para páginas estáticas
app.use('/api/tasks', tasksRouter); // Rutas para la API

// Inicia el servidor solo si NO estamos en modo test.
// "istanbul ignore next" le dice a Jest que no cuente este bloque en el reporte de cobertura.
/* istanbul ignore next */
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Servidor de Tareas y Web escuchando en http://localhost:${PORT}`);
  });
}

// 1. Exportación por defecto (para compatibilidad general)
export default app;

// 2. Exportación NOMBRADA (CLAVE para que tus tests funcionen con 'import { app }')
export { app };
