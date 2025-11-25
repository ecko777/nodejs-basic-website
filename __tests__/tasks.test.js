import request from 'supertest';

// 2. Importamos la 'app' usando la exportación nombrada que añadimos en src/app.js
// Esto elimina la confusión entre default/module.exports.
import { app } from '../src/app.js';

// 3. Importamos la base de datos simulada para manipularla en los tests
import { mockDatabase } from '../src/controllers/tasks.controller.js';

describe('Rutas de API de Tareas (/api/tasks)', () => {

    // Antes de ejecutar cualquier test en esta suite, limpiamos la BD
    beforeEach(() => {
        mockDatabase.length = 0; 
    });

    // --- Test 1: GET /api/tasks ---
    test('GET /api/tasks debe devolver un array de tareas y status 200', async () => {
        mockDatabase.push(
            { id: 1, title: 'Test Task 1', description: 'Desc 1', completed: false },
            { id: 2, title: 'Test Task 2', description: 'Desc 2', completed: true }
        );

        const response = await request(app)
            .get('/api/tasks')
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.length).toBe(2);
        expect(response.body[0].title).toBe('Test Task 1');
    });

    // --- Test 2: POST /api/tasks (Creación exitosa) ---
    test('POST /api/tasks debe crear una tarea y devolver la tarea con status 201', async () => {
        const newTask = {
            title: 'Hacer la compra',
            description: 'Comprar leche y pan'
        };

        const response = await request(app)
            .post('/api/tasks')
            .send(newTask)
            .expect('Content-Type', /json/)
            .expect(201);

        expect(response.body).toHaveProperty('id');
        expect(response.body.title).toBe(newTask.title);
        expect(mockDatabase.length).toBe(1);
    });

    // --- Test 3: POST /api/tasks (Datos inválidos) ---
    test('POST /api/tasks sin título debe devolver status 400', async () => {
        const invalidTask = {
            description: 'Sin título'
        };

        await request(app)
            .post('/api/tasks')
            .send(invalidTask)
            .expect('Content-Type', /json/)
            .expect(400);

        expect(mockDatabase.length).toBe(0);
    });

    // --- Test 4: PUT /api/tasks/:id (Actualización exitosa) ---
    test('PUT /api/tasks/:id debe actualizar la tarea y devolver status 200', async () => {
        const taskId = 3;
        mockDatabase.push({ id: taskId, title: 'Old Title', description: 'Old Desc', completed: false });
        
        const updateData = {
            title: 'New Title',
            completed: true
        };

        const response = await request(app)
            .put(`/api/tasks/${taskId}`)
            .send(updateData)
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body.title).toBe('New Title');
        expect(response.body.completed).toBe(true);
        // La descripción original no debe cambiar si no se envía
        expect(response.body.description).toBe('Old Desc'); 
        
        expect(mockDatabase[0].title).toBe('New Title');
    });

    // --- Test 5: PUT /api/tasks/:id (Tarea no encontrada) ---
    test('PUT /api/tasks/:id inexistente debe devolver status 404', async () => {
        await request(app)
            .put('/api/tasks/999') // ID que no existe
            .send({ title: 'Attempt to update' })
            .expect('Content-Type', /json/)
            .expect(404);
    });

    // --- Test 6: DELETE /api/tasks/:id (Eliminación exitosa) ---
    test('DELETE /api/tasks/:id debe eliminar la tarea y devolver status 204', async () => {
        const taskId = 4;
        mockDatabase.push({ id: taskId, title: 'To Delete', description: 'Desc', completed: false });
        
        await request(app)
            .delete(`/api/tasks/${taskId}`)
            .expect(204); // No Content

        expect(mockDatabase.length).toBe(0);
    });

    // --- Test 7: DELETE /api/tasks/:id (Tarea no encontrada) ---
    test('DELETE /api/tasks/:id inexistente debe devolver status 404', async () => {
        await request(app)
            .delete('/api/tasks/999') // ID que no existe
            .expect('Content-Type', /json/)
            .expect(404);
    });
});