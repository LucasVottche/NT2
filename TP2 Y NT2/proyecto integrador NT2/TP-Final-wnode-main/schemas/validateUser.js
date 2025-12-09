const Joi = require("joi");

const userSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  age: Joi.number().max(120).required(),
  role: Joi.string().required(), // TODO: queremos cambiar a rol?
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

function validateUser(user) {
  // TODO: tal vez queremos chequear que no este repetido el email
  const result = userSchema.validate(user, { abortEarly: false });

  if (result.error) {
    const errorMessages = result.error.details.map((error) => error.message);
    throw new Error(errorMessages);
  }

  return result.value;
}

module.exports = { validateUser };
