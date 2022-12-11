import { prisma } from "../../lib/prisma";

// const { db } = require("../../db");

export async function depositController(req, res) {
  const { cpf } = req.query;
  const { amount } = req.body;
  console.log(cpf)
  // const user = db.users[cpf];

  const user = await prisma.user.findUnique({
    where: {
      id: cpf,
    },
  })

  if(!user) return res.status(400).send('Não existe um usuário com este CPF.');

  if(amount <= 0 || !amount) return res.status(400).send('Não é possível depositar um valor negativo ou igual a 0.');

  // const bankStatement = {
  //   type: "deposit",
  //   amount,
  //   date: new Date()
  // };

  await prisma.user.update({
    where: {
      id: cpf,
    },
    data:{
      bankBalance:  user.bankBalance + amount
    }
  })


  // user.statement.push(bankStatement);

  // user.bankBalance += amount;

  return res.status(200).send(user.bankBalance);
}
