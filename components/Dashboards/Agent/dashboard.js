import Link from "next/link";
import Logout from "../../buttons/logoutbutton";
import styles from "../../../styles/ManagePapers.module.css";

import Image from "next/image";
import { useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import Router from "next/router";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../../../pages/_app";
export default function Index() {
  const listRef = useAutoAnimate();
  const [currcomp, setCurrcomp] = useState(0);
  console.log("here");
  const { isLoading, error, data } = useQuery(["agentStatus"], () =>
    fetch("/api/agent/agentstatus").then((res) => res.json())
  );
  if (data) queryClient.invalidateQueries("account");
  return (
    <>
      <div style={{ textAlign: "center" }}>
        <Image
          priority="false"
          // placeholder="blur"
          className="dashboard"
          src="/news2.png"
          height={"300"}
          width={"300"}
          //   style={{ transform: "translateY(-40px)" }}
        ></Image>
        <div className={styles.Nofeed} style={{ fontSize: 30 }} ref={listRef}>
          Your account has not verified yet!
        </div>
        <div
          className="formhead"
          style={{
            display: "flex",
            padding: 20,
            fontSize: 20,
            justifyContent: "center",
            gap: 8,
          }}
        >
          Please wait or{" "}
          <div
            className="zoom Link"
            style={{ color: "#2f56d6" }}
            onClick={() => Router.push("/support")}
          >
            {" "}
            contact{" "}
          </div>{" "}
          us!
        </div>
        <Logout />
      </div>
      <div className="collumns">
        <div className="dashboard" style={{ marginRight: "100px" }}>
          <br />
          {/* 
          {/* <form>
            <h2
              className={"formhead Link"}
              onClick={() => Router.push("/dashboard/agentManage")}
            >
              Approve or disapprove agents
            </h2>

            <h2
              className={"formhead Link"}
              onClick={() => Router.push("/dashboard/feedbacks")}
            >
              View feedbacks
            </h2>

            <h2
              className={"formhead Link"}
              onClick={() => Router.push("/dashboard/users")}
            >
              Manage users
            </h2>
            <h2
              className={"formhead Link"}
              onClick={() => Router.push("/dashboard/newspapers")}
            >
              Manage Newspapers
            </h2>

            <Link href={"/test"}>
              <h2 className={"formhead Link"}>Go to test field</h2>
            </Link>
            <Logout />
          </form> */}{" "}
          {/* <Image
            priority="false"
            className="dashboard"
            src="/news2.png"
            height={"300"}
            width={"320"}
            style={{ transform: "translateY(-40px)" }}
          ></Image> */}
        </div>
      </div>
      <br />
    </>
  );
}
