import { compare } from 'bcrypt';
import prismaClient from '../../prisma';
import AppError from '../../shared/errors/AppError';
import { sign } from 'jsonwebtoken';

interface IRequestUser {
  username: string;
  password: string;
}

class AuthUserService{
  async execute({username, password}: IRequestUser) {
    const user = await prismaClient.user.findFirst({
      where: {
        username
      }
    });

    if (!user) {
      throw new AppError('username or password is incorrect');
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError('username or password is incorrect');
    }

    const token = sign(
      {
        id: user.id
      },
      process.env.JWT_SECRET,
      {
        subject: user.id,
        expiresIn: '24h'
      }
    );

    const { password: _, ...userLogin } = user;

    return {
      userLogin,
      token
    };
  }
}

export default AuthUserService;
