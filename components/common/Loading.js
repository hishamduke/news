import React from "react";
import styles from "../../styles/ManagePapers.module.css";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import Logout from "../buttons/logoutbutton";
export default function Loading() {
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
