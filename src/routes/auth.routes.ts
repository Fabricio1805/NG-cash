import { Router } from 'express';
import AuthUserController from '../controllers/user/AuthUserController';

const authRoutes = Router();

authRoutes.post('/', new AuthUserController().handle);

export default authRoutes;
