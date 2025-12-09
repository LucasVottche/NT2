const adoptionsData = require('../data/adoptions');

async function getAdoptions(req, res) {
    try {
        const result = await adoptionsData.getAdoptions();
        res.json(result);
    } catch (error) {
        res.status(500).send("Error al obtener adopciones: " + error.message);
    }
}

async function addAdoption(petId, adopterId) {
    return await adoptionsData.addAdoption(petId, adopterId);
}

async function approveAdoption(id) {
    return await adoptionsData.approveAdoption(id);
}

async function rejectAdoption(id) {
    return await adoptionsData.rejectAdoption(id);
}

async function deleteAdoption(id) {
    return await adoptionsData.deleteAdoption(id);
}

module.exports = {
    getAdoptions,
    addAdoption,
    approveAdoption,
    rejectAdoption,
    deleteAdoption
};