import Router from "next/router";
import { useState } from "react";
import { logout } from "../../lib/logout";
import Image from "next/image";
export default function Logout() {
  const [butload, setButload] = useState(false);
  return (
    <>
      <button
        // style={{ margin: "10px" }}
        onClick={(e) => {
          e.preventDefault();
          setButload(true);
          logout();
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          {butload && (
            <Image src={"/spinner.svg"} height={"30px"} width={"30px"} />
          )}{" "}
          Logout
        </div>
      </button>
    </>
  );
}
