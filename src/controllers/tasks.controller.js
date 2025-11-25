let mockDatabase = [
  // Cambiado de 'const' a 'let' para resolver el error de análisis 'already been declared'
  { id: 1, title: 'Comprar leche', description: 'Leche entera y deslactosada', completed: false },
  { id: 2, title: 'Pagar servicios', description: 'Electricidad y agua', completed: true },
  { id: 3, title: 'Ejercicio diario', description: 'Rutina de 30 minutos', completed: false },
];
let nextId = mockDatabase.length + 1;

/**
 * Obtiene todas las tareas.
 */
const getTasks = (req, res) => {
  return res.json(mockDatabase); // Añadido 'return' por consistencia (aunque getTasks no tenía la advertencia)
};

/**
 * Crea una nueva tarea.
 */
const createTask = (req, res) => {
  const { title, description } = req.body;

  if (!title) {
    // CORREGIDO: Usar 'return' para salir de la función inmediatamente después del error.
    return res.status(400).json({ message: 'El título es obligatorio.' });
  }

  const newTask = {
    id: nextId++,
    title,
    description: description || '',
    completed: false,
  };

  mockDatabase.push(newTask);
  // CORREGIDO: Añadido 'return' al camino de éxito
  return res.status(201).json(newTask);
};

/**
 * Actualiza una tarea por ID.
 */
const updateTask = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const updates = req.body;
  const index = mockDatabase.findIndex((task) => task.id === id);

  if (index === -1) {
    // CORREGIDO: Usar 'return' para salir de la función inmediatamente después del error.
    return res.status(404).json({ message: 'Tarea no encontrada' });
  }

  const updatedTask = { ...mockDatabase[index], ...updates };
  mockDatabase[index] = updatedTask;
  // CORREGIDO: Añadido 'return' al camino de éxito
  return res.json(updatedTask);
};

/**
 * Elimina una tarea por ID.
 */
const deleteTask = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = mockDatabase.findIndex((task) => task.id === id);

  if (index === -1) {
    // CORREGIDO: Usar 'return' para salir de la función inmediatamente después del error.
    return res.status(404).json({ message: 'Tarea no encontrada' });
  }

  mockDatabase.splice(index, 1);
  // CORREGIDO: Añadido 'return' al camino de éxito
  return res.status(204).send(); // 204 No Content
};

export { getTasks, createTask, updateTask, deleteTask, mockDatabase };
