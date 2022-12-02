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
  console.log("View agents");
  try {
    // console.log(decoded.id);
    var decoded = verify(JWT, secret);

    const agents = await prisma.agent.findMany({});

    const accounts = await prisma.accounts.findMany({
      where: {
        role: "AGENT",
      },
    });
    const userAgent = await prisma.user.findFirst({
      where: {
        accountid: decoded.id,
      },
    });

    const news = await prisma.newspaper.findMany({
      where: {
        agentId: userAgent.agentId,
      },
    });

    console.log(news);

    res.status(200).json(news);
  } catch (e) {
    console.log(e);
  }
}
