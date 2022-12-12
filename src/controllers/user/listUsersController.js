import { prisma } from "../../lib/prisma";

export async function listUsersController(req, res) {
  const users = await prisma.user.findMany();

  console.log(users);
  
  res.status(200).send(users);
}
