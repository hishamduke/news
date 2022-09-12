import prisma from "../../../lib/prisma";
import { z } from "zod";
import { verify } from "jsonwebtoken";

const secret = process.env.SECRET;

export default async function handler(req, res) {
  const { cookies } = req;
  const JWT = cookies.OurSiteJWT;
  try {
    var decoded = verify(JWT, secret);
    console.log(req.body);
    const result = await prisma.user.findUnique({
      where: {
        accountid: req.body.id,
      },
    });
    const updateUser = await prisma.user.update({
      where: {
        accountid: req.body.id,
      },
      data: {
        banned: !result.banned,
      },
    });
    res.status(200).json(req.body.id);
    console.log(result);
  } catch (e) {
    console.log(e);
    res.status(404).json(e);
  }
}
