const conn = require("./conn"); // Importamos el archivo corregido arriba
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const constants = require("../lib/constants");
const { ObjectId } = require("mongodb");
const errors = require("../lib/errors");

// Esta función llama a conn.dataAccess.
// Si conn.js está bien, esto dejará de fallar.
async function dataAccess() {
  return await conn.dataAccess(constants.DATABASE, constants.USERS);
}

// GET: Listar usuarios (Corregido con ordenamiento)
async function getAllUsers(pageSize, page) {
  const collection = await dataAccess(); // Llama a la función local de arriba
  const totalUsers = await collection.countDocuments();

  const users = await collection
    .find({})
    .sort({ _id: -1 })
    .limit(parseInt(pageSize)) // Aseguramos que sea número
    .skip(parseInt(pageSize) * parseInt(page))
    .toArray();

  return { totalUsers, users };
}
async function addUser(user) {
  const collection = await dataAccess();

  // Validar si ya existe el email
  const existingUser = await collection.findOne({ email: user.email });
  if (existingUser) {
    throw new Error("Este mail ya se encuentra registrado.");
  }

  // Encriptar password
  user.password = await bcrypt.hash(user.password, 8);

  const result = await collection.insertOne(user);
  return result;
}

async function findByCredentials(email, password) {
  const collection = await dataAccess();
  const user = await collection.findOne({ email: email });

  if (!user) {
    throw new Error("Credenciales inválidas");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Credenciales inválidas");
  }
  return user;
}

async function getUserByEmail(email) {
  const collection = await dataAccess();
  const user = await collection.findOne({ email: email });
  return !!user;
}

async function getUser(id) {
  const collection = await dataAccess();
  const user = await collection.findOne({ _id: new ObjectId(id) });
  return user;
}

function generateAuthToken(user) {
  const token = jwt.sign(
    {
      _id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
    },
    process.env.CLAVE_SECRETA || process.env.JWT_SECRET,
    { expiresIn: "2h" }
  );
  return token;
}

module.exports = {
  addUser,
  findByCredentials,
  generateAuthToken,
  getUser,
  getAllUsers,
};
