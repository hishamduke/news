import React from "react";
import styles from "../styles/ManagePapers.module.css";
import Image from "next/image";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { queryClient } from "./_app";
import { getCookies, deleteCookie, setCookie } from "cookies-next";
import Router from "next/router";
export default function Loading(props) {
  console.log("Logout mounted");
  let a = async () => {
    setTimeout(() => {
      Router.push("/");
    }, 700);
  };
  a();
  queryClient.clear();
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
          >
            Logging out...
          </div>
        </div>
      </div>
    </div>
  );
}
export const getServerSideProps = ({ req, res }) => {
  // setCookie("test", "value", { req, res, maxAge: 60 * 6 * 24 });
  // getCookie("test", { req, res });
  const a = getCookies({ req, res });
  // deleteCookie("test", { req, res });
  // setCookie("test", "value", { req, res, maxAge: 60 * 6 * 24 });
  deleteCookie("OurSiteJWT", { req, res });

  return { props: { a } };
};
