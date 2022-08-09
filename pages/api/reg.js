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
  const User = z
    .object({
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(6),
      password2: z.string().min(6),

      num: z
        .number()
        .gt(999999999, { message: "Must be 10 digits" })
        .lt(10000000000, { message: "Must be 10 digits" }),
      house: z.string(),
      street: z.string(),
      pin: z
        .number()
        .gt(99999, { message: "Must be 6 digits" })
        .lt(1000000, { message: "Must be 6 digits" }),
    })
    .refine((data) => data.password === data.password2, {
      message: "password confirmation error",
      path: ["password"],
    });

  try {
    console.log(req.body);
    let a = User.parse(req.body.inp);
    res.status(200).json({ ...a });
  } catch (e) {
    console.log(e.flatten());
    res.status(200).json(e.flatten());
  }
}
