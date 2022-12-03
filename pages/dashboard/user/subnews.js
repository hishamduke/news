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
import NoPapers from "../../../components/Dashboards/User/NoPapers";
export default function employees() {
  return (
    <>
      <BackButton />
      <NewsMain />
    </>
  );
}
function NewsMain() {
  const [animationParent] = useAutoAnimate();
  const [visible, setVisible] = useState(false);
  // const [lang, setLang] = useState("English");
  const [lang, setLang] = useState("English");
  const { isLoading, error, data } = useQuery(["Langs"], () =>
    fetch("/api/admin/newslang").then((res) => res.json())
  );
  if (data)
    return (
      <>
        <form>
          <h2 style={{ textAlign: "center" }}> Available newspapers</h2>
        </form>

        <div className={styles.Base} style={{ marginBottom: "1rem" }}>
          {/* {JSON.stringify(lang)} */}
          <div className={styles.In}>
            <div className={styles.DivSelect}>
              <div> Select language</div>
              <select
                className={styles.Select}
                name="lang"
                id="lang"
                defaultValue={""}
                onChange={(e) => {
                  console.log(e.target.value);
                  setLang(e.target.value);
                  queryClient.invalidateQueries(["Newspapers"]);
                }}
              >
                {data.map((val) => (
                  <option value={val} key={val}>
                    {val}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <NewsOf lang={lang} />
      </>
    );
}
function NewsOf({ lang }) {
  const { isLoading, error, data } = useQuery(["allnews"], () =>
    fetch("/api/user/listnews").then((res) => res.json())
  );
  let isEmpty = true;
  function flip() {
    isEmpty = false;
  }
  if (data)
    return (
      <>
        {data.map((val) => (
          <>
            <div className="dashboard">
              <div className="collumns">
                {val.language == lang && (
                  <>
                    <Box val={val} />
                    {flip()}
                    {/* seting to nonEmpty for given language */}
                  </>
                )}
              </div>
            </div>
          </>
        ))}
        {isEmpty && <NoPapers lang={lang} />}
      </>
    );
}

const Box = ({ val }) => {
  const handleSet = () => {
    axios.post("/api/user/setAgent", { id, in: true });
    queryClient.invalidateQueries("allagents");
    alert("Successfully chosen");
  };
  const handleOut = () => {
    axios.post("/api/user/setAgent", { id, in: false });
    queryClient.invalidateQueries("allagents");
    alert("Successfully opted out");
  };
  return (
    <div className={styles.NewsBox}>
      <h1 className={styles.Heading}>Newspaper Details</h1>
      {/* <img className={styles.NewsImg} src={val.img} /> */}
      {/* <p style={{ textAlign: "center" }}>{val.description}</p> */}
      <div className={styles.ContBox}>
        <div className={styles.Info}>
          <p style={{ margin: "auto", padding: "0.5rem" }}> {val.name}</p>
        </div>
        <img
          className={styles.NewsImg}
          src={val.img}
          style={{ margin: "auto" }}
        />
        <p style={{ margin: "auto", padding: "0.5rem" }}> {val.description}</p>

        <div className={styles.Info} style={{ margin: "auto" }}>
          {/* {current ? ( */}
          <button onClick={() => handleOut()}>opt-out</button>
          {/* ) : ( */}
          {/* <button onClick={() => handleSet()}>choose</button> */}
          {/* )} */}
        </div>
      </div>
      {/* <button className={styles.Button2}>Remove</button> */}

      {/* {JSON.stringify(isAddedPaper(val.id))} */}
    </div>
  );
};