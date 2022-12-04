import BackButton from "../../../../components/buttons/backButton";
import { queryClient } from "../../../_app";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "../../../../styles/ManagePapers.module.css";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import NoNewspapers from "../../../../components/Dashboards/Agent/NoNewspapers";

export default function Show() {
  const [lang, setLang] = useState("English");
  const [show, setShow] = useState(true);

  const { isLoading, error, data } = useQuery(["Langs"], () =>
    fetch("/api/admin/newslang").then((res) => res.json())
  );
  if (data)
    return (
      <>
        <BackButton />
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
              <h4 style={{ textAlign: "center" }}>Add new Newspaper</h4>
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
  const addMutation = useMutation(
    (id) => {
      return axios.post("/api/agent/agentPaperMutate", { id, add: true });
    },
    {
      onSettled: async () => {
        queryClient.invalidateQueries([`AgentPapers${lang}`]);
        queryClient.invalidateQueries([`AgentAddedPapers${lang}`]);
      },
    }
  );
  const removeMutation = useMutation(
    (id) => {
      return axios.post("/api/agent/agentPaperMutate", { id, add: false });
    },
    {
      onSettled: async () => {
        queryClient.invalidateQueries([`AgentPapers${lang}`]);
        queryClient.invalidateQueries([`AgentAddedPapers${lang}`]);
      },
    }
  );
  const { isLoading, error, data } = useQuery([`AgentPapers${lang}`], () =>
    fetch("/api/agent/viewpapers", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(lang),
    }).then((res) => res.json())
  );
  const {
    data: otherData,
    loading: otherLoading,
    error: otherError,
  } = useQuery([`AgentAddedPapers${lang}`], () =>
    fetch("/api/agent/viewaddedpapers", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(lang),
    }).then((res) => res.json())
  );

  const isAddedPaper = (id) => {
    console.log(otherData);
    if (!otherData) return false;
    for (let i = 0; i < otherData.length; i++) {
      if (otherData[i].id == id) {
        console.log(true);
        return true;
      }
    }
    console.log(false);
    return false;
  };

  if (data)
    return (
      <>
        {!data.length && <NoNewspapers />}

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
              {isAddedPaper(val.id) ? (
                <button
                  style={{ textAlign: "center" }}
                  onClick={() => {
                    removeMutation.mutate({ id: val.id });
                    // console.log(val.id);
                  }}
                >
                  Remove
                </button>
              ) : (
                <button
                  style={{ textAlign: "center" }}
                  onClick={() => {
                    addMutation.mutate({ id: val.id });
                    // console.log(val.id);
                  }}
                >
                  Add
                </button>
              )}
              {/* {JSON.stringify(isAddedPaper(val.id))} */}
            </div>
          ))}
        </div>

        {/* {data} */}
      </>
    );
}
