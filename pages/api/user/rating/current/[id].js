import prisma from "../../../../../lib/prisma";
import { z } from "zod";
import { verify } from "jsonwebtoken";
import { serialize } from "cookie";
const secret = process.env.SECRET;
BigInt.prototype.toJSON = function () {
  return this.toString();
};

export default async function handler(req, res) {
  const { cookies } = req;
  let { id } = req.query;
  const JWT = cookies.OurSiteJWT;
  console.log("View agents");
  try {
    // console.log(decoded.id);
    var decoded = verify(JWT, secret);
    const userAgent = await prisma.user.findFirst({
      where: {
        accountid: decoded.id,
      },
    });
    const Agent = await prisma.agent.findFirst({
      where: {
        id: userAgent.agentId,
      },
    });
    const Account = await prisma.accounts.findFirst({
      where: {
        id: Agent.accountid,
      },
    });
    const rating = await prisma.ratingNews.findFirst({
      where: {
        userId: userAgent.id,
        newspaperId: parseInt(id),
      },
    });

    res.status(200).json({ rating: rating.rating, feedback: rating.feedback });
  } catch (e) {
    console.log(e);
  }
}
