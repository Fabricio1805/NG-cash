import AppError from '../../shared/errors/AppError';
import prismaClient from '../../prisma/index';
import { Transaction } from '@prisma/client';

interface ITransaction {
  value: number;
  username: string;
  userLogged: string
}
class CreateTransactionService {
  async execute({ value, username,userLogged }: ITransaction): Promise<Transaction> {
    if (!value) {
      throw new AppError('Preencha todos os dados!', 400);
    }

    const userCredited = await prismaClient.user.findFirst({
      where: {
        username,
      },
      select: {
        id: true,
        account: {
          select: {
            id: true,
            balance: true,
          },
        },
      },
    });

    if (!userCredited) {
      throw new AppError('Usuário não encontrado!', 400);
    }

    const userDebited = await prismaClient.user.findFirst({
      where: {
        id: userLogged,
      },
      select: {
        username: true,
        id: true,
        account: {
          select: {
            id: true,
            balance: true,
          },
        },
      },
    });
    // checks if the value is more than balance
    if (Number(value) > Number(userDebited.account.balance)) {
      throw new AppError('Saldo insuficiente!', 400);
    }

    //check if the user is equal to himself
    if (userCredited.id === userDebited.id) {
      throw new AppError(
        'Não permitido a realização de transaferencia para si mesmo',
        400
      );
    }

    try {
      // insert transaction
      const transaction = await prismaClient.transaction.create({
        data: {
          value,
          creditedAccountId: userCredited.account.id,
          debitedAccountId: userDebited.account.id,
        },
      });

      // update ballance debited
      const newBalanceDebited =
        Number(userDebited.account.balance) - Number(value);
      await prismaClient.account.update({
        where: {
          id: userDebited.account.id,
        },
        data: {
          balance: newBalanceDebited,
        },
      });

      // update ballance credited
      const newBalanceCredited =
        Number(userCredited.account.balance) + Number(value);
      await prismaClient.account.update({
        where: {
          id: userCredited.account.id,
        },
        data: {
          balance: newBalanceCredited,
        },
      });

      return transaction;

    } catch (error) {
      throw new Error();
    }
  }
}

export default CreateTransactionService;
