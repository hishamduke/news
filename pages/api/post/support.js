import prisma from "../../../lib/prisma";
import { decode, verify } from "jsonwebtoken";
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
    const isEmp = await prisma.employee.findFirst({
      where: {
        id: decoded.id,
        email: decode.email,
      },
    });
    console.log(isEmp);
    if (!!isEmp) {
      const insert = await prisma.Feedback.create({
        data: {
          account: decoded.id,
          content: req.body.content,
          isEmp: 1,
        },
      });
      // console.log(req.body.content);
      return res.status(200).json({ insert });
    }
    const insert = await prisma.Feedback.create({
      data: {
        account: decoded.id,
        content: req.body.content,
      },
    });
    // console.log(req.body.content);
    res.status(200).json({ insert });
  } catch (e) {
    console.log(e);
    res.status(404).json({ error: e.name });
  }
}
