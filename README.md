# 🐾 Sistema de Gestión de Adopciones (Pet Adoption App)

![Status](https://img.shields.io/badge/Status-Completado-success)
![Stack](https://img.shields.io/badge/Stack-MERN-blue)

Este proyecto es una aplicación web completa (**Full Stack**) diseñada para facilitar y gestionar el proceso de adopción de mascotas. El sistema permite a los usuarios explorar un catálogo de animales, registrarse y gestionar sus solicitudes, mientras que ofrece a los administradores herramientas eficientes para controlar el inventario de mascotas.

El sistema utiliza una arquitectura de **Monorepo lógico** dividido en dos partes principales:

* **Backend (`tp-final-wnode`):** API RESTful robusta construida con Node.js y Express.
* **Frontend (`tp-final-wfront`):** Single Page Application (SPA) moderna e interactiva construida con React.js.

---

## 🚀 Tecnologías Utilizadas

### Backend
* ![NodeJS](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white) **Node.js & Express:** Entorno de ejecución y framework para la construcción de la API REST.
* ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white) **MongoDB:** Base de datos NoSQL (gestionada vía Mongoose).
* **Mongoose:** ODM para modelado de datos.
* **Joi:** Biblioteca para validación estricta de esquemas de datos.
* **EJS:** Motor de plantillas (utilizado para vistas base del servidor).

### Frontend
* ![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB) **React.js:** Biblioteca principal para la construcción de interfaces de usuario dinámicas.
* **React Router:** Gestión de rutas y navegación del lado del cliente.
* **CSS Modules:** Metodología de estilos para encapsular el diseño de componentes.

---

## 📂 Estructura del Proyecto

El repositorio sigue una estructura organizada separando claramente cliente y servidor:

```text
/
├── tp-final-wnode/          # 🟢 Backend (API REST)
│   ├── bin/www              # Entry point del servidor
│   ├── controllers/         # Controladores de lógica de negocio (Adoptions, Pets, Users)
│   ├── data/                # Capa de acceso a datos y conexión DB
│   ├── routes/              # Definición de endpoints de la API
│   ├── schemas/             # Esquemas de validación (Joi)
│   └── tp2.postman...json   # Colección de Postman para testing
│
└── tp-final-wfront/         # 🔵 Frontend (React Client)
    ├── public/              # Assets estáticos públicos
    └── src/
        ├── components/      # Componentes React reutilizables (Home, Login, Pet, etc.)
        ├── assets/          # Recursos gráficos y hojas de estilo
        └── lib/             # Utilidades, servicios y constantes



🛠️ Instalación y Configuración
Sigue estos pasos para levantar el entorno de desarrollo localmente.

Prerrequisitos
Node.js (v14 o superior)

NPM (Manejador de paquetes)

MongoDB (Instancia local o URI de MongoDB Atlas)

1. Configuración del Backend
Navega a la carpeta del servidor e instala las dependencias:

Bash

cd tp-final-wnode
npm install
Variables de Entorno: Revisa el archivo data/conn.js para la conexión a la base de datos. Si es necesario, configura un archivo .env en la raíz de tp-final-wnode con: MONGO_URI=tu_string_de_conexion PORT=3000

Iniciar Servidor:

Bash

# Modo estándar
npm start

# O con nodemon para desarrollo:
nodemon bin/www
El servidor correrá por defecto en http://localhost:3000.

2. Configuración del Frontend
En una nueva terminal, navega a la carpeta del cliente e instala las dependencias:

Bash

cd tp-final-wfront
npm install
Iniciar Cliente:

Bash

npm start
La aplicación se abrirá en http://localhost:3000 (o 3001 si el puerto 3000 está ocupado).

📡 Documentación de la API
Puedes importar el archivo tp2.postman_collection.json incluido en la carpeta del backend para probar los endpoints.

Endpoints Clave
🐶 Mascotas (/api/pets)
GET /pets - Listar todas las mascotas.

GET /pets/:id - Ver detalle de una mascota.

POST /pets - Crear una nueva mascota (Requiere permisos).

👤 Usuarios (/api/users)
POST /users/register - Registro de usuario.

POST /users/login - Autenticación.

📝 Adopciones (/api/adoptions)
POST /adoptions - Crear solicitud de adopción.

GET /adoptions - Ver solicitudes (Admin).

✨ Funcionalidades Destacadas
✅ Autenticación Segura: Registro y Login completos.

✅ Catálogo Interactivo: Visualización de mascotas con paginación integrada.

✅ Estados de Mascota: Control de flujo (Disponible -> En Proceso -> Adoptado).

✅ Panel de Admin: Interfaces exclusivas para gestión de inventario y solicitudes.

✅ Validaciones: Doble capa de validación (Frontend + Backend) para integridad de datos.
