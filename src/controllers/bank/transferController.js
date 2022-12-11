import { prisma } from "../../lib/prisma";

const { db } = require("../../db");

export async function transferController(req, res) {
  const { cpf } = req.query;
  const { amount, toCpf, description } = req.body;

  // const user = db.users[cpf];
  // const toUser = db.users[toCpf];

  const user = await prisma.user.findUnique({
    where: {
      id: cpf,
    },
  })

  const toUser = await prisma.user.findUnique({
    where: {
      id: toCpf,
    },
  })

  if(!user || !toUser) return res.status(400).send('Não existe um usuário com este CPF.');

  if(cpf === toCpf) return res.status(400).send('Não é possível transferir dinheiro para si próprio.');

  if(amount <= 0) return res.status(400).send('Não é possível transferir um valor negativo ou igual a 0.');

  if(amount > user.bankBalance) return res.status(400).send('Não é possível transferir um valor maior que o saldo.');

  const transfer = {
    type: "transfer",
    to: toUser.name,
    amount,
    date: new Date(),
    description
  };

  const transferReceipt = {
    type: "receipt",
    by: user.name,
    amount,
    date: new Date(),
    description
  };

  await prisma.user.update({
    where: {
      id: cpf,
    },
    data:{
      bankBalance: Number(user.bankBalance) - amount
    }
  })

  await prisma.user.update({
    where: {
      id: toCpf,
    },
    data:{
      bankBalance: Number(toUser.bankBalance) + amount
    }
  })

  // user.bankBalance -= amount;
  // user.statement.push(transfer);

  // toUser.bankBalance += amount;
  // toUser.statement.push(transferReceipt);

  return res.status(200).send(toUser);
}
