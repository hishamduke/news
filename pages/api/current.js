import prisma from "../../lib/prisma";
import { verify } from "jsonwebtoken";
import { serialize } from "cookie";

const secret = process.env.SECRET;

BigInt.prototype.toJSON = function () {
  return this.toString();
};

function exclude(user, ...keys) {
  for (let key of keys) {
    delete user[key];
  }
  return user;
}

export default async function handler(req, res) {
  const { cookies } = req;
  const JWT = cookies.OurSiteJWT;
  console.log("here bois");
  try {
    var decoded = verify(JWT, secret);
    const id = decoded.id;

    const user = await prisma.user2.findUnique({
      where: {
        id,
      },
    });
    console.log(user);
    const userWithoutPassword = exclude(user, "password");
    console.log("yo");
    console.log(userWithoutPassword);
    res.status(200).json(userWithoutPassword);
  } catch (e) {
    res.status(200).json({ error: e.name });
  }
}
