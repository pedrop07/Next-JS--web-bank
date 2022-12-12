import { prisma } from "../../lib/prisma";

const { db } = require("../../db");

export async function statementController(req, res) {
  const { cpf } = req.query;

  // const user = db.users[cpf];

  const user = await prisma.user.findUnique({
    where: {
      id: cpf,
    },
  })

  const userStatement = await prisma.transaction.findMany({
    where: {
      user_id: cpf,
    },
  })

  if(!user) return res.status(400).send('Não existe um usuário com este CPF.');

  // return res.status(200).send([...user.statement].reverse());
  return res.status(200).send(userStatement);
}
