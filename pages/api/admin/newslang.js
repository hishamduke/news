import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  try {
    const result = await prisma._dmmf.enumMap.Language;
    console.log(result.values);
    res.status(200).json(result.values);
  } catch (e) {
    console.log(e);
    res.status(200).json({ error: e.name });
  }

  //   console.log(date.getTime());
}
