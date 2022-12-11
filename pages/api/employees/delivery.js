import prisma from "../../../lib/prisma";
import { verify } from "jsonwebtoken";
import { serialize } from "cookie";

const secret = process.env.SECRET;

export default async function handler(req, res) {
  const { cookies } = req;
  const JWT = cookies.OurSiteJWT;

  const d = new Date();
  const day = d.getDate();
  const year = d.getFullYear();
  const month = d.getMonth();
  const dayString = day + "/" + month + "/" + year;
  try {
    var decoded = verify(JWT, secret);

    console.log(req.body.news);
    const mut = await prisma.delivery.findFirst({
      where: {
        userId: req.body.userId,
        newspaperId: req.body.news,
        deliveredDate: dayString,
      },
    });
    console.log("mut");
    console.log(!!mut);

    res.status(200).json({ isDelivered: !!mut });
  } catch (e) {
    console.log(e);
    res.status(200).json({ success: false });
  }
}
