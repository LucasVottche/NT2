import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import PetPage from "./components/Pet/PetPage";
import AdoptPage from "./components/Pet/AdoptPage";
import RegisterPage from "./components/register/RegisterPage";
import Administrator from "./components/administrator/Administrator";
import AdminAdoptionsPage from "./components/Pet/AdminAdoptionsPage";
// 1. IMPORTAMOS LA NUEVA PÁGINA
import MyPetsPage from "./components/Pet/MyPetsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login/" element={<Login />} />
        <Route path="/adopt/" element={<AdoptPage />} />
        <Route path="/adminadopt/" element={<AdminAdoptionsPage />} />
        <Route path="/pets/" element={<PetPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/admin" element={<Administrator />} />
        <Route path="/agregarmascota" element={<Administrator />} />
        
        {/* 2. AGREGAMOS LA RUTA PARA MIS MASCOTAS */}
        <Route path="/mismascotas" element={<MyPetsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;