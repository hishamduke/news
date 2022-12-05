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
    // console.log(decoded.id);
    var decoded = verify(JWT, secret);

    const userAgent = await prisma.user.findFirst({
      where: {
        accountid: decoded.id,
      },
    });
    console.log(userAgent);
    res.status(200).json(!!userAgent.agentId);
  } catch (e) {
    res.status(404).json(news);

    console.log(e);
  }
}
