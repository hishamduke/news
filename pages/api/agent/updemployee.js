import prisma from "../../../lib/prisma";
import { z } from "zod";
import { verify } from "jsonwebtoken";
import { serialize } from "cookie";
const secret = process.env.SECRET;

export default async function handler(req, res) {
  const { cookies } = req;
  const JWT = cookies.OurSiteJWT;
  const Account = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    num: z
      .number()
      .gt(999999999, { message: "Must be 10 digits" })
      .lt(10000000000, { message: "Must be 10 digits" }),
  });

  try {
    var decoded = verify(JWT, secret);

    let data = Account.parse(req.body.inp);

    data.agentid = decoded.id;
    data.loc = JSON.stringify(req.body.inp.loc);
    console.log("here");
    console.log(req.body.inp.id);
    const account = await prisma.employee.update({
      where: {
        id: req.body.inp.id,
      },
      data,
    });

    res.status(200).json({ ...account });
  } catch (e) {
    console.log(e);
    res.status(401).json("errr");
  }
}
