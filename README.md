# 🐾 Pet Adoption App — Full Stack (Node + React)

[![Node.js](https://img.shields.io/badge/Node.js-API%20REST-339933?logo=node.js&logoColor=white)](#)
[![Express](https://img.shields.io/badge/Express-Framework-black?logo=express&logoColor=white)](#)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?logo=mongodb&logoColor=white)](#)
[![React](https://img.shields.io/badge/React-Frontend-61DAFB?logo=react&logoColor=000)](#)

Aplicación web **Full Stack** para gestionar el proceso de adopción de mascotas.  
Incluye **API REST** (Node/Express + MongoDB) y **cliente React** con autenticación, catálogo y panel de administración.

---

## 📌 Tabla de Contenidos
- [Características](#-características)
- [Arquitectura](#-arquitectura)
- [Estructura del repositorio](#-estructura-del-repositorio)
- [Stack tecnológico](#-stack-tecnológico)
- [Instalación y ejecución](#-instalación-y-ejecución)
- [Variables de entorno](#-variables-de-entorno)
- [API y Postman](#-api-y-postman)
- [Endpoints principales](#-endpoints-principales)
- [Scripts útiles](#-scripts-útiles)
- [Roadmap](#-roadmap)
- [Contribución](#-contribución)

---

## ✨ Características
- ✅ **Autenticación**: registro e inicio de sesión
- ✅ **Catálogo de mascotas**: listado + detalle
- ✅ **Flujo de estados**: `Disponible → En proceso → Adoptado`
- ✅ **Panel Admin**: gestión de mascotas, usuarios y solicitudes
- ✅ **Validación robusta**: doble capa (**Frontend + Joi en Backend**)
- ✅ **Testing manual** con **colección de Postman** incluida

---

## 🧱 Arquitectura
**Monorepo** con dos apps:

- **Backend**: API REST en `tp-final-wnode/` (Express con `bin/www`)
- **Frontend**: SPA React en `tp-final-wfront/`

Flujo típico:
1. El usuario interactúa con React
2. React consume la API (fetch/axios)
3. La API valida (Joi), ejecuta lógica en controllers y persiste en MongoDB

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


