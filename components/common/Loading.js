import React from "react";
import styles from "../../styles/ManagePapers.module.css";
import Logout from "../buttons/logoutbutton";
export default function Loading() {
  return (
    <div className="collumns">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          marginBottom: "1%",
        }}
        className="collumn"
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
