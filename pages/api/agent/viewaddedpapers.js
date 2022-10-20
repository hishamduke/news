import prisma from "../../../lib/prisma";
import { z } from "zod";
import { verify } from "jsonwebtoken";
import { serialize } from "cookie";
const secret = process.env.SECRET;
BigInt.prototype.toJSON = function () {
  return this.toString();
};

export default async function handler(req, res) {
  const { cookies } = req;
  const JWT = cookies.OurSiteJWT;
  console.log("View Added papers");
  try {
    var decoded = verify(JWT, secret);
    // console.log(decoded.id);

    const agent = await prisma.agent.findUnique({
      where: {
        accountid: decoded.id,
      },
      select: {
        // This will work!
        newspapers: {
          where: {
            language: req.body,
          },
        },
      },
    });
    console.log(agent);

    res.status(200).json(agent.newspapers);
  } catch (e) {
    console.log(e);
  }
}
