import prisma from "../../../lib/prisma";
import { verify } from "jsonwebtoken";
import { serialize } from "cookie";

const secret = process.env.SECRET;

export default async function handler(req, res) {
  const { cookies } = req;
  const JWT = cookies.OurSiteJWT;
  let result = {};
  //   console.log(req.body);
  try {
    var decoded = verify(JWT, secret);

    // console.log(req.body);
    const user = await prisma.User.findFirst({
      where: {
        id: req.body.id,
      },
    });
    const acc = await prisma.accounts.findFirst({
      where: {
        id: user.accountid,
      },
    });
    // console.log(acc);
    res.status(200).json({ name: acc.name, loc: user.loc });
  } catch (e) {
    console.log(e);
    res.status(200).json({ success: false });
  }
}
