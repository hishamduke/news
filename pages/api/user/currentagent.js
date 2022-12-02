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
    let out = Account;
    delete out.password;
    console.log(userAgent.agentId);
    res.status(200).json(out, Agent);
  } catch (e) {
    console.log(e);
  }
}
