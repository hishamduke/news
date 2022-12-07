import prisma from "../../../lib/prisma";
import { verify } from "jsonwebtoken";
import { serialize } from "cookie";

const secret = process.env.SECRET;

export default async function handler(req, res) {
  const { cookies } = req;
  const JWT = cookies.OurSiteJWT;
  let result = {};
  console.log("here");
  try {
    var decoded = verify(JWT, secret);

    console.log("inside userrole api for emp");
    const userac = await prisma.subscriptions.findMany({
      where: {
        // email: decoded.email,
      },
    });
    const date = new Date();

    let resu = userac;
    for (let i = 0; i < userac.length; i++) {
      resu[i].isExpired = userac[i].expireAt < date;
    }
    // console.log(userac);
    res.status(200).json(resu);
  } catch (e) {
    console.log(e);
    res.status(200).json({ success: false });
  }
}
