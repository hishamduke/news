import prisma from "../../../../lib/prisma";
import { verify } from "jsonwebtoken";
import { serialize } from "cookie";

const secret = process.env.SECRET;
const time = new Date();
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
  let { id } = req.query;
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
    const feeds = await prisma.ratingAgent.findMany();

    //IF ALREADY SUBSCRIBED EXTEND BRUV
    const isSub = await prisma.Subscriptions.findFirst({
      where: {
        userId: userAgent.id,
        agentId: Agent.id,
        newspaperId: parseInt(id),
      },
    });
    if (isSub) {
      res.status(200).json(isSub.expireAt);
    } else {
      res.status(200).json(time);
    }
    // const test = await prisma.Subscriptions.create({
    //   data: {
    //     subAt: time,
    //     expireAt: addDays(time, req.body.months * 28),
    //     User: {
    //       connect: {
    //         id: userAgent.id,
    //       },
    //     },
    //     Agent: {
    //       connect: {
    //         id: Agent.id,
    //       },
    //     },
    //     Newspaper: {
    //       connect: {
    //         id: parseInt(req.body.id),
    //       },
    //     },
    //   },
    // });
  } catch (e) {
    console.log(e);
    res.status(404).json({ error: e.name });
  }
}
