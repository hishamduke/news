import { deleteCookie } from "cookies-next";

export default async function handler(req, res) {
  deleteCookie("OurSiteJWT", { req, res });
  return res.status(200).json({ message: "ok" });
}
