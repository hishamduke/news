export default async function handler(req, res) {
  let { id } = req.query;
  id = parseInt(id);
  console.log(id);
  try {
    const news = await prisma.newspaper.findFirst({
      where: {
        id,
      },
    });

    res.status(200).json(news);
  } catch (e) {
    console.log(e);
    res.status(404).json(e);
  }
}
