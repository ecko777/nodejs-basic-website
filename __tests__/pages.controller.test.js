const { renderHome, renderAbout, pageNotFound } = require('../src/controllers/pages.controller.js');

// Mocks de Express (req, res)
const mockResponse = () => {
  const res = {};
  // Mockeamos las funciones para encadenamiento
  res.status = jest.fn().mockReturnValue(res); 
  res.json = jest.fn().mockReturnValue(res);
  // Mockeamos sendFile para simular el envío del archivo HTML.
  res.sendFile = jest.fn().mockReturnValue(res);
  return res;
};

const mockRequest = () => ({});

// Hacemos un mock completo del módulo 'path' para controlar lo que hace path.join.
// Esto evita la dependencia del sistema de archivos real y siempre devuelve un path simulado.
jest.mock('path', () => ({
    join: jest.fn(() => '/mocked/path/to/file.html')
}));


describe('Controlador Unitario de Páginas (pages.controller.js)', () => {

    // --- Test: Página No Encontrada (pageNotFound) ---
    describe('pageNotFound', () => {
        test('Debe devolver un estado 404 y un mensaje de error JSON', () => {
            const req = mockRequest();
            const res = mockResponse();
            
            pageNotFound(req, res);
            
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({
                message: "Ruta no encontrada"
            });
        });
    });
    
    // --- Test: Renderizar Home (renderHome) ---
    describe('renderHome', () => {
        test('Debe llamar a res.sendFile con la ruta correcta para index.html', () => {
            const req = mockRequest();
            const res = mockResponse();
            
            renderHome(req, res);

            // Verificamos que se llama a sendFile una vez
            expect(res.sendFile).toHaveBeenCalledTimes(1);
            
            // path.join está mockeado, por lo que el argumento es la ruta mockeada
            expect(res.sendFile).toHaveBeenCalledWith('/mocked/path/to/file.html');
        });
    });

    // --- Test: Renderizar About (renderAbout) ---
    describe('renderAbout', () => {
        test('Debe llamar a res.sendFile con la ruta correcta para about.html', () => {
            const req = mockRequest();
            const res = mockResponse();
            
            renderAbout(req, res);

            expect(res.sendFile).toHaveBeenCalledTimes(1);
            expect(res.sendFile).toHaveBeenCalledWith('/mocked/path/to/file.html');
        });
    });
});