import prisma from "../../../lib/prisma";
import { verify } from "jsonwebtoken";
import { serialize } from "cookie";
import { exclude } from "../current";

const secret = process.env.SECRET;

export default async function handler(req, res) {
  const date = new Date();

  const { cookies } = req;
  const JWT = cookies.OurSiteJWT;
  let result = {};
  try {
    var decoded = verify(JWT, secret);
    console.log(decoded);
    let val = [];
    const result = await prisma.user.findMany({});
    for (let i = 0; i < result.length; i++) {
      val[i] = await prisma.accounts.findFirst({
        where: {
          id: result[i].accountid,
        },
      });
      val[i].num = result[i].num;
      val[i].house = result[i].house;
      val[i].street = result[i].street;
      val[i].pin = result[i].pin;
      val[i].banned = result[i].banned;

      exclude(val[i], "password");
      console.log(result[i].accountid);
    }
    // console.log(result);

    console.log(val);
    res.status(200).json(val);
  } catch (e) {
    console.log(e);
    res.status(200).json({ error: e.name });
  }

  console.log(date.getTime());
}
