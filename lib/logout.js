import Router from "next/router";

export let logout = async () => {
  console.log("here");
  let val = await fetch("/api/auth/logout");
  Router.push("/logout");
  console.log("logging out");
};
