🐾 Sistema de Gestión de Adopciones – Pet Adoption App

Aplicación web Full Stack para gestionar el proceso de adopción de mascotas.

Los usuarios pueden registrarse, iniciar sesión, ver mascotas disponibles y crear solicitudes de adopción.

Los administradores pueden gestionar el catálogo de animales y revisar las solicitudes.

El sistema está dividido en dos partes principales:

🛠️ Backend (tp-final-wnode): API RESTful construida con Node.js + Express

🎨 Frontend (tp-final-wfront): Cliente web interactivo construido con React

🚀 Tecnologías Utilizadas
Backend (tp-final-wnode)

Node.js + Express – Servidor y lógica de negocio

MongoDB – Base de datos NoSQL (via Mongoose o driver nativo)

Joi – Validación de datos mediante schemas

EJS – Motor de plantillas para vistas básicas (ej. página de error / index)

Frontend (tp-final-wfront)

React.js – Construcción de la interfaz de usuario

CSS Modules – Estilos modulares, scoped por componente

React Router – Navegación tipo SPA (Single Page Application)

📂 Estructura del Proyecto
/
├── tp-final-wnode/           # Backend (API REST)
│   ├── bin/www               # Punto de entrada del servidor
│   ├── controllers/          # Lógica de endpoints (Adoptions, Pets, Users)
│   ├── data/                 # Conexión a la DB y capa de datos
│   ├── routes/               # Definición de rutas de la API
│   ├── schemas/              # Validaciones con Joi
│   └── tp2.postman*.json     # Colección de Postman para pruebas
│
└── tp-final-wfront/          # Frontend (Cliente React)
    ├── public/               # Archivos estáticos
    └── src/
        ├── components/       # Componentes (Home, Login, Pet, etc.)
        ├── assets/           # Imágenes y estilos (CSS Modules)
        └── lib/              # Utilidades, helpers y constantes

🛠️ Instalación y Configuración
✅ Prerrequisitos

Node.js v14 o superior

npm

MongoDB (instancia local o una URI remota)

1️⃣ Backend – tp-final-wnode

Entrar a la carpeta e instalar dependencias:

cd tp-final-wnode
npm install


Configurar variables de entorno:

Revisar data/conn.js para la configuración de la base de datos.

Si el proyecto usa .env, crear un archivo .env en la raíz de tp-final-wnode, por ejemplo:

PORT=3000
MONGO_URI=mongodb://localhost:27017/pet_adoption


Iniciar el servidor:

# Modo estándar
npm start

# O en desarrollo (si usás nodemon)
nodemon bin/www


Por defecto, el backend corre en http://localhost:3000 (o el puerto definido en bin/www / PORT).

2️⃣ Frontend – tp-final-wfront

En otra terminal, instalar e iniciar el cliente:

cd tp-final-wfront
npm install
npm start


La app React se abrirá en el navegador en http://localhost:3000
(o en http://localhost:3001 si el 3000 ya está siendo usado por el backend).

📡 Documentación de la API

El backend expone varios recursos principales.
Podés importar el archivo tp2.postman_collection.json (en la carpeta del backend) en Postman para probar todos los endpoints.

🔗 A modo de referencia, se asume un prefijo base como /api.

🐶 Mascotas – /api/pets

GET /pets – Obtener lista de mascotas disponibles

POST /pets – Crear una nueva mascota (Admin)

GET /pets/:id – Obtener detalle de una mascota

👤 Usuarios – /api/users

POST /users/register – Registrar un nuevo usuario

POST /users/login – Iniciar sesión de usuario

📝 Adopciones – /api/adoptions

GET /adoptions – Listar solicitudes de adopción

POST /adoptions – Crear una nueva solicitud de adopción

✨ Funcionalidades Clave

🔐 Autenticación de usuarios
Registro e inicio de sesión para manejar solicitudes de forma segura.

🐾 Catálogo de Mascotas con paginación
Visualización de mascotas con componentes dedicados (ej. Pagination.jsx).

🔄 Gestión de estados de mascotas
Estados como: disponible, adoptado, etc.

📊 Panel de Administración

Alta de mascotas (AgregarMascota.jsx)

Gestión de solicitudes (AdminAdoptionsPage.jsx)

✅ Validaciones en frontend y backend

Backend: schemas (ej. schemas/validatePets.js, schemas/validateUser.js)

Frontend: validaciones antes de enviar formularios
