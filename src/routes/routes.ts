import { Router } from 'express';
import userRoutes from './user.routes';
import authRoutes from './auth.routes';
import Authenticated from '../shared/middlewares/Authenticated';

const routes = Router();

routes.use('/login', authRoutes);

routes.use('/user', userRoutes);

routes.use(Authenticated);


export default routes;
