import { User } from '@prisma/client';
import prismaClient from '../../prisma/index';
import { hash } from 'bcrypt';
import AppError from '../../shared/errors/AppError';


interface UserRequest {
  username: string;
  password: string;
}

class CreateUserService{
  async execute({ username, password }: UserRequest): Promise<User> {
    const userExists = await prismaClient.user.findFirst({
      where: {
        username
      }
    });

    if (userExists) {
      throw new AppError('User already exists');
    }

    const passwordHash = await hash(password, 8);

    /*const account = await prismaClient.account.create({
      data: {
        balance: 100.00,

      }
    });*/


    const user = await prismaClient.user.create({
      data: {
        username,
        password: passwordHash,
        account: {
          create: {
            balance: 100.00
          }
        }
      },
      select: {
        id: true,
        username: true,
        password: true,
        accountId: true,
        createdAt: true
      },
    });

    return user;
  }

}


export default CreateUserService;
