import Router from "next/router";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
export default function Dashboard(yea) {
  const logout = async () => {
    let val = await axios.get("/api/auth/logout");
    Router.push("/login");
  };

  const [userflag, setUserflag] = useState(1);
  axios
    .get("/api/auth/cook")
    .then(function (response) {
      if (response.data.Message !== true) {
        logout();
        setUserflag(0);
      } else {
        console.log("hereee");
      }
    })
    .catch(function (error) {});

  if (userflag === 0) {
    console.log("Logging out");
    Router.push("/login");
  }

  const { isLoading, error, data } = useQuery(["repoData"], () =>
    fetch("/api/current").then((res) => res.json())
  );

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      <div className="collumns">
        <div className="collumn">
          <br />
          <form>
            {JSON.stringify(data)}
            <h2 className={("formhead", "Link")}>loggined user only</h2>
            <button
              onClick={(e) => {
                e.preventDefault();
                logout();
              }}
            >
              logout
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
