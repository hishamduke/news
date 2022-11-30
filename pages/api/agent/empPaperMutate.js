import prisma from "../../../lib/prisma";
import { z } from "zod";
import { decode, verify } from "jsonwebtoken";
import { serialize } from "cookie";
const secret = process.env.SECRET;

export default async function handler(req, res) {
  const { cookies } = req;
  const JWT = cookies.OurSiteJWT;

  // try {
  //   var decoded = verify(JWT, secret);
  //   let data = Paper.parse(req.body.id);
  //   console.log(req.body.add);
  //   if (req.body.add) {
  //     const getUser = await prisma.agent.update({
  //       where: {
  //         accountid: decoded.id,
  //       },
  //       data: {
  //         newspapers: {
  //           connect: {
  //             id: data.id,
  //           },
  //         },
  //       },
  //     });
  //     console.log(data, decoded.id);
  //     res.status(200).json({ ...data });
  //   }
  //   if (!req.body.add) {
  //     const getUser = await prisma.agent.update({
  //       where: {
  //         accountid: decoded.id,
  //       },
  //       data: {
  //         newspapers: {
  //           disconnect: {
  //             id: data.id,
  //           },
  //         },
  //       },
  //     });
  //     console.log(data, decoded.id);
  //     res.status(200).json({ ...data });
  //   }
  // }
  try {
    console.log(req.body);
    if (req.body.add) {
      const updEmp = await prisma.employee.update({
        where: {
          id: parseInt(req.body.id),
        },
        data: {
          newspapers: {
            connect: [{ id: req.body.newsid }],
          },
        },
      });
      console.log(updEmp);
      res.status(200).json("Success");
    }

    if (!req.body.add) {
      const updEmp = await prisma.employee.update({
        where: {
          id: parseInt(req.body.id),
        },
        data: {
          newspapers: {
            disconnect: [{ id: req.body.newsid }],
          },
        },
      });
      console.log(updEmp);
      res.status(200).json("Success");
    }
    // res.status(200).json("hm");
  } catch (e) {
    console.log(e);
    res.status(401).json(e.meta.target);
  }
}
