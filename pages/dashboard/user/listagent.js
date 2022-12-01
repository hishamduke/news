// import styles from "../../../styles/Empoyees.module.css";
import styles from "../../../styles/AgentScreen.module.css";
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
import Star from "../../../components/common/Star";
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
        <form>
          <h2 style={{ textAlign: "center" }}> Available Agents</h2>
        </form>

        <div className="collumns">
          <div className="dashboard" ref={animationParent}>
            <div className="collumns">
              <Box />

              <Box />
              <Box />
              <Box />
              <Box />
            </div>
          </div>
        </div>
      </>
    );
}

const Box = () => {
  return (
    <div className={styles.NewsBox}>
      {/* {console.log(val)} */}

      <h1 className={styles.Heading}>Agent Details</h1>
      {/* <img className={styles.NewsImg} src={val.img} /> */}
      {/* <p style={{ textAlign: "center" }}>{val.description}</p> */}
      <div className={styles.ContBox}>
        <div className={styles.Info}>
          <p>Name :</p>
          <p> Jishnu</p>
        </div>
        <div className={styles.Info}>
          <p>Phone :</p>
          <p> 2130312290231</p>
        </div>
        <div className={styles.Info}>
          <p>Rating :</p>
          <Star val={2} />
        </div>
      </div>
      {/* <button className={styles.Button2}>Remove</button> */}

      {/* {JSON.stringify(isAddedPaper(val.id))} */}
    </div>
  );
};
