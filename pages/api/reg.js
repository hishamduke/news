import prisma from "../../lib/prisma";

export default async function handler(req, res) {
  const { email, password } = req.body;
  const user = await prisma.user.findMany({
    where: {
      email,
      password,
    },
  });
  res.status(200).json({ user: !!user.length });
}
