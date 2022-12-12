import { prisma } from "../../lib/prisma";

// const { db } = require("../../db");
const { validateUser } = require("../../validations/userValidations");

export async function registerController(req, res) {
  const { cpf, email, password, name } = req.body;
  const user = { cpf, email, password, name };

  const isUserValid = validateUser(user);
  if(!isUserValid) {
    return res.status(400).send('Algo deu errado com o seu cadastro! Verifique os dados e tente novamente.');
  }

  const currentUser = await prisma.user.findUnique({
    where: {
      id: cpf,
    },
  });

  if(currentUser) {
    return res.status(400).send('Já existe um usuário cadastrado com este CPF!');
  }

  const data = {
    id: cpf,
    name,
    email,
    password,
    is_admin: false
  };

  try {
    await prisma.user.create({ data });
    return res.status(201).send(data);
  } catch (e) {
    return res.status(500).send();
  }
}
