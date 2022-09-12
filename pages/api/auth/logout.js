import prisma from "../../../lib/prisma";
import { sign } from "jsonwebtoken";
import { serialize } from "cookie";
const secret = process.env.SECRET;
export default async function handler(req, res) {
  // console.log(secret);

  const token = sign(
    {
      exp: -1,
    },
    secret
  );
  const serialised = serialize("OurSiteJWT", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV != "development",
    sameSite: "strict",
    maxAge: -1,
    path: "/",
  });
  // console.log("correct");
  res.setHeader("Set-Cookie", serialised);
  res.status(200).json({ Message: "logged out" });
}
