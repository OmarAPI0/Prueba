To-Do List App

Aplicación Full Stack para gestionar tareas, desarrollada con React, Node.js, Express y MongoDB.
Permite crear, editar, eliminar y marcar tareas como completadas.

Características:
- Crear tareas con título, contenido y fecha.
- Editar tareas existentes.
- Eliminar tareas.
- Marcar tareas como completadas.

Estructura del proyecto:
- frontend: Código del cliente en React
- backend: Servidor con Node.js y Express, modelos y rutas

Instrucciones para iniciar el proyecto:

1. Clonar el repositorio
   git clone https://github.com/OmarAPI0/Prueba.git
   cd prueba

2. Configurar el backend
   cd backend
   npm install
   npm run dev
   (El backend se ejecuta en http://localhost:5000)
   Asegúrate de tener un archivo .env con tu MONGO_URI y PORT

3. Configurar el frontend
   cd frontend
   npm install
   npm start
   (El frontend se ejecuta en http://localhost:3000)

Tecnologías usadas:
- React
- Node.js + Express
- MongoDB Atlas + Mongoose

Conventional Commits:
- feat: nueva funcionalidad
- fix: corrección de errores
- docs: cambios en documentación
- style: cambios de formato
- refactor: mejoras internas

Ejemplos:
git commit -m "feat(frontend): agregar formulario para crear tareas"

git commit -m "fix(backend): corregir error al actualizar tareas"

git commit -m "docs: agregar instrucciones en README"

Autor:
Omar Pérez
