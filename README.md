🐾 Sistema de Gestión de Adopciones (Pet Adoption App)
Este proyecto es una aplicación web completa (Full Stack) diseñada para facilitar y gestionar el proceso de adopción de mascotas. Permite a los usuarios ver mascotas disponibles, registrarse y gestionar solicitudes, mientras que los administradores pueden administrar el inventario de animales.

El sistema está dividido en dos partes principales:

Backend (tp-final-wnode): API RESTful construida con Node.js y Express.

Frontend (tp-final-wfront): Interfaz de usuario interactiva construida con React.js.

🚀 Tecnologías Utilizadas
Backend
Node.js & Express: Entorno de ejecución y framework del servidor.

MongoDB: Base de datos (gestionada vía Mongoose o driver nativo).

Joi: Validación de datos (Schemas).

EJS: Motor de plantillas (utilizado para vistas de error/index básicas del servidor).

Frontend
React.js: Biblioteca para la construcción de la interfaz.

CSS Modules: Estilos modulares para componentes (ver src/assets/styles).

React Router: Navegación SPA (Single Page Application).

📂 Estructura del Proyecto
Plaintext

/
├── tp-final-wnode/         # Backend (API)
│   ├── bin/www             # Punto de entrada del servidor
│   ├── controllers/        # Lógica de los endpoints (Adoptions, Pets, Users)
│   ├── data/               # Conexión a DB y capas de datos
│   ├── routes/             # Definición de rutas de la API
│   ├── schemas/            # Validaciones (Joi)
│   └── tp2.postman...json  # Colección de Postman para pruebas
│
└── tp-final-wfront/        # Frontend (React Client)
    ├── public/             # Archivos estáticos
    └── src/
        ├── components/     # Componentes React (Home, Login, Pet, etc.)
        ├── assets/         # Imágenes y archivos CSS
        └── lib/            # Utilidades y constantes
🛠️ Instalación y Configuración
Sigue estos pasos para ejecutar el proyecto en tu entorno local.

Prerrequisitos
Node.js (v14 o superior)

NPM

MongoDB (asegúrate de tener una instancia corriendo localmente o una URI de conexión).

1. Configuración del Backend
Navega a la carpeta del servidor e instala las dependencias:

Bash

cd tp-final-wnode
npm install
Variables de Entorno: Revisa el archivo data/conn.js para asegurarte de que la conexión a la base de datos sea correcta. Si el proyecto usa un archivo .env, crea uno en la raíz de tp-final-wnode con las variables necesarias (ej. PORT, MONGO_URI).

Iniciar el Servidor:

Bash

# Modo estándar
npm start

# O si usas nodemon para desarrollo
nodemon bin/www
El servidor backend correrá por defecto en el puerto 3000 (o el definido en bin/www).

2. Configuración del Frontend
Abre una nueva terminal, navega a la carpeta del cliente e instala las dependencias:

Bash

cd tp-final-wfront
npm install
Iniciar el Cliente:

Bash

npm start
La aplicación React se abrirá automáticamente en tu navegador (usualmente en http://localhost:3000 o 3001 si el 3000 está ocupado por el backend).

📡 Documentación de la API
El backend expone los siguientes recursos principales. Puedes importar el archivo tp2.postman_collection.json (ubicado en la carpeta del backend) en Postman para probar todos los endpoints rápidamente.

Endpoints Principales
🐶 Mascotas (/api/pets)
GET /pets: Obtener lista de mascotas disponibles.

POST /pets: Agregar una nueva mascota (Admin).

GET /pets/:id: Ver detalle de una mascota.

👤 Usuarios (/api/users)
POST /users/register: Registrar un nuevo usuario.

POST /users/login: Iniciar sesión.

📝 Adopciones (/api/adoptions)
GET /adoptions: Ver solicitudes de adopción.

POST /adoptions: Crear una solicitud de adopción.

✨ Funcionalidades Clave
Autenticación: Registro e inicio de sesión de usuarios.

Catálogo de Mascotas: Visualización con paginación (Pagination.jsx).

Gestión de Estados: Las mascotas pueden tener estados (disponible, adoptado, etc.).

Panel de Administración: Componentes dedicados para agregar mascotas (AgregarMascota.jsx) y ver adopciones (AdminAdoptionsPage.jsx).

Validaciones: Validación robusta tanto en frontend como en backend (schemas/validatePets.js, schemas/validateUser.js).
