require('dotenv').config();
const { MongoClient } = require('mongodb');

// CAMBIO CLAVE: Leer CONNECTION_STRING en lugar de MONGODB
const uri = process.env.CONNECTION_STRING; 

// Verificación de seguridad (opcional pero recomendada)
if (!uri) {
    console.error("ERROR FATAL: No se leyó CONNECTION_STRING del archivo .env");
    process.exit(1);
}

const client = new MongoClient(uri);

let instance = null;

async function getConnection() {
  try {
    if (instance == null) {
      instance = await client.connect();
      console.log('Conexión a MongoDB establecida exitosamente.');
    }
    return instance;
  } catch (error) {
    console.error('Error conectando a la db:', error);
    throw error; 
  }
}

// Función que usan tus controladores
async function dataAccess(database, theCollection) {
  try {
    const connectiondb = await getConnection();
    return connectiondb.db(database).collection(theCollection);
  } catch (error) {
    console.error('Error accediendo a los datos:', error);
    throw error;
  }
}

module.exports = { dataAccess };