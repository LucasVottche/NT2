# 🐾 Pet Adoption App — Full Stack (Node + React)

[![Node.js](https://img.shields.io/badge/Node.js-API%20REST-339933?logo=node.js\&logoColor=white)](#)
[![Express](https://img.shields.io/badge/Express-Framework-black?logo=express\&logoColor=white)](#)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?logo=mongodb\&logoColor=white)](#)
[![React](https://img.shields.io/badge/React-Frontend-61DAFB?logo=react\&logoColor=000)](#)

Aplicación web **Full Stack** para gestionar el proceso de adopción de mascotas.
Incluye **API REST** (Node/Express + MongoDB) y **cliente React** con autenticación, catálogo y panel de administración.

---

## 📌 Tabla de Contenidos

* [Características](#-características)
* [Arquitectura](#-arquitectura)
* [Estructura del repositorio](#-estructura-del-repositorio)
* [Stack tecnológico](#-stack-tecnológico)
* [Instalación y ejecución](#-instalación-y-ejecución)
* [Variables de entorno](#-variables-de-entorno)
* [API y Postman](#-api-y-postman)
* [Endpoints principales](#-endpoints-principales)
* [Scripts útiles](#-scripts-útiles)
* [Roadmap](#-roadmap)
* [Contribución](#-contribución)
* [Autor](#-autor)

---

## ✨ Características

* ✅ **Autenticación**: registro e inicio de sesión.
* ✅ **Catálogo de mascotas**: listado + detalle.
* ✅ **Flujo de estados**: `Disponible → En proceso → Adoptado`.
* ✅ **Panel Admin**: gestión de mascotas, usuarios y solicitudes.
* ✅ **Validación robusta**: doble capa (**Frontend + Joi en Backend**) para integridad de datos.
* ✅ **Testing manual** con **colección de Postman** incluida.

---

## 🧱 Arquitectura

**Monorepo** con dos aplicaciones:

* **Backend**: API REST en `tp-final-wnode/` (Express con `bin/www`).
* **Frontend**: SPA React en `tp-final-wfront/`.

Flujo típico:

1. El usuario interactúa con React.
2. React consume la API (fetch/axios).
3. La API valida (Joi), ejecuta lógica en controllers y persiste en MongoDB.

---

## 🗂️ Estructura del repositorio

```plaintext
/
├── tp-final-wnode/          # 🟢 Backend (API REST)
│   ├── bin/www              # Entry point del servidor
│   ├── controllers/         # Lógica de negocio (Adoptions, Pets, Users)
│   ├── data/                # Acceso a datos + conexión DB
│   ├── routes/              # Definición de endpoints
│   ├── schemas/             # Validaciones (Joi)
│   └── tp2.postman...json   # Colección de Postman
│
└── tp-final-wfront/         # 🔵 Frontend (React Client)
    ├── public/              # Assets públicos
    └── src/
        ├── components/      # Componentes React (Home, Login, Pet, etc.)
        ├── assets/          # Estilos / recursos gráficos
        └── lib/             # Utilidades, servicios, constantes
```

---

## 🧰 Stack tecnológico

### Backend

* Node.js + Express
* MongoDB (local o Atlas)
* Joi (validación)
* Ruteo por módulos + Controllers

### Frontend

* React
* React Router
* Estilos en `assets/` (y/o CSS Modules según tu implementación)
* `lib/` para helpers, services, constantes

---

## 🚀 Instalación y ejecución

### Prerrequisitos

* **Node.js** v14+
* **npm**
* **MongoDB** local o **MongoDB Atlas**

### 1) Backend (API)

```bash
cd tp-final-wnode
npm install
npm start
```

Por defecto el backend corre en:

* `http://localhost:3000`

> Desarrollo (opcional):

```bash
nodemon bin/www
```

### 2) Frontend (React)

Abrí otra terminal:

```bash
cd tp-final-wfront
npm install
npm start
```

La app abre en:

* `http://localhost:3000` (si está libre)
* o `http://localhost:3001` (si el 3000 ya lo usa el backend)

✅ Recomendación práctica:

* Backend en **3000**
* Frontend en **3001** (o el puerto que te asigne React)

---

## 🔐 Variables de entorno

> Si ya tenés conexión hardcodeada en `data/conn.js`, esto es opcional.
> Si querés dejarlo prolijo para GitHub, lo ideal es usar `.env`.

### Backend (`tp-final-wnode/.env`)

```env
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/pet_adoption
JWT_SECRET=change_me
CORS_ORIGIN=http://localhost:3001
```

### Frontend (`tp-final-wfront/.env`)

```env
REACT_APP_API_URL=http://localhost:3000
```

> Tip: si usás Create React App, recordá que las variables deben empezar con `REACT_APP_`.

---

## 📡 API y Postman

Podés importar la colección incluida en el backend para probar los endpoints:

* `tp-final-wnode/tp2.postman_collection.json` (o el nombre equivalente en tu repo)

Pasos:

1. Abrí Postman.
2. **Import** → seleccioná el JSON.
3. Ejecutá requests y validá respuestas.

---

## 🔎 Endpoints principales

> Los paths pueden variar según tu router; la idea base es esta.

### 🐶 Mascotas (`/api/pets`)

* `GET /api/pets` → listar todas las mascotas.
* `GET /api/pets/:id` → ver detalle.
* `POST /api/pets` → crear nueva mascota (**requiere permisos**).

### 👤 Usuarios (`/api/users`)

* `POST /api/users/register` → registro.
* `POST /api/users/login` → autenticación.

### 📝 Adopciones (`/api/adoptions`)

* `POST /api/adoptions` → crear solicitud.
* `GET /api/adoptions` → ver solicitudes (**admin**).

---

## 🧪 Scripts útiles

### Backend

```bash
npm start
# o
nodemon bin/www
```

### Frontend

```bash
npm start
npm run build
```

---

## 🧭 Roadmap

* [ ] Tests (unit + integration)
* [ ] Roles/permisos más granulares (RBAC)
* [ ] Logs + manejo centralizado de errores
* [ ] Deploy con variables de entorno (Render/Vercel + Mongo Atlas)
* [ ] Seguridad: rate limiting, helmet, refresh tokens

---

## 🤝 Contribución

1. Fork del repo.
2. Crear rama: `git checkout -b feature/nombre`.
3. Commit: `git commit -m "feat: ..."`.
4. Push: `git push origin feature/nombre`.
5. Pull Request.

---

## 👤 Autor

* Lucas Vottche — (agregá tu GitHub/LinkedIn acá)
