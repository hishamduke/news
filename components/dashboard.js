import Router from "next/router";
import axios from "axios";
import { useState } from "react";
export default function Dashboard() {
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
      }
    })
    .catch(function (error) {});
  if (userflag === 0) {
    console.log("Logging out");
    Router.push("/login");
  }
  return (
    <>
      <div className="collumns">
        <div className="collumn">
          <br />

          <form>
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
