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
    const emp = await prisma.employee.findFirst({
      where: {
        id: decoded.id,
      },
    });
    const agent = await prisma.agent.findFirst({
      where: {
        accountid: emp.agentid,
      },
    });
    console.log(emp);
    console.log("CHECKCHECK");
    const insert = await prisma.FeedAgentEmp.create({
      data: {
        content: req.body.content,
        Employee: {
          connect: {
            id: decoded.id,
          },
        },
        Agent: {
          connect: {
            id: agent.id,
          },
        },
      },
    });
    res.status(200).json({ insert });
  } catch (e) {
    console.log(e);
    res.status(404).json({ error: e.name });
  }
}
