import prisma from "../../lib/prisma";
import { verify } from "jsonwebtoken";
import { serialize } from "cookie";

const secret = process.env.SECRET;

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
  const date = new Date();

  const { cookies } = req;
  const JWT = cookies.OurSiteJWT;
  let result = {};
  try {
    var decoded = verify(JWT, secret);
    const id = decoded.id;

    const userac = await prisma.accounts.findUnique({
      where: {
        id,
      },
    });
    let userWithoutPassword = exclude(userac, "password");
    // userWithoutPassword.role = "AGENT";
    res.status(200).json(userWithoutPassword);

    // res.status(200).json(userWithoutPassword);

    // console.log(userac);
  } catch (e) {
    res.status(200).json({ error: e.name });
  }

  // console.log(date.getTime());
}
