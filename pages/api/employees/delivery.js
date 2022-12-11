import prisma from "../../../lib/prisma";
import { verify } from "jsonwebtoken";
import { serialize } from "cookie";

const secret = process.env.SECRET;

export default async function handler(req, res) {
  const { cookies } = req;
  const JWT = cookies.OurSiteJWT;
  let result = {};
  const d = new Date();
  try {
    var decoded = verify(JWT, secret);

    console.log(req.body.news);
    const mut = await prisma.delivery.findMany({
      where: {
        userId: req.body.userId,
        newspaperId: req.body.news,
        // deliveredDate: d,
      },
    });

    for (let i = 0; i < mut.length; i++) {
      if (mut[i].deliveredDate.getUTCFullYear() == d.getUTCFullYear()) {
        if (mut[i].deliveredDate.getUTCMonth() == d.getUTCMonth()) {
          if (mut[i].deliveredDate.getUTCDate() == d.getUTCDate()) {
            console.log("TODAYYYY " + req.body.news);
          }
        }
      }
    }

    console.log(mut);
    res.status(200).json("yup");
  } catch (e) {
    console.log(e);
    res.status(200).json({ success: false });
  }
}
