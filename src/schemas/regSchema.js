import joi from "joi";

const regSchema = joi.object({
  description: joi
    .string()
    .pattern(/[a-zA-Z]{3,}/)
    .required(),
  value: joi.number().min(1).required(),
});

export default regSchema;
