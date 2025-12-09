const Joi = require("joi");

const petsSchema = Joi.object({
  name: Joi.string().max(12).required(),
  specie: Joi.string().required(),
  race: Joi.string().required(),
  gender: Joi.string().required(),
  age: Joi.number().required(),
  description: Joi.string().required(),
  province: Joi.string().required(),
  status: Joi.string().valid("available", "awaiting", "adopted", "rejected").optional(),
  adopter: Joi.string().optional()
});

function validatePets(pet) {
  const result = petsSchema.validate(pet, { abortEarly: false });

  if (result.error) {
    const errorMessages = result.error.details.map((error) => error.message);
    throw new Error(errorMessages);
  }

  return result.value;
}

module.exports = { validatePets };
