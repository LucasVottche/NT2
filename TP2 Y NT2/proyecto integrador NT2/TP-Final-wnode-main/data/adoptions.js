const conn = require("./conn");
const { ObjectId } = require("mongodb");
const constants = require("../lib/constants.js");
const petsData = require("../data/pets.js");
const usersData = require("../data/users.js");
const emailService = require("../lib/emailService");

async function dataAccess() {
  return await conn.dataAccess(constants.DATABASE, constants.ADOPTIONS);
}

// GET: Traer adopciones para el Admin
async function getAdoptions() {
  // Traemos un número grande para listar todas
  const pets = await petsData.getAdopciones(100, 0); 
  return pets.pets; 
}

// SOLICITAR ADOPCIÓN
async function addAdoption(petId, adopterId) {
  try {
    if (!petId || !adopterId) throw new Error("Datos incompletos");

    const pet = await petsData.getPet(petId);
    
    // Obtenemos el usuario con validación
    let adopter = null;
    try {
      adopter = await usersData.getUser(adopterId);
    } catch (error) {
      console.error("Error al buscar usuario en solicitud:", error);
    }

    if (!pet) throw new Error("La mascota no existe");
    if (pet.status !== "available") throw new Error("Mascota no disponible");
    if (!adopter) throw new Error("Usuario no encontrado");

    const newAdoption = {
      ...pet,
      status: "awaiting",
      adopter: adopterId,
    };

    // Actualizamos la base de datos
    const result = await petsData.updatePet(petId, newAdoption);

    if (!result) throw new Error("No se pudo actualizar la mascota");

    // Envío de Email (No bloqueante)
    if (adopter && adopter.email && typeof emailService.sendAdoptionEmail === 'function') {
      emailService.sendAdoptionEmail(
        adopter.email, 
        adopter.firstName || "Adoptante", 
        pet.name
      ).catch(e => console.error("Error mail solicitud:", e));
    }

    return { status: 200, message: "Solicitud enviada", pet: newAdoption };

  } catch (error) {
    throw error;
  }
}

// APROBAR ADOPCIÓN (Corregido para evitar Error 500)
async function approveAdoption(id) {
  try {
    if (!id || !ObjectId.isValid(id)) throw new Error("ID inválido");

    const pet = await petsData.getPet(id);
    if (!pet) throw new Error("La mascota no existe");
    if (pet.status !== "awaiting") throw new Error("No hay solicitud pendiente");

    // 1. Buscamos al adoptante de forma segura
    // Usamos try/catch interno para que si el usuario no existe, NO falle la aprobación
    let adopter = null;
    if (pet.adopter) {
        try {
            adopter = await usersData.getUser(pet.adopter);
        } catch (e) {
            console.warn("Advertencia: No se pudo recuperar datos del adoptante, pero se aprobará igual.");
        }
    }

    const approveAdoption = {
      ...pet,
      status: "adopted",
    };

    // 2. Actualizamos la BD (Paso Crítico)
    const result = await petsData.updatePet(id, approveAdoption);

    if (!result) throw new Error("Error al actualizar mascota en base de datos");

    // 3. Enviamos el Email (Paso Secundario)
    // Verificamos explícitamente que la función exista para evitar crashes
    if (adopter && adopter.email && typeof emailService.sendApprovalEmail === 'function') {
      emailService.sendApprovalEmail(
        adopter.email,
        adopter.firstName || "Adoptante",
        pet.name
      ).catch(e => console.error("Error asíncrono enviando mail aprobación:", e));
    }

    return { status: 200, message: "Adopción aprobada", pet: approveAdoption };

  } catch (error) {
    // Si falla algo crítico, lanzamos el error para que el controller mande el 500 real
    throw error;
  }
}

// RECHAZAR ADOPCIÓN
async function rejectAdoption(id) {
  try {
    if (!id || !ObjectId.isValid(id)) throw new Error("ID inválido");

    const pet = await petsData.getPet(id);
    if (!pet) throw new Error("La mascota no existe");

    const rejectedAdoption = {
      ...pet,
      status: "rejected",
    };

    const result = await petsData.updatePet(id, rejectedAdoption);

    if (!result) throw new Error("Error al actualizar");

    return { status: 200, message: "Adopción rechazada", pet: rejectedAdoption };

  } catch (error) {
    throw error;
  }
}

// BORRAR/RESETEAR ADOPCIÓN
async function deleteAdoption(id) {
  try {
    if (!id || !ObjectId.isValid(id)) throw new Error("ID inválido");

    const pet = await petsData.getPet(id);
    if (!pet) throw new Error("La mascota no existe");

    const resetPet = {
      name: pet.name,
      specie: pet.specie,
      race: pet.race,
      gender: pet.gender,
      age: pet.age,
      description: pet.description,
      province: pet.province,
      status: "available",
      adopter: null, // Limpiamos el campo adopter
      isCastrated: pet.isCastrated // Mantenemos el estado de castración
    };

    const result = await petsData.updatePet(id, resetPet);

    if (!result) throw new Error("Error al resetear");

    return { status: 200, message: "Adopción reseteada", pet: resetPet };

  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAdoptions,
  addAdoption,
  approveAdoption,
  rejectAdoption,
  deleteAdoption,
};