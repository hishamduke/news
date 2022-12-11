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
    // console.log(decoded.id);

    const users = await prisma.user.findMany({
      where: {
        employeeId: decoded.id,
      },
    });
    let output = users;
    for (let i = 0; i < output.length; i++) {
      const acDetails = await prisma.accounts.findFirst({
        where: {
          id: output[i].accountid,
        },
      });

      output[i].name = acDetails.name;
      output[i].email = acDetails.email;
    }
    // console.log(output);
    res.status(200).json(output);
  } catch (e) {
    console.log(e);
    res.status(200).json(e);
  }
}
