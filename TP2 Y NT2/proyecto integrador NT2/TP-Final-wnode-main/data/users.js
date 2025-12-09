// data/users.js
const conn = require('./conn');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function getAllUsers(pageSize, page) {
    const connection = await conn.getConnection();
    const users = await connection
        .db("TpFinalNT2")
        .collection("users")
        .find({})
        .limit(pageSize)
        .skip(pageSize * page)
        .toArray();
    return users;
}

async function addUser(user) {
    const connection = await conn.getConnection();
    
    // Encriptamos la contraseña antes de guardarla
    user.password = await bcrypt.hash(user.password, 8);
    
    const result = await connection
        .db("TpFinalNT2")
        .collection("users")
        .insertOne(user);
    return result;
}

async function findByCredentials(email, password) {
    const connection = await conn.getConnection();
    const user = await connection
        .db("TpFinalNT2")
        .collection("users")
        .findOne({ email: email });
        
    if (!user) {
        throw new Error('Credenciales inválidas');
    }
    
    // Verificamos la contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
        throw new Error('Credenciales inválidas');
    }
    
    return user;
}

async function generateAuthToken(user) {
    // AQUÍ ESTÁ LA MAGIA: Agregamos 'firstName' al token
    const token = jwt.sign(
        { 
            _id: user._id, 
            email: user.email, 
            role: user.role, 
            firstName: user.firstName // <--- ESTO FALTABA
        }, 
        process.env.JWT_SECRET, 
        { expiresIn: '2h' }
    );
    return token;
}

module.exports = { addUser, findByCredentials, generateAuthToken, getAllUsers };