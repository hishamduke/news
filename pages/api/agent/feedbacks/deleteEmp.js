import prisma from "../../../../lib/prisma";
export default async function handler(req, res) {
  try {
    // var decoded = verify(JWT, secret);
    console.log(req.body);
    const updateAgent = await prisma.feedAgentEmp.delete({
      where: {
        id: req.body.id,
      },
    });
    res.status(200).json(req.body.id);
  } catch (e) {
    console.log(e);
    res.status(404).json(e);
  }
}
