import { Request, Response } from 'express';
import CreateTransactionService from '../../services/transaction/CreateTransactionService';

class CreateTransactionController {
  async handle(req: Request, res: Response) {
    const { value, username } = req.body;
    const createTransactionService = new CreateTransactionService();

    const transaction = await createTransactionService.execute({
      value,
      username,
      userLogged: req.user.id,
    });

    return res.status(201).json(transaction);
  }

}

export default CreateTransactionController;
