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

  // if(db.users[cpf]) {
  //   return res.status(400).send('Já existe um usuário cadastrado com este CPF!');
  // }

  await prisma.user.create({
    data:{
      id: parseInt(cpf),
      name,
      email,
      password,
      is_admin: false
    }
  })

  // user.accNumber = String(Object.keys(db.users).length + 1).padStart(6, '0');
  // user.createdAt = new Date();
  // user.statement = [];
  // user.bankBalance = 0;

  // db.users[cpf] = user;

  return res.status(201).send({});
}
