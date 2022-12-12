import { prisma } from "../../lib/prisma";

export async function statementController(req, res) {
  const { cpf } = req.query;

  const user = await prisma.user.findUnique({
    where: {
      id: cpf,
    },
    include: {
      transaction: true
    }
  });

  console.log(user);

  const userStatement = await prisma.transaction.findMany({
    where: {
      user_id: cpf,
    },
  })

  if(!user) return res.status(400).send('Não existe um usuário com este CPF.');
 
  return res.status(200).send(user.transaction);
}
