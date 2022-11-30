export default async function handler(req, res) {
  let { id } = req.query;
  id = parseInt(id);
  try {
    console.log(id);

    const news = await prisma.employee.findFirst({
      where: {
        id,
      },
      select: {
        newspapers: [],
      },
    });
    console.log(news);
    res.status(200).json(news);
  } catch (e) {
    console.log(e);
    res.status(404).json(e);
  }
}
