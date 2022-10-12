// import styles from "../../../styles/Empoyees.module.css";
import styles from "../../../styles/Employees.module.css";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import Image from "next/image";
import axios from "axios";
import BackButton from "../../../components/buttons/backButton";
import { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import Router from "next/router";
import { useQuery } from "@tanstack/react-query";
import MapView from "../../../components/Dashboards/Agent/mapView";
import { queryClient } from "../../_app";
export default function NewspapersMain() {
  return (
    <>
      <BackButton />
      <Newspapers />
    </>
  );
}
function Newspapers() {
  return (
    <div className="collumns">
      <div className="dashboard" style={{ marginRight: "100px" }}>
        <form>
          {/* <h1 className={"formhead test"}>Hey</h1> */}
          <h4>Newspapers</h4>
          <p
            className={" Link"}
            onClick={() => Router.push("/dashboard/agent/newspapers/show")}
          >
            List newspapers
          </p>

          <p
            className={" Link"}
            onClick={() => Router.push("/dashboard/agent/newspapers/add")}
          >
            Manage newspapers list
          </p>
        </form>
      </div>
    </div>
  );
}
