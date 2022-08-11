import axios from "axios";
import Router from "next/router";
export const logout = async () => {
  let val = await axios.get("/api/auth/logout");
  Router.push("/login");
};
