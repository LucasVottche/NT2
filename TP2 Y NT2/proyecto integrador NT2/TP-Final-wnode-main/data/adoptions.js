const conn = require('./conn');
const { ObjectId } = require('mongodb');

// Función para traer las mascotas que están esperando adopción
async function getAdoptions() {
    const connection = await conn.getConnection();
    // Buscamos mascotas con estado "awaiting" (pendiente de adopción)
    // Si en tu base de datos usas otro nombre (ej: "pendiente"), cámbialo aquí.
    const adoptions = await connection
        .db("TpFinalNT2")
        .collection("pets")
        .find({ status: "awaiting" }) 
        .toArray();
    return adoptions;
}

async function addAdoption(petId, adopterId) {
    const connection = await conn.getConnection();
    // Aquí marcamos la mascota como "awaiting" para que aparezca en la lista
    const result = await connection
        .db("TpFinalNT2")
        .collection("pets")
        .updateOne(
            { _id: new ObjectId(petId) },
            { $set: { status: "awaiting", adopter: new ObjectId(adopterId) } }
        );
    return result;
}

async function approveAdoption(id) {
    const connection = await conn.getConnection();
    const result = await connection
        .db("TpFinalNT2")
        .collection("pets")
        .updateOne(
            { _id: new ObjectId(id) }, // CLAVE: Convertir string a ObjectId
            { $set: { status: "adopted" } }
        );
    return result;
}

async function rejectAdoption(id) {
    const connection = await conn.getConnection();
    // Al rechazar, la devolvemos a estado "available" para que otro la pueda adoptar
    const result = await connection
        .db("TpFinalNT2")
        .collection("pets")
        .updateOne(
            { _id: new ObjectId(id) },
            { $set: { status: "available", adopter: null } }
        );
    return result;
}

async function deleteAdoption(id) {
    const connection = await conn.getConnection();
    // Eliminar la mascota de la base de datos (si eso es lo que quieres hacer)
    const result = await connection
        .db("TpFinalNT2")
        .collection("pets")
        .deleteOne({ _id: new ObjectId(id) });
    return result;
}

module.exports = {
    getAdoptions,
    addAdoption,
    approveAdoption,
    rejectAdoption,
    deleteAdoption
};