export const mockDatabase = [];

/**
 * Obtiene todas las tareas.
 * @param {object} req - Objeto de solicitud.
 * @param {object} res - Objeto de respuesta.
 */
export const getTasks = (req, res) => {
    res.status(200).json(mockDatabase);
};


/**
 * Crea una nueva tarea.
 * @param {object} req - Objeto de solicitud.
 * @param {object} res - Objeto de respuesta.
 */
export const createTask = (req, res) => {
    const { title, description } = req.body;
    
    if (!title || !description) {
        return res.status(400).json({ message: 'Título y descripción son requeridos.' });
    }
    
    // Creación del nuevo objeto tarea
    const newTask = { 
        id: Date.now(), // ID simple para propósitos de mock
        title, 
        description, 
        completed: false 
    };
    
    // Almacenamiento
    mockDatabase.push(newTask);
    
    // Respuesta exitosa (201 Created)
    res.status(201).json(newTask);
};

/**
 * Actualiza una tarea por su ID.
 * @param {object} req - Objeto de solicitud.
 * @param {object} res - Objeto de respuesta.
 */
export const updateTask = (req, res) => {
    // Obtenemos el ID de los parámetros de la URL
    const id = parseInt(req.params.id);
    
    // Buscamos el índice de la tarea
    const taskIndex = mockDatabase.findIndex(task => task.id === id);

    // Si la tarea no se encuentra
    if (taskIndex === -1) {
        return res.status(404).json({ message: 'Tarea no encontrada.' });
    }

    // Obtenemos los datos a actualizar del cuerpo de la petición
    const { title, description, completed } = req.body;

    // Actualizamos la tarea en la base de datos simulada
    mockDatabase[taskIndex] = {
        ...mockDatabase[taskIndex], // Mantenemos las propiedades existentes
        title: title !== undefined ? title : mockDatabase[taskIndex].title,
        description: description !== undefined ? description : mockDatabase[taskIndex].description,
        completed: completed !== undefined ? completed : mockDatabase[taskIndex].completed
    };

    // Devolvemos la tarea actualizada (200 OK)
    res.status(200).json(mockDatabase[taskIndex]);
};

/**
 * Elimina una tarea por su ID.
 * @param {object} req - Objeto de solicitud.
 * @param {object} res - Objeto de respuesta.
 */
export const deleteTask = (req, res) => {
    // Obtenemos el ID de los parámetros de la URL
    const id = parseInt(req.params.id);

    // Buscamos el índice de la tarea
    const taskIndex = mockDatabase.findIndex(task => task.id === id);

    // Si la tarea no se encuentra
    if (taskIndex === -1) {
        return res.status(404).json({ message: 'Tarea no encontrada para eliminar.' });
    }

    // Eliminamos la tarea usando splice
    mockDatabase.splice(taskIndex, 1);

    // Respuesta exitosa sin contenido (204 No Content)
    res.status(204).send();
};