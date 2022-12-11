import prisma from "../../../lib/prisma";
import { verify } from "jsonwebtoken";
import { serialize } from "cookie";

const secret = process.env.SECRET;

export default async function handler(req, res) {
  const { cookies } = req;
  const JWT = cookies.OurSiteJWT;
  let result = {};
  // console.log("here");
  try {
    var decoded = verify(JWT, secret);

    // console.log("inside userrole api for emp");
    const userac = await prisma.employee.findUnique({
      where: {
        email: decoded.email,
      },
    });
    const agent = await prisma.accounts.findUnique({
      where: {
        id: userac.agentid,
      },
    });
    const out = [agent.name, agent.email];

    console.log(userac);
    res.status(200).json(out);
  } catch (e) {
    console.log(e);
    res.status(200).json({ success: false });
  }
}
