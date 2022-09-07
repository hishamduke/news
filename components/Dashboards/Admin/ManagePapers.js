import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState, useRef } from "react";
import { queryClient } from "../../../pages/_app";
import styles from "../../../styles/ManagePapers.module.css";
import Image from "next/image";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export default function ManagePapers() {
  console.log("tabless");
  const listRef = useAutoAnimate();
  const [status, setStatus] = useState();
  const [lang, setLang] = useState("English");

  const [butload, setButload] = useState(false);
  const { isLoading, error, data } = useQuery(["Langs"], () =>
    fetch("/api/admin/newslang").then((res) => res.json())
  );

  if (isLoading) return <>loading</>;

  // if (data) console.log(data);

  return (
    <>
      {butload && (
        <div className={styles.Loading}>
          <div className={styles.LoadingText}>
            <div>Loading please wait..</div>
          </div>
        </div>
      )}

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
          <NewsTable language={lang} />
        </div>
      </div>
    </>
  );
}
function NewsTable(val) {
  const lang = val.language;
  const [butload, setButload] = useState(false);
  const listRef = useAutoAnimate();

  const { isLoading, error, data } = useQuery(["Newspapers"], () =>
    fetch(`/api/admin/newspapers`).then((res) => res.json())
  );
  let newdata = [];
  if (data)
    for (let i = 0; i < data.length; i++) {
      console.log(data[i]);
      if (data[i].language == lang) newdata.push(data[i]);
      console.log("loop");
    }
  return (
    <>
      {/* {JSON.stringify(newdata.length)} */}

      <div className={styles.NewsCont}>
        {newdata.length ? (
          <>
            <div className={styles.NewsBox}>
              <img
                className={styles.NewsImg}
                src={"/newspapers/manorama.jpg"}
              />
              <p className={styles.NewsName}>Malayala Manorama</p>
            </div>
            <div className={styles.NewsBox}>
              <img
                className={styles.NewsImg}
                src={"/newspapers/manorama.jpg"}
              />
              <p className={styles.NewsName}>Malayala Manorama</p>
            </div>
            <div className={styles.NewsBox}>
              <img
                className={styles.NewsImg}
                src={"/newspapers/manorama.jpg"}
              />
              <p className={styles.NewsName}>Malayala Manorama</p>
            </div>
          </>
        ) : (
          <>
            <div
              className={styles.Nofeed}
              style={{ textAlign: "center", fontSize: 30 }}
            >
              There are no {lang} newspapers yet!
            </div>
          </>
        )}
      </div>
    </>
  );
}
