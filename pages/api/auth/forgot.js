import prisma from "../../../lib/prisma";
import { sign } from "jsonwebtoken";
import { serialize } from "cookie";
import { NextRequest } from "next/server";
import axios from "axios";
import { SMTPClient } from "emailjs";
let nodemailer = require("nodemailer");

const secret = process.env.SECRET;
export default async function handler(req, res) {
  if (!!req.body) {
    const { email } = req.body;
    console.log(email);
    const user = await prisma.accounts.findMany({
      where: {
        email,
        // password,
      },
    });
    return test(req, res);
    console.log(user);
    res.status(200).json({ Message: "Success" });
  } else {
    res.status(401).json({ Message: "Invalid" });
  }
}

async function test(req, res) {
  const { email } = req.body;
  // console.log(process.env)

  const client = new SMTPClient({
    user: process.env.mail,
    password: process.env.password,
    host: "smtp.gmail.com",
    ssl: true,
  });
  console.log("hi");

  try {
    client.send({
      text: `Just for testing purpose`,
      from: process.env.mail,
      to: email,
      subject: "testing emailjs",
    });
  } catch (e) {
    res.status(400).end(JSON.stringify({ message: "Error" }));
    return;
  }

  return res.status(200).end(JSON.stringify({ message: "Send Mail" }));

  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}
