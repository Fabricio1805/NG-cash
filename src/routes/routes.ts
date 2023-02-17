import { Router } from 'express';
import userRoutes from './user.routes';
import authRoutes from './auth.routes';
import Authenticated from '../shared/middlewares/Authenticated';
import accountRouter from './account.routes';
import transactionRouter from './transaction';

const routes = Router();

routes.use('/login', authRoutes);

routes.use('/user', userRoutes);

routes.use(Authenticated);

routes.use('/balance', accountRouter);

routes.use('/transaction', transactionRouter);

export default routes;
