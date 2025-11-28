🚀 nodejs-basic-website: Mi Proyecto de Arranque

🎯 ¿Qué es esto?

¡Hola! Este es mi proyecto de arranque para un servidor web muy básico usando Node.js con módulos ES (import/export). Lo creé para tener una plantilla sólida que demuestre buenas prácticas en un backend pequeño.

Es ideal para ver cómo configurar:

Routing y controladores en Express.

Tests unitarios con Jest (¡logré el 100% de cobertura!).

Calidad de código con ESLint y Prettier.

Automatización de pruebas con GitHub Actions (CI).

✅ Estado Actual

Proyecto base: ¡Listo y funcional!

CI (GitHub Actions): 🟢 Pasa el linting y los tests en cada push.

Cobertura de Tests: 💯 ¡100% en todas las métricas!

Instrucciones para arrancar localmente.

⚙️ Tecnologías Usadas

Node.js: Usando sintaxis moderna (ESM - import/export).

Express: Para manejar las rutas (routing).

Jest: Mi herramienta para hacer pruebas y medir la cobertura.

ESLint + Prettier: Para asegurarme de que el código esté limpio y bien formateado.

💻 Instalación y Ejecución Local

¿Quieres probarlo? Es muy fácil:

Clona este repositorio:

git clone [https://github.com/ecko777/nodejs-basic-website.git](https://github.com/ecko777/nodejs-basic-website.git)
cd nodejs-basic-website




Instala todas las dependencias:

npm ci




¡A correr en modo desarrollo!

npm run dev




Luego, solo abre http://localhost:3000 en tu navegador.

🛠️ Mis Comandos Esenciales

Script

Descripción

npm run dev

Inicia el servidor con Nodemon (se recarga automáticamente).

npm start

Inicia la app en modo "producción".

npm run test:coverage

Ejecuta tests y genera el reporte de cobertura (debe ser 100%).

npm run lint

Ejecuta ESLint para revisar la calidad del código.

npm run format

Corrige automáticamente el formato con Prettier.

npm run test

Ejecuta todos los tests (versión simple).

🏗️ Estructura del Proyecto

Quise mantenerlo simple y ordenado:

src/: Todo el código fuente.

controllers/: La lógica de negocio.

routes/: Donde defino mis rutas.

views/: Los archivos HTML simples.

__tests__/: Mis archivos de pruebas unitarias/integración.

.github/workflows/: La configuración de GitHub Actions.

💡 Lo que Aprendí y Mis Decisiones Clave

Este proyecto me sirvió para afianzar conceptos:

Garantizar la Cobertura (100%): Fue un reto asegurarse de que todas las ramas de código (incluidos los if/else y las validaciones 404/400) estuvieran cubiertas por un test.

Configuración de ESM y Tests: Entender cómo configurar Babel y Jest para que funcionaran correctamente con la sintaxis import/export de Node.js, manteniendo la modularidad.

CI como Guardián: Usar GitHub Actions me asegura que nunca voy a fusionar código roto o sin formato a la rama principal (main).

🤝 Contacto

Si tienes alguna duda o sugerencia, ¡hablemos!

GitHub: ecko777

Email: ferbat.sor@gmail.com

Licencia

Este proyecto está bajo la Licencia MIT.