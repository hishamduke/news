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
export default function SubNews() {
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
        <div className="dashboard">
          {data.map((val) => (
            <div key={val.id}>
              {val.language == lang && (
                <>
                  <Box val={val} />

                  {flip()}
                  {/* seting to nonEmpty for given language */}
                </>
              )}
            </div>
          ))}
        </div>
        {isEmpty && <NoPapers lang={lang} />}
      </>
    );
}

const Box = ({ val }) => {
  const handleOut = (id) => {
    Router.push(`/dashboard/user/subnews/${id}`);
  };

  const { loading, data } = useQuery([`rating${val.id}`], () =>
    fetch(`/api/user/rating/newsaverage/${val.id}`).then((res) => res.json())
  );
  //PRECACHING subscription info
  const { loading: loading2, data: isSub } = useQuery([`isSub${val.id}`], () =>
    fetch(`/api/user/isSub/${val.id}`).then((res) => res.json())
  );

  return (
    <div className={styles.NewsBox} style={{ height: "40vh" }}>
      {/* <h1 className={styles.Heading}>Newspaper Details</h1> */}

      <div className={styles.ContBox}>
        <img className={styles.NewsImg} src={val.img} />
        <p className={styles.Info}>{val.name}</p>
        <p style={{ maxHeight: "4vh", overflow: "hidden" }}>
          {" "}
          {val.description}
        </p>
        {/* <StarIcon rating={data} /> */}
        <Star val={data} />
        <div className={styles.Info}>
          <button onClick={() => handleOut(val.id)}>Subscribe</button>
        </div>
      </div>
    </div>
  );
};

// function StarIcon({ rating }) {
//   const starEmpty = "☆";
//   const starFilled = "★";
//   let out = "";
//   for (let i = 0; i < 5; i++) {
//     if (i < Math.floor(rating)) {
//       out = out + starFilled;
//     } else out = out + starEmpty;
//   }
//   return (
//     <>
//       <p style={{ fontSize: "1.5rem" }}>{out}</p>
//     </>
//   );
// }
