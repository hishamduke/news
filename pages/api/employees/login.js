import prisma from "../../../lib/prisma";
import { sign } from "jsonwebtoken";
import { serialize } from "cookie";
import { NextRequest } from "next/server";
import axios from "axios";
const secret = process.env.SECRET;
export default async function handler(req, res) {
  console.log("hi");
  if (!!req.body) {
    const { email, password } = req.body;
    const user = await prisma.employee.findMany({
      where: {
        email,
        password,
      },
    });
    console.log(user);
    if (!!user.length) {
      const token = sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
          email: email,
          name: user[0].name,
          id: user[0].id,
          role: user[0].role,
        },
        secret
      );
      const serialised = serialize("OurSiteJWT", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV != "development",
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
      });
      // console.log("correct");
      res.setHeader("Set-Cookie", serialised);
      res.status(200).json({ Message: "Success" });
    } else {
      res.status(401).json({ Message: "Invalid" });
    }
  } else {
    res.status(401).json({ Message: "Invalid" });
  }
}
