export const mockDatabase = [];

/**
 * Obtiene todas las tareas.
 */
export const getTasks = (req, res) => {
    // CLAVE: Aseguramos que el status 200 sea llamado explícitamente para los tests.
    return res.status(200).json(mockDatabase);
};

/**
 * Crea una nueva tarea.
 */
export const createTask = (req, res) => {
    const { title, description } = req.body;

    // Validación simplificada
    if (!title || !description) {
        return res.status(400).json({ message: 'El título y la descripción son requeridos.' });
    }

    // Usamos la longitud del array + 1 como ID simple (solo para el mock)
    const newTask = {
        id: mockDatabase.length + 1,
        title,
        description,
        completed: false,
    };

    mockDatabase.push(newTask);

    return res.status(201).json(newTask);
};

/**
 * Actualiza una tarea por ID.
 */
export const updateTask = (req, res) => {
    const id = parseInt(req.params.id, 10);
    const updates = req.body;

    // Comprobación explícita para ID no válido (para asegurar 100% de cobertura de rama)
    if (isNaN(id)) {
        return res.status(404).json({ message: 'Tarea no encontrada' });
    }

    const index = mockDatabase.findIndex(task => task.id === id);

    if (index === -1) {
        // Esta rama cubre el caso de ID numérico válido que no se encuentra.
        return res.status(404).json({ message: 'Tarea no encontrada' });
    }

    // Aplicar las actualizaciones, manteniendo el ID
    mockDatabase[index] = {
        ...mockDatabase[index],
        ...updates,
        id: mockDatabase[index].id, // Aseguramos que el ID no cambie
    };

    // CLAVE: Aseguramos que el status 200 sea llamado explícitamente para los tests.
    return res.status(200).json(mockDatabase[index]);
};

/**
 * Elimina una tarea por ID.
 */
export const deleteTask = (req, res) => {
    const id = parseInt(req.params.id, 10);

    // Comprobación explícita para ID no válido
    if (isNaN(id)) {
        return res.status(404).json({ message: 'Tarea no encontrada' });
    }

    const index = mockDatabase.findIndex(task => task.id === id);

    if (index === -1) {
        return res.status(404).json({ message: 'Tarea no encontrada' });
    }

    // Eliminar la tarea del array
    mockDatabase.splice(index, 1);

    // 204 No Content se usa para eliminación exitosa sin cuerpo de respuesta
    return res.status(204).send();
};