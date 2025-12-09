<div align="center">

🐾 Sistema de Gestión de Adopciones

(Pet Adoption App)

<br />

Una solución Full Stack para conectar mascotas con sus futuros hogares.

</div>

📖 Descripción

Este proyecto es una aplicación web completa diseñada para facilitar y gestionar el proceso de adopción de mascotas. El sistema permite a los usuarios explorar un catálogo de animales, registrarse y gestionar sus solicitudes de adopción, mientras proporciona a los administradores herramientas eficientes para controlar el inventario de mascotas y revisar solicitudes.

El sistema está desacoplado en dos arquitecturas principales:

Backend (tp-final-wnode): API RESTful robusta construida con Node.js y Express.

Frontend (tp-final-wfront): SPA (Single Page Application) moderna e interactiva construida con React.js.

📸 Capturas de Pantalla

(Espacio reservado para imágenes de la aplicación. Puedes agregar aquí capturas de la Home, el Login o el detalle de una mascota para que los visitantes vean el proyecto en acción)

Home Page

Detalle de Mascota





🚀 Tecnologías Utilizadas

🛠 Backend

Tecnología

Descripción

Node.js & Express

Entorno de ejecución y framework para la construcción de la API REST.

MongoDB

Base de datos NoSQL para almacenamiento flexible de datos de mascotas y usuarios.

Mongoose

ODM para modelado de datos y gestión de la base de datos.

Joi

Biblioteca para la validación robusta de esquemas de datos.

EJS

Motor de plantillas (utilizado para vistas base del servidor).

💻 Frontend

Tecnología

Descripción

React.js

Biblioteca principal para la construcción de interfaces de usuario dinámicas.

CSS Modules

Metodología de estilos para encapsular el diseño de componentes.

React Router

Gestión de rutas y navegación del lado del cliente.

📂 Estructura del Proyecto

El repositorio sigue una estructura monorepo lógica:

/
├── tp-final-wnode/         # 🟢 Backend (API REST)
│   ├── bin/www             # Entry point del servidor
│   ├── controllers/        # Controladores de lógica de negocio (Adoptions, Pets, Users)
│   ├── data/               # Capa de acceso a datos y conexión DB
│   ├── routes/             # Definición de endpoints de la API
│   ├── schemas/            # Esquemas de validación (Joi)
│   └── tp2.postman...json  # 📄 Colección de Postman para testing
│
└── tp-final-wfront/        # 🔵 Frontend (React Client)
    ├── public/             # Assets estáticos públicos
    └── src/
        ├── components/     # Componentes React reutilizables (Home, Login, Pet, etc.)
        ├── assets/         # Recursos gráficos y hojas de estilo
        └── lib/            # Utilidades, servicios y constantes


🛠️ Instalación y Configuración

Sigue estos pasos para levantar el entorno de desarrollo localmente.

Prerrequisitos

Node.js (v14 o superior)

NPM (Manejador de paquetes)

MongoDB (Instancia local o URI de MongoDB Atlas)

1. Configuración del Backend

cd tp-final-wnode
npm install


Variables de Entorno:
Verifica el archivo data/conn.js para la conexión a la base de datos. Si es necesario, configura un archivo .env en la raíz de tp-final-wnode con:
MONGO_URI=tu_string_de_conexion
PORT=3000

Iniciar Servidor:

npm start
# O con nodemon para desarrollo:
nodemon bin/www


2. Configuración del Frontend

En una nueva terminal:

cd tp-final-wfront
npm install


Iniciar Cliente:

npm start


La aplicación se abrirá en http://localhost:3000 (o 3001 si el puerto 3000 está ocupado).

📡 Documentación de la API

Puedes importar el archivo tp2.postman_collection.json incluido en la carpeta del backend para probar los endpoints.

🔑 Endpoints Clave

Mascotas (/api/pets)

GET /pets: Listar todas las mascotas.

GET /pets/:id: Ver detalle de una mascota.

POST /pets: Crear nueva mascota (Requiere permisos).

Usuarios (/api/users)

POST /users/register: Registro de usuario.

POST /users/login: Autenticación.

Adopciones (/api/adoptions)

POST /adoptions: Crear solicitud de adopción.

GET /adoptions: Ver solicitudes (Admin).

✨ Funcionalidades Destacadas

✅ Autenticación Segura: Registro y Login completos.

✅ Catálogo Interactivo: Visualización de mascotas con paginación integrada.

✅ Estados de Mascota: Control de flujo (Disponible -> En Proceso -> Adoptado).

✅ Panel de Admin: Interfaces exclusivas para gestión de inventario y solicitudes.

✅ Validaciones: Doble capa de validación (Frontend + Backend) para integridad de datos.
