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
    console.log("hihi");
    console.log(req.body);
    console.log("hihi");
    if (req.body.in) {
      const setAgent = await prisma.user.update({
        where: {
          accountid: decoded.id,
        },
        data: {
          agent: {
            connect: {
              id: req.body.id,
            },
          },
        },
      });
    } else {
      const setAgent = await prisma.user.update({
        where: {
          accountid: decoded.id,
        },
        data: {
          agent: {
            disconnect: true,
          },
        },
      });
    }
    res.status(200).json(decoded);
  } catch (e) {
    console.log(e);
  }
}
