const { db } = require("../../db");

export function listUsersController(req, res) {
  const users = Object.values(db.users);

  res.status(200).send(users);
}
