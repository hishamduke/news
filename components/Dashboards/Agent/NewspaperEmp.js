import { useRouter } from "next/router";
import { useQuery, useMutation } from "@tanstack/react-query";
import { BiArrowBack } from "react-icons/bi";
import { useState } from "react";
import styles from "../../../styles/ManagePapers.module.css";
import { queryClient } from "../../../pages/_app";
import axios from "axios";
const NewsEmp = ({ setVisible }) => {
  const router = useRouter();
  const { id } = router.query;
  const [vis, setvis] = useState(0);
  const { isLoading, error, data } = useQuery([`employee${id}`], () =>
    fetch(`/api/agent/employees/${id}`).then((res) => res.json())
  );

  const styles1 = {
    padding: "5px",
    backgroundColor: vis == 0 && "#ffccff85",
    textDecoration: vis == 0 && "underline",
    transition: "all 0.7s",
  };

  const styles2 = {
    padding: "5px",
    backgroundColor: vis == 1 && "#ffccff85",
    textDecoration: vis == 1 && "underline",
    transition: "all 0.7s",
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <p
          style={{
            fontSize: "medium",
            width: "fit-content",
            alignSelf: "center",
          }}
          className="zoom"
          onClick={() => {
            setVisible(0);
          }}
        >
          {<BiArrowBack />} back
        </p>
      </div>
      <h1 className={"formhead test"} style={{ textAlign: "center" }}>
        Newspapers of Employee - {data.name}
      </h1>
      <div
        className="dashboard"
        style={{ fontSize: "1.5rem", marginTop: "1.5rem" }}
      >
        <div style={{ display: "flex", gap: "2rem" }}>
          <p className="Link" onClick={() => setvis(0)} style={styles1}>
            Manage
          </p>
          <p className="Link" onClick={() => setvis(1)} style={styles2}>
            Show available
          </p>
        </div>
      </div>
      {vis == 0 ? <AddNew id={id} /> : <ShowAv id={id} />}
    </>
  );
};
const AddNew = (id) => {
  const yep = true;

  const { isLoading, error, data } = useQuery([`news${id.id}`], () =>
    fetch(`/api/agent/shownews/${id.id}`).then((res) => res.json())
  );

  const { loading: loading2, data: data2 } = useQuery([`empnews`], () =>
    fetch(`/api/agent/empnews/${id.id}`).then((res) => res.json())
  );

  const addMutation = useMutation(
    (newsid) => {
      return axios.post("/api/agent/empPaperMutate", {
        id: id.id,
        add: true,
        newsid,
      });
    },
    {
      onSettled: async () => {
        queryClient.invalidateQueries(`news${id.id}`);
      },
      onSuccess: async () => {
        queryClient.invalidateQueries(`news${id.id}`);
      },
    }
  );
  const removeMutation = useMutation(
    (newsid) => {
      return axios.post("/api/agent/empPaperMutate", {
        id: id.id,
        add: false,
        newsid,
      });
    },
    {
      onSettled: async () => {
        queryClient.invalidateQueries(`news${id.id}`);
      },
      onSuccess: async () => {
        queryClient.invalidateQueries(`news${id.id}`);
      },
    }
  );

  const handleAdd = (newsid) => {
    console.log("hi");
    addMutation.mutate(newsid);
  };
  const handleRem = (newsid) => {
    console.log("hi");
    removeMutation.mutate(newsid);
  };

  if (data && data2) {
    const isAdded = (id) => {
      let flag = false;
      for (let i = 0; i < data2.newspapers.length; i++) {
        if (data2.newspapers[i].id == id) return true;
      }
      return false;
    };
    return (
      <>
        <div className="dashboard">
          {/* Language */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
              marginTop: "15px",
              gap: "2rem",
            }}
          >
            {data.newspapers.map((val) => (
              <div className={styles.NewsBox} key={val.id}>
                <h1 className={styles.NewsName}>{val.name.toUpperCase()}</h1>
                <img className={styles.NewsImg} src={val.img} />
                <p style={{ textAlign: "center" }}>{val.language}</p>
                {!isAdded(val.id) ? (
                  <button
                    onClick={() => {
                      handleAdd(val.id);
                    }}
                  >
                    add
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      handleRem(val.id);
                    }}
                  >
                    remove
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }
};

const ShowAv = ({ id }) => {
  const { isLoading, error, data } = useQuery([`empnews`], () =>
    fetch(`/api/agent/empnews/${id}`).then((res) => res.json())
  );
  if (data.newspapers)
    return (
      <>
        <div className="dashboard">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
              marginTop: "15px",
              gap: "2rem",
            }}
          >
            {data.newspapers.map((val) => (
              <div className={styles.NewsBox} key={val}>
                <h1 className={styles.NewsName}>{val.name.toUpperCase()}</h1>
                <img className={styles.NewsImg} src={val.img} />
                <p style={{ textAlign: "center" }}>{val.language}</p>

                {/* {JSON.stringify(isAddedPaper(val.id))} */}
              </div>
            ))}
          </div>
        </div>
      </>
    );
};
export default NewsEmp;
