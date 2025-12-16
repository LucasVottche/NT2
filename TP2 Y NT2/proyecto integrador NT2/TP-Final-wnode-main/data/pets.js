const { ObjectId } = require("mongodb");
const conn = require("./conn");
const constants = require("../lib/constants");

async function dataAccess() {
  return await conn.dataAccess(constants.DATABASE, constants.PETS);
}

// Función auxiliar para normalizar mascota (asegurar isCastrated)
const normalizePet = (pet) => {
  if (!pet) return null;
  return {
    ...pet,
    isCastrated: pet.isCastrated === true // Si existe es true, si no (undefined/null/false) es false
  };
};

async function getAllPets(pageSize, page) {
  const collection = await dataAccess();
  const totalPets = await collection.countDocuments();
  const limit = parseInt(pageSize);
  const skip = parseInt(page) * limit;

  const petsCursor = await collection
    .find({})
    .sort({ _id: -1 })
    .limit(limit)
    .skip(skip)
    .toArray();

  // Normalizamos para asegurar que el campo exista en el JSON
  const pets = petsCursor.map(normalizePet);

  return { totalPets, pets };
}

async function getAdoptables(pageSize, page) {
  const collection = await dataAccess();
  const query = { status: "available" };
  const totalPets = await collection.countDocuments(query);
  const limit = parseInt(pageSize);
  const skip = parseInt(page) * limit;

  const petsCursor = await collection
    .find(query)
    .sort({ _id: -1 })
    .limit(limit)
    .skip(skip)
    .toArray();

  const pets = petsCursor.map(normalizePet);

  return { totalPets, pets };
}

async function getAdopciones(pageSize, page) {
  const collection = await dataAccess();
  const query = { status: { $ne: "available" } };
  const totalPets = await collection.countDocuments(query);
  const limit = parseInt(pageSize);
  const skip = parseInt(page) * limit;

  const petsCursor = await collection
    .find(query)
    .sort({ _id: -1 })
    .limit(limit)
    .skip(skip)
    .toArray();

  const pets = petsCursor.map(normalizePet);

  return { totalPets, pets };
}

async function getPet(id) {
  const collection = await dataAccess();
  const pet = await collection.findOne({ _id: new ObjectId(id) });
  return normalizePet(pet);
}

async function addPet(pet) {
  const collection = await dataAccess();
  // Aseguramos que se guarde el booleano
  const petToSave = {
      ...pet,
      isCastrated: pet.isCastrated === true
  };
  const result = await collection.insertOne(petToSave);
  return result;
}

async function updatePet(id, pet) {
  const collection = await dataAccess();
  const filter = { _id: new ObjectId(id) };
  
  // Aseguramos booleano en update también si viene en el payload
  if (typeof pet.isCastrated !== 'undefined') {
      pet.isCastrated = pet.isCastrated === true || pet.isCastrated === "true";
  }
  
  const update = { $set: pet };
  const result = await collection.findOneAndUpdate(filter, update, {
    returnDocument: "after",
  });
  return result;
}

async function deletePet(id) {
  const collection = await dataAccess();
  const filter = { _id: new ObjectId(id) };
  const result = await collection.findOneAndDelete(filter);
  return result;
}
async function getPetsByUserId(userId) {
  const collection = await dataAccess();
  // Buscamos mascotas donde el campo 'adopter' coincida con el ID del usuario
  // y que el estado no sea 'rejected' (opcional, depende si quieres mostrar el historial de rechazos)
  const query = { adopter: userId }; 
  
  const pets = await collection
    .find(query)
    .sort({ _id: -1 })
    .toArray();
    
  // Reutilizamos la lógica de conteo si quieres paginación, 
  // pero para "Mis Mascotas" suele bastar con un array simple.
  return { totalPets: pets.length, pets };
}

module.exports = {
  getAllPets,
  getPet,
  addPet,
  updatePet,
  deletePet,
  getAdoptables,
  getAdopciones,
  getPetsByUserId,
};