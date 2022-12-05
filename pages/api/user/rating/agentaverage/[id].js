import prisma from "../../../../../lib/prisma";

export default async function handler(req, res) {
  let { id } = req.query;
  let agentId = parseInt(id);

  try {
    const aggregations = await prisma.ratingAgent.aggregate({
      _avg: {
        rating: true,
      },
      where: {
        agentId,
      },
    });

    res.status(200).json(aggregations._avg.rating);
  } catch (e) {
    console.log(e);
  }
}
