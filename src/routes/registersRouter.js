import { Router } from 'express';
import { loadSignup, deposit, withdraw } from '../controllers/signUpController.js';
import { validateSignUpMiddleware } from '../middlewares/validateSignUpMiddleware.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const registerRouter = Router();

registerRouter.use(authMiddleware)

registerRouter.get('/userRegisters', loadSignup);

registerRouter.post('/deposit',validateSignUpMiddleware, deposit);

registerRouter.post('/withdraw',validateSignUpMiddleware, withdraw);

export default registerRouter;