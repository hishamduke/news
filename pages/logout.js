import React from "react";
import styles from "../styles/ManagePapers.module.css";
import Image from "next/image";
import Router from "next/router";
import { deleteCookie } from "cookies-next";

import { useAutoAnimate } from "@formkit/auto-animate/react";
import Logout from "../components/buttons/logoutbutton";
export default function Loading() {
  let a = async () => {
    let val = await fetch("/api/auth/logout");
    Router.push("/login");
  };
  a();
  const listRef = useAutoAnimate();
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
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "1%",
            alignItems: "center",
          }}
        >
          <Image src={"/spinner.svg"} height={"30px"} width={"30px"} />

          <div
            className={styles.Nofeed}
            style={{ textAlign: "center", fontSize: 30 }}
            ref={listRef}
          >
            Logging out...
          </div>
        </div>
      </div>
    </div>
  );
}
export const getServerSideProps = ({ req, res }) => {
  deleteCookie("OurSiteJWT", { req, res });
  return { props: {} };
};
