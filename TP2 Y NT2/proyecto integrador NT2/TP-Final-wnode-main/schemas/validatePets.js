const Joi = require("joi");

const petsSchema = Joi.object({
  name: Joi.string().max(12).required(),
  specie: Joi.string().required(),
  race: Joi.string().required(),
  gender: Joi.string().required(),
  age: Joi.number().required(),
  description: Joi.string().required(),
  province: Joi.string().required(),
  // Validación para el campo booleano
  isCastrated: Joi.boolean().optional(),
  status: Joi.string().valid("available", "awaiting", "adopted", "rejected").optional(),
  adopter: Joi.string().optional()
});

function validatePets(pet) {
  // abortEarly: false hace que reporte TODOS los errores juntos, no solo el primero
  const result = petsSchema.validate(pet, { abortEarly: false });

  if (result.error) {
    const errorMessages = result.error.details.map((error) => error.message);
    throw new Error(errorMessages);
  }

  return result.value;
}

// ESTA ES LA CLAVE DEL ARREGLO:
// Exportamos un objeto { validatePets } para que routes/pets.js pueda usar schemaPets.validatePets()
module.exports = { validatePets };