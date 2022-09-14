import Router from "next/router";
import styles from "../../../styles/ManagePapers.module.css";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import Logout from "../../buttons/logoutbutton";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Loading from "../../common/Loading";
import Link from "next/link";
export default function Verified() {
  const listRef = useAutoAnimate();
  const { isLoading, error, data } = useQuery(["name"], () =>
    fetch("/api/account").then((res) => res.json())
  );
  if (isLoading) return <Loading />;
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
              Manage employees
            </h3>

            <h3
              className={"formhead Link"}
              onClick={() => Router.push("/dashboard/feedbacks")}
            >
              Manage newspapers
            </h3>

            <h3
              className={"formhead Link"}
              onClick={() => Router.push("/dashboard/users")}
            >
              Manage subscriptions
            </h3>
            <h3
              className={"formhead Link"}
              onClick={() => Router.push("/dashboard/newspapers")}
            >
              View feedbacks
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
            // style={{ transform: "translateY(-40px)" }}
          ></Image>
        </div>
      </div>

      <br />
    </>
  );
}
