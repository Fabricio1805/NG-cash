import { Transaction } from '@prisma/client';
import prismaClient from '../../prisma/index';

interface IRequest{
  id: string
}

class GetTransactionService{

  async execute({ id }: IRequest): Promise<Transaction[]> {
    console.log(id);
    const transactions = await prismaClient.transaction.findMany({
      where: {
        OR: [
          { creditedAccountId: id },
          {debitedAccountId: id}
        ]
      },
      select: {
        id: true,
        creditedAccountId: true,
        debitedAccountId: true,
        value: true,
        createdAt: true
      }
    });

    return transactions;
  }
}

export default GetTransactionService;
