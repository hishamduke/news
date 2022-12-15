import Router from "next/router";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Image from "next/image";
import Logout from "../buttons/logoutbutton";
export default function Dashboard(yea) {
  const logout = async () => {
    let val = await axios.get("/api/auth/logout");
    Router.push("/login");
  };

  const [userflag, setUserflag] = useState(1);
  //CACHING
  const {} = useQuery(["allagents"], () =>
    fetch("/api/user/viewagents").then((res) => res.json())
  );
  // const {} = useQuery([`agentrating${id}`], () =>
  //   fetch(`/api/user/rating/agentaverage/${id}`).then((res) => res.json())
  // );
  //END CACHING
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
    fetch("/api/account").then((res) => res.json())
  );

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  if (data) {
    return (
      <>
        {/* <div className="collumns">
          <div className="collumn">
            <br />
            <form>
              <div style={{ marginBottom: "1rem" }}>
                <h3>Hey! {data.name}. Welcome</h3>
              </div>
              <Logout />
            </form>
          </div>
        </div> */}
        <div className="collumns">
          <div
            className="dashboard"
            style={{ marginRight: "100px", gap: "10rem" }}
          >
            <br />
            <form>
              <h1 className={"formhead test"}>Hey {data.name} !</h1>
              <h4>Agents</h4>
              <p
                className={" Link"}
                onClick={() => Router.push("/dashboard/user/listagent")}
              >
                List and Choose Agents
              </p>

              <p
                className={" Link"}
                onClick={() => Router.push("/dashboard/user/rateagent")}
              >
                Give rating to your agent
              </p>
              <p
                className={" Link"}
                onClick={() => Router.push("/dashboard/user/agentsupport")}
              >
                Write to your agent
              </p>

              <h4>Newspapers</h4>
              <p
                className={" Link"}
                onClick={() => Router.push("/dashboard/user/subnews")}
              >
                Subscribe to Newspapers
              </p>

              <p
                className={" Link"}
                onClick={() => Router.push("/dashboard/user/ratenews")}
              >
                Give rating to Newspapers
              </p>

              <Logout />
            </form>
            <div style={{ margin: "auto" }}>
              <Image
                priority="false"
                // placeholder="blur"
                className="dashboard"
                src="/newsillu.webp"
                height={"320"}
                width={"330"}

                // style={{ transform: "translateY(-40px)" }}
              ></Image>
            </div>
          </div>
        </div>
      </>
    );
  }
}
