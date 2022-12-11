const { db } = require("../../db");

export function deleteUserController(req, res) {
  const { cpf } = req.query;

  const user = db.users[cpf];

  if(!user) return res.status(400).send('Não existe um usuário com este CPF.');

  delete db.users[cpf];

  return res.status(204).send();
}
