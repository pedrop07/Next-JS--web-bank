const { db } = require("../../db");

export function statementController(req, res) {
  const { cpf } = req.query;

  const user = db.users[cpf];

  if(!user) return res.status(400).send('Não existe um usuário com este CPF.');

  return res.status(200).send([...user.statement].reverse());
}
