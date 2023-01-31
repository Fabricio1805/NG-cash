import { Router } from 'express';
import CreateUserController from '../controllers/user/CreateUserController';
import { validate } from '../shared/middlewares/handleValidations';
import { userValidations } from '../shared/middlewares/userValidations';

const userRoutes = Router();

userRoutes.post('/',userValidations(), validate, new CreateUserController().handle);

export default userRoutes;
