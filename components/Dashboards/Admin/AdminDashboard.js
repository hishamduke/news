import Link from "next/link";
import Logout from "../../buttons/logoutbutton";
import Image from "next/image";
import { useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import Router from "next/router";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../../../pages/_app";
import BackButton from "../../buttons/backButton";
import styles from "../../../styles/ManagePapers.module.css";

export default function Index() {
  const listRef = useAutoAnimate();
  const [currcomp, setCurrcomp] = useState(0);
  const { isLoading, error, data } = useQuery(["agentStatus"], () =>
    fetch("/api/account").then((res) => res.json())
  );
  if (data) queryClient.invalidateQueries("account");
  console.log("here");
  if (isLoading) {
    return (
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            marginBottom: "1%",
          }}
        >
          <div
            className={styles.Nofeed}
            style={{ textAlign: "center", fontSize: 30 }}
            ref={listRef}
          >
            Loading please wait...
          </div>
          <div style={{ textAlign: "center" }}>
            <Logout />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            marginBottom: "1%",
          }}
        >
          <div
            className={styles.Nofeed}
            style={{ textAlign: "center", fontSize: 30 }}
            ref={listRef}
          >
            Sorry, An error occured.
            <br />
            Please try again.
          </div>
          <div style={{ textAlign: "center" }}>
            <Logout />
          </div>
        </div>
      </div>
    );
  }

  if (data)
    return (
      <>
        <div className="collumns">
          <div className="dashboard" style={{ marginRight: "100px" }}>
            <br />
            <form>
              <h1 className={"formhead test"}>Hey {data.name} !</h1>
              <h3
                className={"formhead Link"}
                onClick={() => Router.push("/dashboard/agentManage")}
              >
                Approve or disapprove agents
              </h3>

              <h3
                className={"formhead Link"}
                onClick={() => Router.push("/dashboard/feedbacks")}
              >
                View feedbacks
              </h3>

              <h3
                className={"formhead Link"}
                onClick={() => Router.push("/dashboard/users")}
              >
                Manage users
              </h3>
              <h3
                className={"formhead Link"}
                onClick={() => Router.push("/dashboard/newspapers")}
              >
                Manage Newspapers
              </h3>

              <Link href={"/test"}>
                <h3 className={"formhead Link"}>Go to test field</h3>
              </Link>
              <Logout />
            </form>
            <Image
              priority="false"
              // placeholder="blur"
              className="dashboard"
              src="/news1.png"
              height={"300"}
              width={"320"}
              style={{ transform: "translateY(-40px)" }}
            ></Image>
          </div>
        </div>

        <br />
      </>
    );
}
