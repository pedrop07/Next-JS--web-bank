import { prisma } from "../../lib/prisma";

export async function depositController(req, res) {
  const { cpf } = req.query;
  const { amount } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      id: cpf,
    },
  })

  if(!user) return res.status(400).send('Não existe um usuário com este CPF.');

  if(amount <= 0 || !amount) return res.status(400).send('Não é possível depositar um valor negativo ou igual a 0.');

  await prisma.transaction.create({
    data: {
      type: "deposit",
      amount,
      user_id: user.id
    }
  })

  await prisma.user.update({
    where: {
      id: cpf,
    },
    data:{
      bankBalance:  user.bankBalance + amount
    }
  })

  return res.status(200).send(user.bankBalance);
}
