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

  try {
    var decoded = verify(JWT, secret);
    console.log(decoded.id);

    const employees = await prisma.employee.findMany({
      where: {
        agentid: decoded.id,
      },
    });
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
    res.status(200).json(employees);
  } catch (e) {
    console.log(e);
  }
}
