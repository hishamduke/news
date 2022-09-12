import prisma from "../../lib/prisma";
import { z } from "zod";

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
  const Agent = z.object({
    num: z
      .number()
      .gt(999999999, { message: "Must be 10 digits" })
      .lt(10000000000, { message: "Must be 10 digits" }),
    loc: z.string(),
  });
  try {
    console.log(req.body);
    let agentdata = Agent.parse(req.body.inp);
    let accountdata = Account.parse(req.body.inp);
    delete accountdata.password2;
    console.log(agentdata);
    console.log(accountdata);
    accountdata.role = "AGENT";
    const account = await prisma.accounts.create({
      data: accountdata,
    });
    agentdata.accountid = account.id;

    const agent = await prisma.agent.create({
      data: agentdata,
    });
    res.status(200).json({ ...agent });
  } catch (e) {
    console.log(e);
    res.status(401).json(e);
  }
}
