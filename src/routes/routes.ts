import { Router } from 'express';
import userRoutes from './user.routes';
import authRoutes from './auth.routes';
import Authenticated from '../shared/middlewares/Authenticated';

const routes = Router();

routes.use('/login', authRoutes);

routes.use(Authenticated);

routes.use('/user', userRoutes);

export default routes;
