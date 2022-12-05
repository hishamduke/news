import styles from "../../styles/ManagePapers.module.css";
import Logout from "../buttons/logoutbutton";
import { useState } from "react";
export default function LoadingSpinner() {
  const [dot, setDot] = useState(".");
  setTimeout(() => {
    if (dot.length % 4 == 0) {
      setDot(".");
    } else {
      setDot(dot + ".");
    }
  }, 300);
  return (
    <div style={{ display: "flex" }}>
      <img
        src={"/spinner.svg"}
        style={{
          height: "2.2rem",
          widows: "2.2rem",
        }}
      />
      <p>Loading please wait{dot}</p>
    </div>
  );
}
