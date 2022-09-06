import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  try {
    const result = await prisma.Newspaper.create({
      data: {
        name: "hi",
        price: 10,
        img: "/news/145.jpg",
        language: "English",
      },
    });

    res.status(200).json(result);
  } catch (e) {
    console.log(e);
    res.status(200).json({ error: e.name });
  }

  //   console.log(date.getTime());
}
