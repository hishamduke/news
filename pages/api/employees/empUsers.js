import prisma from "../../../lib/prisma";
import { verify } from "jsonwebtoken";
import { serialize } from "cookie";

const secret = process.env.SECRET;

export default async function handler(req, res) {
  const { cookies } = req;
  const JWT = cookies.OurSiteJWT;
  let result = {};
  try {
    var decoded = verify(JWT, secret);
    console.log("here biooio");
    console.log(decoded.id);
    let a = req.body;

    res.status(200).json(a);
  } catch (e) {
    console.log(e);
    res.status(200).json({ success: false });
  }
}
