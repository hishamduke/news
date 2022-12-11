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
    // console.log(decoded.id);
    console.log(req.body);

    const revokeEmp = await prisma.user.update({
      where: {
        id: req.body.id,
      },
      data: {
        employee: {
          disconnect: true,
        },
      },
    });

    res.status(200).json(decoded);
  } catch (e) {
    console.log(e);
  }
}
