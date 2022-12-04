import BackButton from "../../../../components/buttons/backButton";
import { useState } from "react";
import { queryClient } from "../../../_app";
import { useQuery } from "@tanstack/react-query";
import NoNewspapersAdded from "../../../../components/Dashboards/Agent/NoNewspapersAdded";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import styles from "../../../../styles/ManagePapers.module.css";

export default function Show() {
  return (
    <>
      <BackButton />
      <AddedNews />
    </>
  );
}
function AddedNews() {
  const [lang, setLang] = useState("English");
  const [show, setShow] = useState(true);

  const { isLoading, error, data } = useQuery(["Langs"], () =>
    fetch("/api/admin/newslang").then((res) => res.json())
  );
  if (data)
    return (
      <>
        <div className="dashboard">
          <div
            className="collumn"
            style={{ justifyContent: "center", margin: "auto" }}
          >
            <form
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <h4 style={{ textAlign: "center" }}>List added Newspapers</h4>
              <div style={{ margin: "auto", display: "flex", gap: "10px" }}>
                <label>Language</label>
                <br />
                <select
                  name="lang"
                  id="lang"
                  style={{
                    // width: "60%",
                    fontSize: "1rem",
                    padding: "1%",
                  }}
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
            </form>
          </div>
        </div>
        <ShowPapers lang={lang} />
      </>
    );
}

function ShowPapers({ lang }) {
  const [animationParent] = useAutoAnimate();

  const { isLoading, error, data } = useQuery([`AgentPapers${lang}`], () =>
    fetch("/api/agent/viewaddedpapers", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(lang),
    }).then((res) => res.json())
  );
  if (!data) return;
  let isPaperExist = !!data.length;
  console.log(data.length);
  if (!isPaperExist) return <NoNewspapersAdded />;
  else
    return (
      <>
        <div
          ref={animationParent}
          style={{
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
            marginTop: "15px",
            gap: "2rem",
          }}
        >
          {data.map((val) => (
            <div className={styles.NewsBox} key={val}>
              {/* {console.log(val)} */}
              <h1 className={styles.NewsName}>{val.name.toUpperCase()}</h1>
              <img className={styles.NewsImg} src={val.img} />
              <p style={{ textAlign: "center" }}>{val.description}</p>

              {/* {JSON.stringify(isAddedPaper(val.id))} */}
            </div>
          ))}
        </div>
      </>
    );
}
