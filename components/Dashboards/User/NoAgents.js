import Router from "next/router";
import styles from "../../../styles/ManagePapers.module.css";
import Logout from "../../buttons/logoutbutton";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Loading from "../../common/Loading";

export default function NotVerified() {
  const { isLoading, error, data } = useQuery(["name"], () =>
    fetch("/api/account").then((res) => res.json())
  );
  if (isLoading) return <Loading />;
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
        <div className={styles.Nofeed} style={{ fontSize: 30 }}>
          {/* {JSON.stringify(data)} */}
          Hey {data.name} !<br />
          Please choose an agent before rating them.
        </div>
        <div
          className="formhead"
          style={{
            display: "flex",
            paddingBottom: 20,
            fontSize: 20,
            justifyContent: "center",
            gap: 8,
          }}
        >
          <div
            className="zoom Link"
            style={{ color: "#2f56d6" }}
            onClick={() => Router.push("/dashboard/user/listagent")}
          >
            choose an agent
          </div>
        </div>
      </div>
    </>
  );
}
