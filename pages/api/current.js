import prisma from "../../lib/prisma";
import { verify } from "jsonwebtoken";
import { serialize } from "cookie";

const secret = process.env.SECRET;

BigInt.prototype.toJSON = function () {
  return this.toString();
};

export function exclude(user, ...keys) {
  for (let key of keys) {
    // console.log(key);
    // console.log(user);
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
    // console.log(id);
    const userac = await prisma.agent.findUnique({
      where: {
        accountid: id,
      },
    });
    const accountInfo = await prisma.accounts.findUnique({
      where: {
        id,
      },
    });

    if (accountInfo.role == "ADMIN") {
      res.status(200).json("decoded");
      return;
    }
    if (accountInfo.role == "AGENT") {
      const agentInfo = await prisma.agent.findUnique({
        where: {
          accountid: id,
        },
      });
      let userWithoutPassword = exclude(userac, "password");
      userWithoutPassword.role = "AGENT";
      res.status(200).json(userWithoutPassword);
      return;
    }

    if (accountInfo.role == "USER") {
      const userac = await prisma.user.findUnique({
        where: {
          accountid: id,
        },
      });
      let userWithoutPassword = exclude(userac, "password");
      userWithoutPassword.role = "USER";
      res.status(200).json(userWithoutPassword);
      return;
    }

    // console.log(userac);
  } catch (e) {
    res.status(200).json({ error: e.name });
    return;
  }

  // console.log(date.getTime());
}
