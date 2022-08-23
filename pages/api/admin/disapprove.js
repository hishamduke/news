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
    const updateAgent = await prisma.agent.update({
      where: {
        accountid: req.body.id,
      },
      data: {
        approved: false,
      },
    });
    res.status(200).json(req.body.id);
  } catch (e) {
    console.log(e);
    res.status(404).json(e);
  }
}
