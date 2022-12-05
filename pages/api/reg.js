import prisma from "../../lib/prisma";
import { z } from "zod";
//  {
//     name: 'hisham',
//     email: 'g@h.c',
//     password: '1111111111',
//     num: '1234567890',
//     house: 'g@h.c',
//     street: 'g@h.c',
//     pin: '111111'
//   }

export default async function handler(req, res) {
  const Account = z
    .object({
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(6),
      password2: z.string().min(6),
    })
    .refine((data) => data.password === data.password2, {
      message: "password confirmation error",
      path: ["password"],
    });
  const User = z
    .object({
      num: z
        .number()
        .gt(999999999, { message: "Must be 10 digits" })
        .lt(10000000000, { message: "Must be 10 digits" }),
      // house: z.string(),
      // street: z.string(),
      // pin: z
      //   .number()
      //   .gt(99999, { message: "Must be 6 digits" })
      //   .lt(1000000, { message: "Must be 6 digits" }),
    })
    .refine((data) => data.password === data.password2, {
      message: "password confirmation error",
      path: ["password"],
    });

  try {
    console.log(req.body);
    let accountdata = Account.parse(req.body.inp);
    let userdata = User.parse(req.body.inp);
    userdata.loc = JSON.stringify(req.body.inp.loc);

    delete accountdata.password2;
    // console.log(userdata.num);

    const guardnum = await prisma.User.findMany({
      where: {
        num: userdata.num,
      },
    });
    if (guardnum.length > 0) {
      return res.status(404).json({ code: "P2002" });
    } else {
      const account = await prisma.accounts.create({
        data: accountdata,
      });
      userdata.accountid = account.id;
      const user = await prisma.user.create({
        data: userdata,
      });
      res.status(200).json({ ...account });
    }
  } catch (e) {
    console.log(e);
    res.status(401).json(e);
  }
}
