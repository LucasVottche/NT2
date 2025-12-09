const express = require("express");
const router = express.Router();
const controller = require("../controllers/pets");
const schemaPets = require("../schemas/validatePets");
const message = require("../lib/messages");
const errors = require("../lib/errors");

router.get("/", async (req, res) => {
	try {
		const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
		const page = req.query.page ? parseInt(req.query.page) : 0;

		const { pets, totalPets } = await controller.getAllPets(pageSize, page);

		return res.json({ pets, totalPets });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: "Internal Server Error" });
	}
});

router.get("/adoptables/", async (req, res) => {
	try {
		const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
		const page = req.query.page ? parseInt(req.query.page) : 0;

		const { pets, totalPets } = await controller.getAdoptables(pageSize, page);

		return res.json({ pets, totalPets });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: "Internal Server Error" });
	}
});

router.get("/adopciones/", async (req, res) => {
	try {
		const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
		const page = req.query.page ? parseInt(req.query.page) : 0;

		const { pets, totalPets } = await controller.getAdopciones(pageSize, page);

		return res.json({ pets, totalPets });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: "Internal Server Error" });
	}
});

router.post("/addPet", async (req, res) => {
	try {
		schemaPets.validatePets(req.body);
		const result = await controller.addPet(req, res);

		if (result.acknowledged) {
			return res.send(
				message.SUCCESSFULL_PET_ADDED + " con id: " + result.insertedId
			);
		} else {
			return res.status(500).send(errors.REQUEST_ERROR);
		}
	} catch (error) {
		console.error(error);
		return res.status(500).send(errors.REQUEST_ERROR);
	}
});

router.put("/updatePet/:id", async (req, res) => {
	try {
		schemaPets.validatePets(req.body);
		const result = await controller.updatePet(req, res);
		if (result.lastErrorObject && result.lastErrorObject.n > 0) {
			return res.send(message.SUCCESSFULL_PET_UPLOAD);
		} else {
			return res.status(500).send(errors.REQUEST_ERROR);
		}
	} catch (error) {
		console.error(error);
		return res.status(500).send({ error: error.message });
	}
});

router.delete("/deletePet/:id", async (req, res) => {
	// TODO: no estamos mostrando el mensaje de exito cuando se borra una mascota
	try {
		const result = await controller.deletePet(req, res);
		if (result.lastErrorObject && result.lastErrorObject.n > 0) {
			return res.status(200).send(message.SUCCESSFULL_PET_DELETE);
		}
	} catch (error) {
		console.error(error);
		return res.status(400).json({ error: error.message });
	}
});

router.get("/:id", async (req, res) => {
	try {
		const petId = req.params.id;
		const pet = await controller.getPet(petId);
		if (pet) {
			return res.json(pet);
		} else {
			return res.status(404).json({ error: "Pet not found" });
		}
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: "Internal Server Error" });
	}
});

module.exports = router;
