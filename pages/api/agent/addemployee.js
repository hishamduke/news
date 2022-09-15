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
    console.log(decoded.id);

    let data = Account.parse(req.body.inp);
    data.agentid = decoded.id;
    const account = await prisma.employee.create({
      data: data,
    });
    // console.log(userdata.num);

    // const guardnum = await prisma.User.findMany({
    //   where: {
    //     num: userdata.num,
    //   },
    // });
    // if (guardnum.length > 0) {
    //   return res.status(404).json({ code: "P2002" });
    // } else {
    //   const account = await prisma.accounts.create({
    //     data: accountdata,
    //   });
    //   userdata.accountid = account.id;
    //   const user = await prisma.user.create({
    //     data: userdata,
    //   });
    // }
    res.status(200).json({ ...data });
  } catch (e) {
    console.log(e);
    res.status(401).json(e.meta.target);
  }
}
