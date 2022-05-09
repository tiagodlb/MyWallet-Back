import { Router } from "express";
import { signUp, signIn } from "../controllers/authController.js";
import { validateUserMiddleware } from "../middlewares/validateUserMiddleware.js";
import {validateSignInMiddleware} from "../middlewares/validateSignInMiddleware.js";
const authRouter = Router();

authRouter.post("/auth/sign-in", validateSignInMiddleware, signIn);

authRouter.post("/auth/sign-up", validateUserMiddleware, signUp);

export default authRouter;
