import { prisma } from "../../lib/prisma";

export async function deleteUserController(req, res) {
  const { cpf } = req.query;

  await prisma.transaction.deleteMany({
    where: {
      user_id: cpf
    }
  })

  await prisma.user.delete({
    where: {
      id: cpf
    }
  })

  return res.status(204).send();
}
