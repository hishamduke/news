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
    console.log("In all api");
    console.log(req.body);
    console.log(decoded.id);
    const Agent = await prisma.Agent.findUnique({
      where: { accountid: decoded.id },
    });
    let id = Agent.id;
    const users = await prisma.user.findMany({
      where: {
        agentId: id,
        // employeeId: !req.body ? null : undefined,
      },
    });
    let out = users;
    for (let i = 0; i < users.length; i++) {
      const temp = await prisma.accounts.findUnique({
        where: {
          id: out[i].accountid,
        },
      });
      console.log(temp);
      out[i].name = temp.name;
      out[i].email = temp.email;
    }
    // if (guardnum.length > 0) {
    //   return res.status(404).json({ code: "P2002" });
    // } else {
    //   const account = await prisma.accounts.create({
    //     data: accountdata,
    //   });
    //   userdata.accountid = account.id;
    //   const user = await prisma.user.create({
    //     data: userdata,
    //   });
    // }
    res.status(200).json(out);
  } catch (e) {
    console.log(e);
  }
}
