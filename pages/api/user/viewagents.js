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
    let out = agents;
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
    // console.log(userAgent);

    for (let i = 0; i < agents.length; i++) {
      for (let j = 0; j < accounts.length; j++) {
        if (userAgent.agentId == out[i].id) {
          out[i].currentAgent = true;
        } else {
          out[i].currentAgent = false;
        }
        console.log("loop");
        console.log("id decoded " + decoded.id);

        console.log(userAgent);

        if (accounts[j].id == agents[i].accountid) {
          out[i].name = accounts[j].name;
          out[i].email = accounts[j].email;
        }
      }
    }
    res.status(200).json(out);
  } catch (e) {
    console.log(e);
  }
}
