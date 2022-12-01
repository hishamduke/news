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
    var decoded = verify(JWT, secret);
    // console.log(decoded.id);
    const agents = await prisma.agent.findMany({});
    let out = agents;
    const accounts = await prisma.accounts.findMany({
      where: {
        role: "AGENT",
      },
    });
    // console.log(agents);
    for (let i = 0; i < agents.length; i++) {
      for (let j = 0; j < accounts.length; j++) {
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
