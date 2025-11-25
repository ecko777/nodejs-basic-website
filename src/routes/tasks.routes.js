import { Router } from 'express';


import { 
    getTasks, 
    createTask, 
    updateTask, 
    deleteTask 
} from '../controllers/tasks.controller.js';

const router = Router();

// GET /api/tasks -> Obtener todas las tareas
router.get('/', getTasks);

// POST /api/tasks -> Crear una nueva tarea
router.post('/', createTask);

// PUT /api/tasks/:id -> Actualizar una tarea por ID
router.put('/:id', updateTask);

// DELETE /api/tasks/:id -> Eliminar una tarea por ID
router.delete('/:id', deleteTask);


export default router;