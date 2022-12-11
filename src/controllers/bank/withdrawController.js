import { prisma } from "../../lib/prisma";

// const { db } = require("../../db");

export async function withdrawController(req, res) {
  const { cpf } = req.query;
  const { amount, description } = req.body;

  // const user = db.users[cpf];

  const user = await prisma.user.findUnique({
    where: {
      id: cpf,
    },
  })

  if(!user) return res.status(400).send('Não existe um usuário com este CPF.');

  if(amount <= 0) return res.status(400).send('Não é possível sacar um valor negativo ou igual a 0.');

  if(amount > user.bankBalance) return res.status(400).send('Não é possível sacar um valor maior que o saldo.');

  // const withdraw = {
  //   type: "withdraw",
  //   amount,
  //   date: new Date(),
  //   description
  // };
  await prisma.user.update({
    where: {
      id: cpf,
    },
    data:{
      bankBalance: Number(user.bankBalance) - amount
    }
  })

  // user.statement.push(withdraw);

  // user.bankBalance -= amount;

  return res.status(200).send(user.bankBalance);
}
