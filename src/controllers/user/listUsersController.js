import { prisma } from "../../lib/prisma";

export async function listUsersController(req, res) {
  const users = await prisma.user.findMany();
  
  res.status(200).send(users);
}
