import prisma from "../../../lib/prisma";
import { verify } from "jsonwebtoken";
import { serialize } from "cookie";

const secret = process.env.SECRET;

export default async function handler(req, res) {
  const { cookies } = req;
  const JWT = cookies.OurSiteJWT;
  let result = {};
  // console.log(req.body);
  try {
    var decoded = verify(JWT, secret);

    // console.log(req.body);
    const news = await prisma.newspaper.findFirst({
      where: {
        id: req.body.id,
      },
    });

    res.status(200).json({ name: news.name });
  } catch (e) {
    console.log(e);
    res.status(200).json({ success: false });
  }
}
