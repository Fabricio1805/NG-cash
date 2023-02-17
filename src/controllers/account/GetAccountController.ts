import { Request, Response } from 'express';
import GetAccountService from '../../services/account/GetAccountService';

class GetAccountController {
  async handle(req: Request, res: Response) {
    const { id } = req.user;
    console.log(req.user);
    const getAccountService = new GetAccountService();

    const balance = await getAccountService.execute({
      id
    });

    return res.json(balance);
  }
}

export default GetAccountController;
