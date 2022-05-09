import regSchema from "../schemas/regSchema.js";

export function validateSignUpMiddleware(req, res, next) {
  const userReg = req.body;

  const validation = regSchema.validate(userReg, { abortEarly: false });

  if (validation.error)
    return res
      .sendStatus(422)
      .send(validation.error.details.map((error) => error.message));

  next();
}
