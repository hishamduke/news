import prisma from "../../../lib/prisma";

import { exclude } from "../current";

export async function whois(id) {
  const user = await prisma.accounts.findFirst({
    where: {
      id: id,
    },
  });
  console.log(user);
  return exclude(user, "password");
}
async function whoall(array) {
  let res = [];
  for (let i = 0; i < array.length; i++) {
    // console.log(array);
    res[i] = await whois(array[i].account);
  }
  console.log(res);
  return res;
}
export default async function handler(req, res) {
  try {
    const result = await prisma.feedback.findMany({});
    const out = await whoall(result);
    for (let i = 0; i < result.length; i++) {
      result[i].email = out[i].email;
      result[i].name = out[i].name;
      result[i].role = out[i].role;
    }
    res.status(200).json(result);
  } catch (e) {
    console.log(e);
    res.status(200).json({ error: e.name });
  }
}
