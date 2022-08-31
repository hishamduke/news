import prisma from "../../lib/prisma";

BigInt.prototype.toJSON = function () {
  return this.toString();
};
export default async function handler(req, res) {
  try {
    const userac = await prisma.User.findMany({
      where: {
        num: 1212121212,
      },
    });
    res.status(200).json(userac);
  } catch (e) {
    console.log(e);
    res.status(200).json({ error: e.name });
  }
}
