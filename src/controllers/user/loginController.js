// import { db } from "../../db";
import { prisma } from "../../lib/prisma";

export async function loginController(req, res) {
  const { cpf, password } = req.body;

  // const user = db.users[cpf];

  const user = await prisma.user.findUnique({
    where: {
      id: cpf,
    },
  })


  if(!user) return res.status(400).send('Não existe um usuário com este CPF!');

  if(user.password !== password) return res.status(400).send('Senha inválida para este CPF!');

  return res.status(200).send(user);
}
