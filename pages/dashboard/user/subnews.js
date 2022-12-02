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
      <NewsMain />
    </>
  );
}
function NewsMain() {
  const [animationParent] = useAutoAnimate();
  const [visible, setVisible] = useState(false);
  const [lang, setLang] = useState("English");
  const { isLoading, error, data } = useQuery(["Langs"], () =>
    fetch("/api/admin/newslang").then((res) => res.json())
  );
  if (data)
    return (
      <>
        <form>
          <h2 style={{ textAlign: "center" }}> Available newspapers</h2>
          {/* {JSON.stringify(data)} */}
        </form>

        <div className={styles.Base}>
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
            <NewsOf lang={lang} />
          </div>
        </div>
      </>
    );
}
function NewsOf({ lang }) {
  const { isLoading, error, data } = useQuery(["allnews"], () =>
    fetch("/api/user/listnews").then((res) => res.json())
  );
  return (
    <>
      {JSON.stringify(data)}
      {lang}
      "hmmm"
    </>
  );
}

// const Box = ({ name, phone, rating, loc, id, current }) => {
//   const handleSet = () => {
//     axios.post("/api/user/setAgent", { id, in: true });
//     queryClient.invalidateQueries("allagents");
//     alert("Successfully chosen");
//   };
//   const handleOut = () => {
//     axios.post("/api/user/setAgent", { id, in: false });
//     queryClient.invalidateQueries("allagents");
//     alert("Successfully opted out");
//   };
//   return (
//     <div className={styles.NewsBox}>
//       {/* {console.log(val)} */}

//       <h1 className={styles.Heading}>Agent Details</h1>
//       {/* <img className={styles.NewsImg} src={val.img} /> */}
//       {/* <p style={{ textAlign: "center" }}>{val.description}</p> */}
//       <div className={styles.ContBox}>
//         <div className={styles.Info}>
//           <p>Name :</p>
//           <p> {name}</p>
//         </div>
//         <div className={styles.Info}>
//           <p>Phone :</p>
//           <p> {phone}</p>
//         </div>
//         <div className={styles.Info}>
//           <p>Rating :</p>
//           <Star val={rating} />
//         </div>
//         <div className={styles.Info}>
//           <p>location :</p>

//           <LocName lat={JSON.parse(loc).lat} lng={JSON.parse(loc).lng} />
//         </div>
//         <div className={styles.Info} style={{ margin: "auto" }}>
//           {current ? (
//             <button onClick={() => handleOut()}>opt-out</button>
//           ) : (
//             <button onClick={() => handleSet()}>choose</button>
//           )}
//         </div>
//       </div>
//       {/* <button className={styles.Button2}>Remove</button> */}

//       {/* {JSON.stringify(isAddedPaper(val.id))} */}
//     </div>
//   );
// };

// const LocName = ({ lat, lng }) => {
//   // {"lat":11.553216976538248,"lng":75.75868013197568}
//   const { isLoading, error, data } = useQuery([`loc${lat + lng}`], () =>
//     fetch(
//       "https://www.mapquestapi.com/geocoding/v1/reverse?key=G1moSFJkXvMTf7kCVqTOPMh1SxtvJaGi&location=" +
//         lat +
//         "%2C" +
//         lng +
//         "&outFormat=json&thumbMaps=false"
//     ).then((res) => res.json())
//   );

//   if (data)
//     if (data.results)
//       return (
//         <>
//           {/* {console.log(data.results[0].locations)} */}
//           {data.results[0].locations[0].street +
//             " " +
//             data.results[0].locations[0].adminArea5}
//           {/* {console.log(data.results[0].locations[0])} */}
//         </>
//       );
//   return "loading";
// };
