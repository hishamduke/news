import prisma from "../../lib/prisma";

export default async function handler(req, res) {
  console.log(req.body);
  res.status(200).json({ user: "hi" });
}
