import { Language } from "@prisma/client";
import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  try {
    const hi = req.body;
    let isEnglish = hi == "English";
    console.log(isEnglish);
    const val = await prisma.newspaper.findMany({
      where: {
        language: {
          in: isEnglish ? ["English"] : ["Malayalam"],
        },
      },
    });
    res.status(200).json(val);
  } catch (e) {
    console.log(e);
    res.status(404).json({ error: e.name });
  }
}

// export default function handler(req, res) {
//   const { id } = req.query;
//   console.log("api");
//   console.log(id);
//   res.end(`Post: ${id}`);
// }
