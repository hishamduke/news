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
export default function employees() {
  return (
    <>
      <BackButton />
      <Employee />
    </>
  );
}
function Employee() {
  const [animationParent] = useAutoAnimate();
  const [visible, setVisible] = useState(false);

  const { isLoading, error, data } = useQuery(["employees"], () =>
    fetch("/api/agent/viewemployees").then((res) => res.json())
  );
  if (isLoading) return;
  if (data)
    return (
      <>
        <div className="collumns">
          <div className="dashboard" ref={animationParent}>
            <form>
              <h2> Available Agents</h2>
            </form>
          </div>
        </div>
      </>
    );
}
