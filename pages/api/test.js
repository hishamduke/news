import prisma from "../../lib/prisma";

BigInt.prototype.toJSON = function () {
  return this.toString();
};
export default async function handler(req, res) {
  try {
    console.log("here bois");
    const userac = await prisma.User.findMany({});
    res.status(200).json(userac);
  } catch (e) {
    console.log(e);
    res.status(200).json({ error: e.name });
  }
}
