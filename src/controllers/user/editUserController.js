const { db } = require("../../db");
const { validateEmail, validateName, validatePassword } = require("../../validations/userValidations");

export function editUserController(req, res) {
  const { cpf } = req.query;

  const user = db.users[cpf];

  if(!user) return res.status(400).send('Não existe um usuário com este CPF.');

  const { email, name, password } = req.body;

  if(email && !validateEmail(email)) {
    return res.status(400).send('O e-mail colocado é inválido.');
  }

  if(name && !validateName(name)) {
    return res.status(400).send('O nome colocado é inválido.');
  }

  if(password && !validatePassword(password)) {
    return res.status(400).send('A senha deve ser maior que 6 dígitos.');
  }
  
  const dataToChange = { 
    email: email ?? user.email, 
    name: name ?? user.name, 
    password: password ?? user.password
  };

  const newUser  = { ...user, ...dataToChange };
  db.users[cpf] = newUser;

  res.status(200).send(newUser);
}
