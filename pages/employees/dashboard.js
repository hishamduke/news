import Router from "next/router";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Image from "next/image";
import Logout from "../../components/buttons/logoutbutton";
// import Logout from "../buttons/logoutbutton";
export default function Dashboard(yea) {
  const logout = async () => {
    let val = await axios.get("/api/auth/logout");
    Router.push("/login");
  };

  const [userflag, setUserflag] = useState(1);

  const { isLoading, error, data } = useQuery(["repoData"], () =>
    fetch("/api/employees/empdetails").then((res) => res.json())
  );

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  if (data) if (data.success == false) Router.push("/employees/login");
  return (
    <>
      <div className="collumns">
        {/* {JSON.stringify(data)} */}
        <div
          className="dashboard"
          style={{ marginRight: "100px", gap: "10rem" }}
        >
          <br />
          <form>
            <h1 className={"formhead test"}>Hey {data.name} !</h1>
            <h4>Users</h4>
            <p
              className={" Link"}
              onClick={() => Router.push("/dashboard/user/listagent")}
            >
              View currently assigned Users
            </p>

            <h4>Agents</h4>

            <p
              className={" Link"}
              onClick={() => Router.push("/dashboard/user/ratenews")}
            >
              Write to Agents
            </p>
            <h4>Admin</h4>

            <p className={" Link"} onClick={() => Router.push("/support")}>
              Write to Admin for Support
            </p>

            <Logout />
          </form>
          <div style={{ margin: "auto" }}>
            <Image
              priority="false"
              // placeholder="blur"
              className="dashboard"
              src="/kidnews.png"
              height={"350"}
              width={"350"}

              // style={{ transform: "translateY(-40px)" }}
            ></Image>
          </div>
        </div>
      </div>
    </>
  );
}
