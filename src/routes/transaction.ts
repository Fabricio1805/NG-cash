import { Router } from 'express';
import CreateTransactionController from '../controllers/transaction/CreateTransactionController';
import GetTransactionsController from '../controllers/transaction/GetTransactionsController';

const transactionRouter = Router();

transactionRouter.post('/', new CreateTransactionController().handle);

transactionRouter.get('/', new GetTransactionsController().handle);

export default transactionRouter;
