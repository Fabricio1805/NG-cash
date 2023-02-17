import { Router } from 'express';
import GetAccountController from '../controllers/account/GetAccountController';

const accountRouter = Router();


accountRouter.get('/', new GetAccountController().handle);

export default accountRouter;
