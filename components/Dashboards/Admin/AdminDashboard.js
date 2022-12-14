import Link from "next/link";
import Logout from "../../buttons/logoutbutton";
import Image from "next/image";
import { useState } from "react";
import Router from "next/router";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../../../pages/_app";
import BackButton from "../../buttons/backButton";
import styles from "../../../styles/ManagePapers.module.css";

export default function Index() {
  const [currcomp, setCurrcomp] = useState(0);
  const { isLoading, error, data } = useQuery(["name"], () =>
    fetch("/api/account").then((res) => res.json())
  );
  if (data) queryClient.invalidateQueries("account");

  //caching newspapers in eng in advance
  const {} = useQuery([`AdminPapersEnglish`], () =>
    fetch("/api/admin/newspapers", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify("English"),
    }).then((res) => res.json())
  );

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
                onClick={() => Router.push("/dashboard/admin/agentManage")}
              >
                Approve or disapprove agents
              </h3>

              <h3
                className={"formhead Link"}
                onClick={() => Router.push("/dashboard/admin/feedbacks")}
              >
                View feedbacks
              </h3>

              <h3
                className={"formhead Link"}
                onClick={() => Router.push("/dashboard/admin/users")}
              >
                Manage users
              </h3>
              <h3
                className={"formhead Link"}
                onClick={() => Router.push("/dashboard/admin/newspapers")}
              >
                Manage Newspapers
              </h3>

              <Link href={"/test"}>
                <h3 className={"formhead Link"}>Go to test field</h3>
              </Link>
              <Logout />
            </form>
            <div
              style={{
                height: "500px",
                width: "500px",
                // backgroundColor: "red",
                overflow: "none",
              }}
            >
              <Image
                className="dashboard"
                src="/news1.png"
                height={"1000"}
                width={"950"}
                // layout="fill"
                style={{ transform: "translateY(-40px)" }}
              ></Image>
            </div>
          </div>
        </div>

        <br />
      </>
    );
}
