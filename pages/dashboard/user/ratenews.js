// import styles from "../../../styles/Empoyees.module.css";
import styles from "../../../styles/AgentScreen.module.css";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import BackButton from "../../../components/buttons/backButton";
import { useState } from "react";
import Router from "next/router";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../../_app";
import NoPapers from "../../../components/Dashboards/User/NoPapersSub";
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
  const { isLoading: isLoading2, data: hasAgent } = useQuery(["hasAgent"], () =>
    fetch("/api/user/hasagent").then((res) => res.json())
  );
  if (isLoading || isLoading2) return;
  if (!hasAgent) return <NoPapers />;

  if (data)
    return (
      <>
        <form>
          <h2 style={{ textAlign: "center" }}>Rate newspapers</h2>
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
  const { isLoading, error, data } = useQuery(["allSubbed"], () =>
    fetch("/api/user/listsubbed").then((res) => res.json())
  );
  let isEmpty = true;
  function flip() {
    isEmpty = false;
  }
  if (data)
    return (
      <>
        {/* {JSON.stringify(data)} */}
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
    Router.push(`/dashboard/user/ratenews/${id}`);
  };
  return (
    <div className={styles.NewsBox}>
      <h1 className={styles.Heading}>Newspaper Details</h1>

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
          <button onClick={() => handleOut(val.id)}>Rate</button>
        </div>
      </div>
    </div>
  );
};
