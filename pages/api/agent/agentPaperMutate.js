import prisma from "../../../lib/prisma";
import { z } from "zod";
import { decode, verify } from "jsonwebtoken";
import { serialize } from "cookie";
const secret = process.env.SECRET;

export default async function handler(req, res) {
  const { cookies } = req;
  const JWT = cookies.OurSiteJWT;
  const Paper = z.object({
    id: z.number(),
  });

  try {
    var decoded = verify(JWT, secret);
    let data = Paper.parse(req.body.id);
    console.log(req.body.add);
    if (req.body.add) {
      const getUser = await prisma.agent.update({
        where: {
          accountid: decoded.id,
        },
        data: {
          newspapers: {
            connect: {
              id: data.id,
            },
          },
        },
      });
      console.log(data, decoded.id);
      res.status(200).json({ ...data });
    }
    if (!req.body.add) {
      const getUser = await prisma.agent.update({
        where: {
          accountid: decoded.id,
        },
        data: {
          newspapers: {
            disconnect: {
              id: data.id,
            },
          },
        },
      });
      console.log(data, decoded.id);
      res.status(200).json({ ...data });
    }
  } catch (e) {
    console.log(e);
    res.status(401).json(e.meta.target);
  }
}
