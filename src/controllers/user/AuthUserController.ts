import { Request, Response } from 'express';
import AuthUserService from '../../services/user/AuthUserService';

class AuthUserController{
  async handle(req: Request, res: Response) {
    const { username, password } = req.body;
    const authUserService = new AuthUserService();

    const authenticated = await authUserService.execute({
      username,
      password
    });

    return res.status(200).json(authenticated);
  }
}

export default AuthUserController;
