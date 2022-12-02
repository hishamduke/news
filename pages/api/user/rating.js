import prisma from "../../../lib/prisma";
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
    let isDone = false;
    for (let i = 0; i < feeds.length; i++) {
      if (feeds[i].userId == userAgent.id && feeds[i].agentId == Agent.id) {
        const updateRating = await prisma.ratingAgent.update({
          where: {
            id: feeds[i].id,
          },
          data: {
            rating: req.body.rating,
            feedback: req.body.content,
          },
        });
        isDone = true;
        res.status(200).json("updated");
      }
    }
    if (!isDone) {
      const updateRating = await prisma.ratingAgent.create({
        data: {
          rating: req.body.rating,
          feedback: req.body.content,
          User: {
            connect: {
              id: userAgent.id,
            },
          },
          Agent: {
            connect: {
              id: Agent.id,
            },
          },
        },
      });

      res.status(200).json("error");
    }
  } catch (e) {
    console.log(e);
    res.status(404).json({ error: e.name });
  }
}
