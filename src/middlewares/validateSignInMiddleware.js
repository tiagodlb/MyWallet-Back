import signInSchema from "../schemas/signInSchema";
export function validateSignInMiddleware(req, res, next) {
  const userSignIn = req.body;
  const validation = signInSchema.validate(userSignIn, { abortEarly: false });

  if (validation.error)
    return res
      .sendStatus(422)
      .send(validation.error.details.map((error) => error.message));

  next();
}
