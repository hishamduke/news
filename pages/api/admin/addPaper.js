import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  try {
    // console.log(req.body);
    const inp = req.body.inp;
    let unique = await prisma.newspaper.findFirst({
      where: {
        name: inp.name,
        language: inp.language,
      },
    });
    console.log(!!unique);
    if (!!unique) {
      res.status(404).json({ error: "Non unique" });
      return;
    }
    const fs = require("fs");
    var imgName;
    if (inp.image.length) {
      console.log("hiii");
      var base64Data1 = inp.image.split(",")[0];
      base64Data1 = base64Data1.split(":")[1];
      var extension = base64Data1.split("/")[1];
      var extension = extension.split(";")[0];
      var base64Data = inp.image.split(",")[1];
      imgName = inp.name + inp.language + "." + extension;
      console.log(imgName);
      fs.writeFile(
        "public/newspapers/" + imgName,
        base64Data,
        "base64",
        function (err, data) {
          if (err) {
            console.log("err", err);
          }
          console.log("success");
        }
      );
    }

    const result = await prisma.Newspaper.create({
      data: {
        name: inp.name,
        img: !!imgName ? "/newspapers/" + imgName : "",
        language: inp.language,
        description: inp.desc,
        price: parseInt(inp.price),
      },
    });

    res.status(200).json("here");
  } catch (e) {
    console.log(e);
    res.status(404).json({ error: e.name });
  }

  //   console.log(date.getTime());
}
