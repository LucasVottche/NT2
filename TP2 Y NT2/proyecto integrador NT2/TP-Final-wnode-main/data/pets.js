const { ObjectId } = require("mongodb");
const conn = require("./conn");
const constants = require("../lib/constants");

// Usamos la misma conexión estándar que en users.js
async function dataAccess() {
  return await conn.dataAccess(constants.DATABASE, constants.PETS);
}

// GET: Todas las mascotas (Admin)
async function getAllPets(pageSize, page) {
  const collection = await dataAccess();
  const totalPets = await collection.countDocuments();

  const pets = await collection
    .find({})
    .sort({ _id: -1 }) // Orden descendente
    .limit(pageSize)
    .skip(pageSize * page)
    .toArray();
  return { totalPets, pets };
}

// GET: Mascotas disponibles para adoptar
async function getAdoptables(pageSize, page) {
  const collection = await dataAccess();
  const query = { status: "available" };
  const totalPets = await collection.countDocuments(query);

  const pets = await collection
    .find(query)
    .sort({ _id: -1 })
    .limit(pageSize)
    .skip(pageSize * page)
    .toArray();
  return { totalPets, pets };
}

// GET: Mascotas en proceso de adopción o adoptadas
async function getAdopciones(pageSize, page) {
  const collection = await dataAccess();
  const query = { status: { $ne: "available" } }; // Status NO es "available"
  const totalPets = await collection.countDocuments(query);

  const pets = await collection
    .find(query)
    .sort({ _id: -1 })
    .limit(pageSize)
    .skip(pageSize * page)
    .toArray();
  return { totalPets, pets };
}

// Obtener una mascota por ID
async function getPet(id) {
  const collection = await dataAccess();
  const pet = await collection.findOne({ _id: new ObjectId(id) });
  return pet;
}

// Agregar mascota
async function addPet(pet) {
  const collection = await dataAccess();
  const result = await collection.insertOne(pet);
  return result;
}

// Actualizar mascota
async function updatePet(id, pet) {
  const collection = await dataAccess();
  const filter = { _id: new ObjectId(id) };
  const update = { $set: pet };
  const result = await collection.findOneAndUpdate(filter, update, {
    returnDocument: "after", // Devuelve el documento actualizado
  });

  return result;
}

// Eliminar mascota
async function deletePet(id) {
  const collection = await dataAccess();
  const filter = { _id: new ObjectId(id) };
  const result = await collection.findOneAndDelete(filter);

  return result;
}

module.exports = {
  getAllPets,
  getPet,
  addPet,
  updatePet,
  deletePet,
  getAdoptables,
  getAdopciones,
};