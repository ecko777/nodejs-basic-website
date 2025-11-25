const { getTasks, createTask, updateTask, deleteTask, mockDatabase } = require('../src/controllers/tasks.controller.js');

// Mocks de Express (req, res) para simular llamadas al controlador.

// Función de ayuda para crear objetos 'res' simulados (mocks)
const mockResponse = () => {
  const res = {};
  // Mockeamos las funciones para encadenamiento: res.status(200).json(...)
  res.status = jest.fn().mockReturnValue(res); 
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

// Función de ayuda para crear objetos 'req' simulados (mocks)
const mockRequest = (body = {}, params = {}, query = {}) => ({
    body,
    params,
    query
});

describe('Controlador Unitario de Tareas (tasks.controller.js)', () => {
    
    // Limpiamos la base de datos simulada antes de cada prueba
    beforeEach(() => {
        mockDatabase.length = 0; 
    });

    // --- Test: Leer Tareas (getTasks) ---
    describe('getTasks', () => {
        test('Debe devolver un array vacío y status 200 si no hay tareas', () => {
            const req = mockRequest();
            const res = mockResponse();
            
            getTasks(req, res);
            
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith([]);
        });
        
        test('Debe devolver la lista de tareas y status 200', () => {
            const req = mockRequest();
            const res = mockResponse();
            
            // Prepara el mockDatabase con datos
            mockDatabase.push({ id: 1, title: 'Mock Task' });
            
            getTasks(req, res);
            
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith([{ id: 1, title: 'Mock Task' }]);
        });
    });

    // --- Test: Crear Tarea (createTask) ---
    describe('createTask', () => {
        const validTaskData = {
            title: 'Ir al gimnasio',
            description: 'Clase de spinning a las 7 PM'
        };

        test('Debe crear una nueva tarea, añadirla al mockDatabase y devolver 201', () => {
            const req = mockRequest(validTaskData);
            const res = mockResponse();

            createTask(req, res);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(mockDatabase.length).toBe(1);
            
            const createdTask = mockDatabase[0];
            expect(createdTask.title).toBe(validTaskData.title);
            expect(createdTask).toHaveProperty('id');
        });

        test('Debe devolver 400 si falta el título o descripción', () => {
            const req = mockRequest({ description: 'Una descripción sin título' });
            const res = mockResponse();
            
            createTask(req, res);
            
            expect(res.status).toHaveBeenCalledWith(400);
            expect(mockDatabase.length).toBe(0);
        });
    });

    // --- Test: Actualizar Tarea (updateTask) ---
    describe('updateTask', () => {
        const TASK_ID = 999;
        const initialTask = { id: TASK_ID, title: 'Old Title', description: 'Old Desc', completed: false };

        beforeEach(() => {
            // Aseguramos que la base de datos tenga una tarea existente para actualizar
            mockDatabase.push(initialTask);
        });

        test('Debe actualizar el título y la descripción y devolver 200', () => {
            const req = mockRequest(
                { title: 'New Title', description: 'New Desc' },
                { id: TASK_ID.toString() }
            );
            const res = mockResponse();

            updateTask(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(mockDatabase.length).toBe(1);
            
            const updatedTask = mockDatabase[0];
            expect(updatedTask.title).toBe('New Title');
            expect(updatedTask.description).toBe('New Desc');
            // 'completed' no fue enviado, debe permanecer igual
            expect(updatedTask.completed).toBe(false); 
        });

        test('Debe actualizar solo el estado "completed" a true y devolver 200', () => {
            const req = mockRequest(
                { completed: true },
                { id: TASK_ID.toString() }
            );
            const res = mockResponse();

            updateTask(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(mockDatabase.length).toBe(1);
            
            const updatedTask = mockDatabase[0];
            expect(updatedTask.completed).toBe(true);
            // Las otras propiedades deben permanecer iguales
            expect(updatedTask.title).toBe(initialTask.title);
        });
        
        test('Debe devolver 404 si la tarea no existe', () => {
            const req = mockRequest(
                { title: 'Test' },
                { id: '12345' } // ID que no existe
            );
            const res = mockResponse();

            updateTask(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'Tarea no encontrada.' });
            // Asegura que la base de datos no haya cambiado
            expect(mockDatabase.length).toBe(1); 
        });

        test('Debe devolver 404 si el ID no es un número válido (NaN después de parseInt)', () => {
             // Simulamos un ID de ruta que no es un número y resulta en NaN
            const req = mockRequest(
                { title: 'Test' },
                { id: 'abc' } // 'abc' -> parseInt() = NaN. FindIndex() dará -1.
            );
            const res = mockResponse();

            updateTask(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'Tarea no encontrada.' });
        });
    });

    // --- Test: Eliminar Tarea (deleteTask) ---
    describe('deleteTask', () => {
        const TASK_ID = 888;
        const anotherTask = { id: 777, title: 'Another', description: 'Task', completed: false };
        const taskToDelete = { id: TASK_ID, title: 'To Delete', description: 'This one', completed: false };

        beforeEach(() => {
            // Prepara la base de datos con varias tareas
            mockDatabase.push(anotherTask, taskToDelete);
        });

        test('Debe eliminar la tarea y devolver 204 No Content', () => {
            const req = mockRequest(
                {},
                { id: TASK_ID.toString() }
            );
            const res = mockResponse();
            
            expect(mockDatabase.length).toBe(2); // Sanity check

            deleteTask(req, res);

            expect(res.status).toHaveBeenCalledWith(204);
            expect(res.send).toHaveBeenCalledTimes(1); // Usa res.send() en lugar de res.json() para 204
            
            // Verifica que la tarea restante sea la correcta
            expect(mockDatabase.length).toBe(1);
            expect(mockDatabase[0].id).toBe(anotherTask.id);
        });

        test('Debe devolver 404 si la tarea a eliminar no existe', () => {
            const req = mockRequest(
                {},
                { id: '1111' } // ID que no existe
            );
            const res = mockResponse();

            expect(mockDatabase.length).toBe(2); // Sigue teniendo 2 tareas

            deleteTask(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'Tarea no encontrada para eliminar.' });
            
            // Asegura que la base de datos no haya cambiado
            expect(mockDatabase.length).toBe(2); 
        });
    });

});