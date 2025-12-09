require('dotenv').config(); // Carga las variables del archivo .env
const { MongoClient } = require('mongodb');

// Leemos la dirección de la base de datos desde el .env
const uri = process.env.CONNECTION_STRING;

if (!uri) {
  console.error("ERROR: No se encontró la variable CONNECTION_STRING en el archivo .env");
}

const client = new MongoClient(uri);

let instance = null;

async function getConnection() {
  if (instance == null) {
    try {
      // Conectamos a la base de datos
      instance = await client.connect();
      console.log("Conexión a MongoDB establecida exitosamente.");
    } catch (err) {
      console.error("Error al conectar con MongoDB:", err.message);
      throw err;
    }
  }
  return instance;
}

// Exportamos la función para que users.js la pueda usar
module.exports = { getConnection };