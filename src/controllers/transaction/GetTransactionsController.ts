import { Request, Response } from 'express';
import GetTransactionService from '../../services/transaction/GetTransactionService';

class GetTransactionsController {
  async handle(req: Request, res: Response) {

    const getTransactionService = new GetTransactionService();

    const transactions = await getTransactionService.execute({
      id: req.user.accountId
    });

    console.log(transactions);

    return res.status(200).json(transactions);
  }
}

export default GetTransactionsController;
