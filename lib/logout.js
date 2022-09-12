import Router from "next/router";
export let logout = async () => {
  let val = await fetch("/api/auth/logout");
  Router.push("/login");
  console.log("logging out");
};
