const conn = require("./conn");
const { ObjectId } = require("mongodb");
const constants = require("../lib/constants.js");
const petsData = require("../data/pets.js");
const usersData = require("../data/users.js");

// Mantenemos la conexión estándar por si en el futuro decides guardar un historial separado
async function dataAccess() {
	return await conn.dataAccess(constants.DATABASE, constants.ADOPTIONS);
}

// SOLICITAR ADOPCIÓN (Pasa a estado 'awaiting')
async function addAdoption(petId, adopterId) {
	try {
		if (!petId || !adopterId) {
			throw new Error("petId y adopterId son necesarios");
		}

		const pet = await petsData.getPet(petId);
		const adopter = await usersData.getUser(adopterId);

		if (!pet) {
			throw new Error("La mascota no existe");
		} else if (pet.status != "available") {
			throw new Error("La mascota no está disponible");
		} else if (!adopter) {
			throw new Error("Usuario no encontrado");
		} else {
			const newAdoption = {
				...pet, // Mantenemos los datos originales
				status: "awaiting",
				adopter: adopterId,
			};

			// Actualizamos usando la función de petsData
			const petAdoption = await petsData.updatePet(petId, newAdoption);

			// Manejo de respuesta compatible con updatePet
			if (!petAdoption) {
				const notUpdatedError = new Error("No se pudo actualizar la mascota");
				notUpdatedError.status = 404;
				throw notUpdatedError;
			} else {
				return {
					status: 200,
					message: "Solicitud de adopción enviada",
					pet: newAdoption,
				};
			}
		}
	} catch (error) {
		throw new Error("No se pudo realizar la adopción: " + error);
	}
}

// APROBAR ADOPCIÓN (Pasa a estado 'adopted')
async function approveAdoption(id) {
	try {
		if (!id) {
			throw new Error("El ID es necesario");
		} else if (!ObjectId.isValid(id)) {
			throw new Error("El ID no es válido");
		}

		const pet = await petsData.getPet(id);

		if (!pet) {
			throw new Error("La mascota no existe");
		} else if (pet.status == "adopted") {
			throw new Error("La adopción ya fue aprobada anteriormente");
		} else if (pet.status != "awaiting") {
			throw new Error("La mascota no tiene una solicitud pendiente para aprobar");
		} else {
			const approveAdoption = {
				...pet,
				status: "adopted",
				// El adopter ya viene seteado del paso anterior
			};

			const petAdoption = await petsData.updatePet(id, approveAdoption);

			if (!petAdoption) {
				throw new Error("No se pudo actualizar la mascota");
			} else {
				return {
					status: 200,
					message: "Adopción aprobada exitosamente",
					pet: approveAdoption,
				};
			}
		}
	} catch (error) {
		throw new Error("Error al aprobar adopción: " + error);
	}
}

// RECHAZAR ADOPCIÓN (Pasa a estado 'rejected')
async function rejectAdoption(id) {
	try {
		if (!id || !ObjectId.isValid(id)) {
			throw new Error("ID inválido");
		}

		const pet = await petsData.getPet(id);

		if (!pet) {
			throw new Error("La mascota no existe");
		} else if (pet.status == "rejected") {
			throw new Error("La adopción ya fue rechazada");
		} else {
			const rejectedAdoption = {
				...pet,
				status: "rejected",
			};

			const petAdoption = await petsData.updatePet(id, rejectedAdoption);

			if (!petAdoption) {
				throw new Error("No se pudo actualizar la mascota");
			} else {
				return {
					status: 200,
					message: "Adopción rechazada",
					pet: rejectedAdoption,
				};
			}
		}
	} catch (error) {
		throw new Error("Error al rechazar adopción: " + error);
	}
}

// BORRAR/RESETEAR ADOPCIÓN (Vuelve a estado 'available')
async function deleteAdoption(id) {
	try {
		if (!id || !ObjectId.isValid(id)) {
			throw new Error("ID inválido");
		}

		const pet = await petsData.getPet(id);

		if (!pet) {
			throw new Error("La mascota no existe");
		} else if (pet.status == "available") {
			throw new Error("La adopción ya está borrada (la mascota está disponible)");
		} else {
			// Reseteamos la mascota
			const resetPet = {
				name: pet.name,
				specie: pet.specie,
				race: pet.race,
				gender: pet.gender,
				age: pet.age,
				description: pet.description,
				province: pet.province,
				status: "available",
				// Removemos el campo adopter
				adopter: null 
			};

			// Nota: updatePet usa $set, para borrar adopter en Mongo a veces se necesita $unset,
			// pero setearlo a null suele funcionar para la lógica del frontend.
			const petAdoption = await petsData.updatePet(id, resetPet);

			if (!petAdoption) {
				throw new Error("No se pudo resetear la mascota");
			} else {
				return {
					status: 200,
					message: "Adopción reseteada, mascota disponible nuevamente",
					pet: resetPet,
				};
			}
		}
	} catch (error) {
		throw new Error("Error al borrar adopción: " + error);
	}
}

module.exports = {
	addAdoption,
	approveAdoption,
	rejectAdoption,
	deleteAdoption,
};