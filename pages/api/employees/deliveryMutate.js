import prisma from "../../../lib/prisma";
import { verify } from "jsonwebtoken";
import { serialize } from "cookie";

const secret = process.env.SECRET;

export default async function handler(req, res) {
  const { cookies } = req;
  const JWT = cookies.OurSiteJWT;
  let result = {};
  const d = new Date();
  console.log(req.body);
  try {
    var decoded = verify(JWT, secret);

    console.log("inside userrole api for emp");
    const d = new Date();
    const day = d.getDate();
    const year = d.getFullYear();
    const month = d.getMonth();
    const dayString = day + "/" + month + "/" + year;
    if (!req.body.state) {
      const mut = await prisma.delivery.deleteMany({
        where: {
          userId: req.body.userId,
          newspaperId: req.body.news,
          deliveredDate: dayString,
        },
      });
    } else {
      const mut = await prisma.delivery.create({
        data: {
          user: {
            connect: {
              id: req.body.userId,
            },
          },
          newspaper: {
            connect: {
              id: req.body.news,
            },
          },

          employee: {
            connect: {
              id: decoded.id,
            },
          },
          deliveredDate: dayString,
        },
      });
    }

    res.status(200).json({ success: true });
  } catch (e) {
    console.log(e);
    res.status(200).json({ success: false });
  }
}
