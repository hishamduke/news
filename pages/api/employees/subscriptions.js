import prisma from "../../../lib/prisma";
import { verify } from "jsonwebtoken";
import { serialize } from "cookie";

const secret = process.env.SECRET;

export default async function handler(req, res) {
  const { cookies } = req;
  const JWT = cookies.OurSiteJWT;
  const d = new Date();
  // console.log("here");
  try {
    var decoded = verify(JWT, secret);

    console.log("for subs emp");
    const userac = await prisma.employee.findFirst({
      where: {
        id: decoded.id,
      },
      include: {
        User: true,
      },
    });
    let result = [];
    if (userac.User) {
      // console.log("yup");
      for (let i = 0; i < userac.User.length; i++) {
        // console.log(userac.User[i]);
        const userSub = await prisma.subscriptions.findMany({
          where: {
            userId: userac.User[i].id,
          },
        });
        for (let j = 0; j < userSub.length; j++) {
          // console.log(userSub[j].expireAt);
          // console.log(d);
          if (userSub[j].expireAt > d) result.push(userSub[j]);
        }
      }
    }
    // console.log(result);
    res.status(200).json(result);
  } catch (e) {
    console.log(e);
    res.status(200).json({ success: false });
  }
}
