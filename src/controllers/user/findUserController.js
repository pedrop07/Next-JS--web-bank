// const { db } = require("../../db");

import { prisma } from "../../lib/prisma";

export async function findUserController(req, res) {
  const { cpf } = req.query;

  // const user = db.users[cpf];
  const user = await prisma.user.findUnique({
    where: {
      id: cpf,
    },
  })

  if(!user) return res.status(400).send('Não existe um usuário com este CPF.');

  res.status(200).send(user);
}
