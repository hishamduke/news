import Link from "next/link";
import Logout from "../../buttons/logoutbutton";
import styles from "../../../styles/ManagePapers.module.css";

import Image from "next/image";
import { useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import Router from "next/router";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../../../pages/_app";
import NotVerified from "./NotVerified";
import Verified from "./Verified";
export default function Index() {
  const [currcomp, setCurrcomp] = useState(0);
  console.log("here");
  const { isLoading, error, data } = useQuery(["agentStatus"], () =>
    fetch("/api/agent/agentstatus").then((res) => res.json())
  );
  {
    console.log(data == undefined);
  }

  if (data == undefined) {
    return (
      <>
        <div className="collumns">
          <div className="collumn">
            <h2 className="formhead">Loading........</h2>
            <br />
          </div>
        </div>
      </>
    );
  }

  if (!data) return <NotVerified />;

  if (data) {
    queryClient.invalidateQueries("account");
    return <Verified />;
  }
}
