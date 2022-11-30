import { useRouter } from "next/router";
import { useQuery, useMutation } from "@tanstack/react-query";
import { BiArrowBack } from "react-icons/bi";
import { useState } from "react";
import styles from "../../../styles/ManagePapers.module.css";
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
            Add new
          </p>
          <p className="Link" onClick={() => setvis(1)} style={styles2}>
            Show available
          </p>
        </div>
      </div>
      {vis == 0 ? <AddNew id={id} /> : <ShowAv />}
    </>
  );
};
const AddNew = (id) => {
  const yep = true;

  const { isLoading, error, data } = useQuery([`news${id.id}`], () =>
    fetch(`/api/agent/shownews/${id.id}`).then((res) => res.json())
  );
  const addTodo = (id) => axios.post("/api/agent/empPaperMutate", id);

  const addMutation = useMutation(
    (id) => {
      return axios.post("/api/agent/empPaperMutate", { id, add: true });
    },
    {
      onSettled: async () => {
        queryClient.invalidateQueries([`news${id.id}`]);
      },
    }
  );
  const removeMutation = useMutation(
    (id) => {
      return axios.post("//api/agent/empPaperMutate", { id, add: false });
    },
    {
      onSettled: async () => {
        queryClient.invalidateQueries([`news${id.id}`]);
      },
    }
  );

  const disapprove = useMutation(addTodo, {
    onSuccess: async () => {},
  });
  const handleadd = () => {
    console.log("hi");
    disapprove.mutate();
  };
  if (data)
    return (
      <>
        {JSON.stringify(data)}
        <div className="dashboard">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
              marginTop: "15px",
            }}
          >
            {data.newspapers.map((val) => (
              <div className={styles.NewsBox} key={val}>
                <h1 className={styles.NewsName}>{val.name.toUpperCase()}</h1>
                <img className={styles.NewsImg} src={val.img} />
                <p style={{ textAlign: "center" }}>{val.language}</p>
                <button
                  onClick={() => {
                    handleadd();
                  }}
                >
                  add
                </button>
                {/* {JSON.stringify(isAddedPaper(val.id))} */}
              </div>
            ))}
          </div>
        </div>
      </>
    );
};

const ShowAv = ({ setVisible }) => {
  return <div className="dashboard">hey</div>;
};
export default NewsEmp;
