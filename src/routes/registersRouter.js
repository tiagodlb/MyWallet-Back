import { Router } from 'express';
import { loadSignup, deposit, withdraw } from '../controllers/signUpController.js';
import { validateSignUpMiddleware } from '../middlewares/validateSignUpMiddleware.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const registerRouter = Router();

registerRouter.use(authMiddleware)

registerRouter.get('/userRegisters', loadSignup);

registerRouter.post('/new-entry',validateSignUpMiddleware, deposit);

registerRouter.post('/new-exit',validateSignUpMiddleware, withdraw);

export default registerRouter;