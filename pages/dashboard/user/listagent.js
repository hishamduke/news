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
import { cordToStreet } from "../../../lib/cordToStreet";
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
  const [msg, setMsg] = useState(false);
  const { isLoading, error, data } = useQuery(["allagents"], () =>
    fetch("/api/user/viewagents").then((res) => res.json())
  );
  if (isLoading) return;
  if (data)
    return (
      <>
        {msg && (
          <div>
            <h2 style={{ textAlign: "center", color: "#bb0000" }}>
              Successfully selected, redirecting please wait..
            </h2>
          </div>
        )}
        <form ref={animationParent}>
          <h2 style={{ textAlign: "center" }}> Available Agents</h2>

          {/* {JSON.stringify(data)} */}
        </form>
        <div className="collumns">
          <div className="dashboard" ref={animationParent}>
            <div className="collumns">
              {/* <Box name="Jishnu" phone="9923323222" rating={3} /> */}
              {data.map((val) => (
                <div key={val.id}>
                  {/* {JSON.stringify(val)} */}
                  <Box
                    name={val.name}
                    phone={val.num}
                    loc={val.loc}
                    id={val.id}
                    current={val.currentAgent}
                    setMsg={setMsg}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    );
}

const Box = ({ name, phone, loc, id, current, setMsg }) => {
  const handleSet = () => {
    axios.post("/api/user/setAgent", { id, in: true });
    queryClient.invalidateQueries(["allagents"], ["allnews"], ["hasAgent"]);

    setMsg(true);
    setTimeout(() => {
      Router.back();
    }, 1000);
  };
  const handleOut = () => {
    axios.post("/api/user/setAgent", { id, in: false });
    queryClient.invalidateQueries(["allagents"], ["allnews"], ["hasAgent"]);

    setMsg(true);
    setTimeout(() => {
      Router.back();
    }, 1000);
  };
  const {
    isLoading,
    error,
    data: rating,
  } = useQuery([`agentrating${id}`], () =>
    fetch(`/api/user/rating/agentaverage/${id}`).then((res) => res.json())
  );

  return (
    <div className={styles.NewsBox} style={{ height: "30vh" }}>
      <div className={styles.ContBox}>
        <h1 className={styles.Heading}>Agent Details</h1>
        <p className={styles.Info}>Name : {name}</p>
        <p className={styles.Info}>Phone :{phone}</p>
        <Star val={rating} />
        <p className={styles.Info}>
          location :
          <LocName lat={JSON.parse(loc).lat} lng={JSON.parse(loc).lng} />
        </p>
        <div className={styles.Info} style={{ margin: "auto" }}>
          {current ? (
            <button onClick={() => handleOut()}>opt-out</button>
          ) : (
            <button onClick={() => handleSet()}>choose</button>
          )}
        </div>
      </div>

      {/* <button className={styles.Button2}>Remove</button> */}
      {/* {JSON.stringify(isAddedPaper(val.id))} */}
    </div>
  );
};

const LocName = ({ lat, lng }) => {
  // {"lat":11.553216976538248,"lng":75.75868013197568}
  const { isLoading, error, data } = useQuery([`loc${lat + lng}`], () =>
    fetch(
      "https://www.mapquestapi.com/geocoding/v1/reverse?key=G1moSFJkXvMTf7kCVqTOPMh1SxtvJaGi&location=" +
        lat +
        "%2C" +
        lng +
        "&outFormat=json&thumbMaps=false"
    ).then((res) => res.json())
  );

  if (data)
    if (data.results)
      return (
        <>
          {/* {console.log(data.results[0].locations)} */}
          {data.results[0].locations[0].street +
            " " +
            data.results[0].locations[0].adminArea5}
          {/* {console.log(data.results[0].locations[0])} */}
        </>
      );
  return "loading";
};
