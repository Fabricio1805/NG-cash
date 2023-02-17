import prismaClient from '../../prisma/index';

interface IRequest {
  id: string;
}

class GetAccountService{
  async execute({id }: IRequest){
    const account = await prismaClient.user.findFirst({
      where: {
        id
      },
      select: {
        username: true,
        id: true,
        account: {
          select: {
            balance: true
          }
        }
      }
    });
    return account;
  }
}


export default GetAccountService;
