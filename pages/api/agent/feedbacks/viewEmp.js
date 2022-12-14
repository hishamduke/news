import prisma from "../../../../lib/prisma";
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
    console.log(decoded.id);
    const agent = await prisma.agent.findFirst({
      where: {
        accountid: decoded.id,
      },
    });
    const feeds = await prisma.feedAgentEmp.findMany({
      where: {
        agentId: agent.id,
      },
    });
    let out = feeds;
    for (let i = 0; i < out.length; i++) {
      const user = await prisma.Employee.findFirst({
        where: {
          id: feeds[i].employeeId,
        },
      });

      out[i].name = user.name;
      out[i].email = user.email;
    }

    // console.log(out);
    // console.log(feeds);
    res.status(200).json(out);
  } catch (e) {
    console.log(e);
  }
}
