import prisma from "../../../../../lib/prisma";

export default async function handler(req, res) {
  let { id } = req.query;
  let newspaperId = parseInt(id);
  try {
    const aggregations = await prisma.ratingNews.aggregate({
      _avg: {
        rating: true,
      },
      where: {
        newspaperId,
      },
    });
    res.status(200).json(aggregations._avg.rating);
  } catch (e) {
    console.log(e);
  }
}
