import signUpSchema from "../schemas/signUpSchema.js";
export function validateUserMiddleware(req, res, next) {
  const userSignUp = req.body;

  const validation = signUpSchema.validate(userSignUp, { abortEarly: false });

  if (validation.error)
    return res
      .sendStatus(422)
      .send(validation.error.details.map((error) => error.message));

  next();
}
