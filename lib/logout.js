import Router from "next/router";

export let logout = async () => {
  console.log("here in logout");
  let val = await fetch("/api/auth/logout");
  Router.push("/logout");
  console.log("logging out");
};
