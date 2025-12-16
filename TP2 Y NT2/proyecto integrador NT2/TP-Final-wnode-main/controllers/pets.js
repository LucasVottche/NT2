const pets = require("../data/pets");

async function getAllPets(pageSize, page) {
	return pets.getAllPets(pageSize, page);
}

async function getAdoptables(pageSize, page) {
	return pets.getAdoptables(pageSize, page);
}
async function getAdopciones(pageSize, page) {
	return pets.getAdopciones(pageSize, page);
}

async function getPet(id) {
	return pets.getPet(id);
}

// Controlador para crear una mascota
async function addPet(req, res) {
	try {
        // 1. Agregamos isCastrated al destructuring
		const { name, specie, race, gender, age, description, province, isCastrated } = req.body;

		if (!(name && specie && race && gender && age && description && province)) {
			throw new Error("Faltan campos obligatorios");
		}

		const newPet = {
			name,
			specie,
			race,
			gender,
			age,
			description,
			province,
            // 2. Lo agregamos al objeto, default false si no viene
            isCastrated: isCastrated === true, 
			status: "available",
		};

		return pets.addPet(newPet);
	} catch (error) {
		throw error;
	}
}

// Controlador para actualizar una mascota por su ID
async function updatePet(req, res) {
	try {
		const petId = req.params.id;
        // 1. Agregamos isCastrated al destructuring
		const { name, specie, race, gender, age, description, province, isCastrated } = req.body;
		
        if (name && specie && race && gender && age && description && province) {
            // 2. Lo agregamos al objeto de actualización
			const pet = { 
                name, 
                specie, 
                race, 
                gender, 
                age, 
                description, 
                province,
                isCastrated: isCastrated === true // Aseguramos booleano
            };
			const updatedPet = await pets.updatePet(petId, pet);
			if (updatedPet) {
				return updatedPet;
			}
		} else {
			return null;
		}
	} catch (error) {
		console.error(error);
		throw error;
	}
}

async function deletePet(req, res) {
	try {
		const petId = req.params.id;
		const petToDelete = await getPet(petId);
		if (petToDelete) {
			const deletedPet = await pets.deletePet(petId);
			if (deletedPet) {
				return res.json(deletedPet);
			}
		} else {
			throw new Error("Pet doesn't exist");
		}
	} catch (error) {
		console.error(error);
		throw error;
	}
}

async function getPetsByUserId(req, res) {
    try {
        const userId = req.params.userid; // Ojo, en express los params suelen ir en minúscula
        const result = await pets.getPetsByUserId(userId);
        res.json(result);
    } catch (error) {
        res.status(500).send("Error al obtener mis mascotas: " + error.message);
    }
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