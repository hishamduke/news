import prisma from "../../../lib/prisma";
import { verify } from "jsonwebtoken";
import { serialize } from "cookie";

const secret = process.env.SECRET;
const time = new Date();
function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}
BigInt.prototype.toJSON = function () {
  return this.toString();
};

export function exclude(user, ...keys) {
  for (let key of keys) {
    delete user[key];
  }
  return user;
}

export default async function handler(req, res) {
  const { cookies } = req;
  const JWT = cookies.OurSiteJWT;

  try {
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

    //IF ALREADY SUBSCRIBED EXTEND BRUV
    const isSub = await prisma.Subscriptions.findMany({
      where: {
        userId: userAgent.id,
        agentId: Agent.id,
      },
    });
    let out = [];
    for (let i = 0; i < isSub.length; i++) {
      out[i] = await prisma.newspaper.findFirst({
        where: {
          id: isSub.newspaperId,
        },
      });
    }

    console.log(out);
    res.status(200).json(out);
  } catch (e) {
    console.log(e);
    res.status(404).json({ error: e.name });
  }
}
