const { ObjectId } = require("mongodb");
const conn = require("./conn");

// Función auxiliar para conectar a la colección 'pets'
async function getCollection() {
  const client = await conn.getConnection();
  return client.db("TpFinalNT2").collection("pets");
}

// http://localhost:5000/api/pets/
async function getAllPets(pageSize, page) {
  const collection = await getCollection();
  const totalPets = await collection.countDocuments();

  const pets = await collection
    .find({})
    .sort({ _id: -1 })
    .limit(pageSize)
    .skip(pageSize * page)
    .toArray();
  return { totalPets, pets };
}

// http://localhost:5000/api/pets/adoptables/
async function getAdoptables(pageSize, page) {
  const collection = await getCollection();
  const totalPets = await collection.countDocuments({ status: "available" });

  const pets = await collection
    .find({ status: "available" })
    .sort({ _id: -1 })
    .limit(pageSize)
    .skip(pageSize * page)
    .toArray();
  return { totalPets, pets };
}

// http://localhost:5000/api/pets/adopciones/
async function getAdopciones(pageSize, page) {
  const collection = await getCollection();
  // Buscamos mascotas que NO estén disponibles (o sea, adoptadas o en espera)
  const totalPets = await collection.countDocuments({ status: { $ne: "available" } });

  const pets = await collection
    .find({ status: { $ne: "available" } })
    .sort({ _id: -1 })
    .limit(pageSize)
    .skip(pageSize * page)
    .toArray();
  return { totalPets, pets };
}

// http://localhost:5000/api/pets/ID
async function getPet(id) {
  const collection = await getCollection();
  const pet = await collection.findOne({ _id: new ObjectId(id) });
  return pet;
}

// http://localhost:5000/api/pets/addPet
async function addPet(pet) {
  const collection = await getCollection();
  // Valor por defecto si no viene el status
  if (!pet.status) {
      pet.status = "available";
  }
  const result = await collection.insertOne(pet);
  return result;
}

// http://localhost:5000/api/pets/updatePet/ID
async function updatePet(id, pet) {
  const collection = await getCollection();
  const filter = { _id: new ObjectId(id) };
  const update = { $set: pet };
  
  const result = await collection.findOneAndUpdate(filter, update, {
    returnDocument: 'after', 
  });

  return result;
}

// http://localhost:5000/api/pets/deletePet/ID
async function deletePet(id) {
  const collection = await getCollection();
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
  getAdopciones
};