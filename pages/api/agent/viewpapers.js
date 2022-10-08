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

  try {
    var decoded = verify(JWT, secret);
    // console.log(decoded.id);

    const papers = await prisma.newspaper.findMany({
      where: {
        language: req.body,
      },
    });
    const agent = await prisma.agent.findFirst({
      where: {
        accountid: decoded.id,
      },
    });
    console.log(req.body);

    res.status(200).json(papers);
  } catch (e) {
    console.log(e);
  }
}
