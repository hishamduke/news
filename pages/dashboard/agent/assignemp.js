import BackButton from "../../../components/buttons/backButton";
import { useState } from "react";
import { queryClient } from "../../_app";
import { useQuery } from "@tanstack/react-query";
import NoNewspapersAdded from "../../../components/Dashboards/Agent/NoNewspapersAdded";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import styles from "../../../styles/ManagePapers.module.css";
import axios from "axios";
import Link from "next/link";
export default function Show() {
  return (
    <>
      <BackButton />
      <AddedNews />
    </>
  );
}
function AddedNews() {
  const [emp, setEmp] = useState(true);
  const [show, setShow] = useState(true);
  const [animationParent] = useAutoAnimate();
  const { isLoading, error, data } = useQuery(["usersEmpData"], () =>
    fetch("/api/agent/users/all").then((res) => res.json())
  );
  if (data)
    return (
      <>
        {/* {JSON.stringify(data)} */}
        <div className="dashboard" ref={animationParent}>
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
              <h4 style={{ textAlign: "center" }}>List Users</h4>
              <div
                style={{
                  margin: "auto",
                  display: "flex",
                  gap: "1px",
                }}
              >
                <label style={{ width: "150px" }}>Users with</label>

                <select
                  name="lang"
                  id="lang"
                  style={{
                    // width: "60%",
                    fontSize: "1rem",
                    padding: "1%",
                  }}
                  defaultValue={emp}
                  onChange={(e) => {
                    setEmp((emp) => !emp);
                    queryClient.invalidateQueries(["users"]);
                  }}
                >
                  <option value={true}> Employees</option>
                  <option value={false}>No Employees</option>
                </select>
              </div>
            </form>
          </div>
        </div>
        <ShowPapers emp={emp} />
      </>
    );
}

function ShowPapers({ emp }) {
  const { isLoading, error, data } = useQuery(["usersEmpData"], () =>
    fetch("/api/agent/users/all").then((res) => res.json())
  );
  console.log("show");
  console.log(emp);
  const [animationParent] = useAutoAnimate();
  const [isModal, setIsModal] = useState(false);
  const [count, setCount] = useState(0);
  const [modalId, setModalId] = useState(null);

  if (data) {
    let data2 = [];
    for (let i = 0; i < data.length; i++) {
      console.log(!!data[i].employeeId);
      if (!!data[i].employeeId == emp) {
        data2[data2.length] = data[i];
        console.log(data[i]);
      }
    }
    let flag = false;
    data.map((item) => {
      if (!!item.employeeId == emp) {
        flag = true;
      }
    });

    const handleRevoke = (id) => {
      axios.post("/api/user/emp/revoke", { id }).then({});
      queryClient.invalidateQueries(["usersEmpData"]);
      setTimeout(() => {
        queryClient.invalidateQueries(["usersEmpData"]);
      }, 100);
      // alert(userId);
    };
    const handleSet = (userId) => {
      // alert(userId);
      setModalId(userId);
    };
    return (
      //   <div ref={animationParent}>

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
        {data.map((item) =>
          !!item.employeeId == emp ? (
            <div key={item.id}>
              <div className={styles.NewsBox} key={item.id}>
                <h1 className={styles.NewsName}>{item.name.toUpperCase()}</h1>
                <img className={styles.NewsImg} src="/newsillu2.webp" />
                <Link href={`mailto:${item.email}`}>
                  <a className="newa"> {item.email}</a>
                </Link>
                <Link href={`Tel:${item.num}`}>
                  <a className="newa"> {item.num}</a>
                </Link>
                {emp ? (
                  <button
                    onClick={() => {
                      handleRevoke(item.id);
                    }}
                  >
                    revoke
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      handleSet(item.id);
                    }}
                  >
                    set
                  </button>
                )}
              </div>
            </div>
          ) : (
            " "
          )
        )}
        {!!modalId && <ChooseModal show={setModalId} id={modalId} />}
        {!flag && <h1 className="formhead">There are no users</h1>}
      </div>

      //   </div>
    );
  }
}

function ChooseModal({ show, id }) {
  const { isLoading, error, data } = useQuery(["employees"], () =>
    fetch("/api/agent/viewemployees").then((res) => res.json())
  );
  const [emp, setEmp] = useState(false);
  const [animationParent] = useAutoAnimate();

  const handleSet = () => {
    console.log("hi");
    axios.post("/api/user/emp/set", { id, emp }).then({});
    setTimeout(() => {
      queryClient.invalidateQueries(["usersEmpData"]);
      show(null);
    }, 100);
  };
  if (data) {
    if (!emp) setEmp(data[0].id);
    return (
      <div
        style={{
          // display: "none" /* Hidden by default */,
          position: "fixed" /* Stay in place */,
          zIndex: "1" /* Sit on top */,
          left: "0",
          top: "0",
          width: "100%" /* Full width */,
          height: "100%" /* Full height */,
          overflow: "auto" /* Enable scroll if needed */,
          backgroundColor: "rgb(0,0,0)" /* Fallback color */,
          backgroundColor: "rgba(0,0,0,0.4)",
          backdropFilter: "blur(2px)",
        }}
      >
        <form
          className="dashboard"
          style={{
            backgroundColor: "#f2f0e9",
            margin: "15% auto" /* 15% from the top and centered */,
            padding: "20px",
            border: "1px solid #888",
            width: "70%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.7rem",
            }}
            // ref={animationParent}2
          >
            <h4 style={{ textAlign: "center" }}>Select An Employee</h4>
            <div
              style={{
                margin: "auto",
                display: "flex",
                gap: "1px",
              }}
            >
              <label style={{ width: "150px" }}>Employees</label>
              <select
                name="lang"
                id="lang"
                style={{
                  // width: "60%",
                  fontSize: "1rem",
                  padding: "1%",
                }}
                defaultValue={data[0].id}
                onChange={(e) => {
                  setEmp(e.target.value);

                  queryClient.invalidateQueries(["users"]);
                }}
              >
                {data.map((val) => (
                  <option value={val.id} key={val.id}>
                    {val.name}
                  </option>
                ))}
              </select>
            </div>
            <ShowEmpDetails data={data} emp={emp} />
            <div
              style={{
                display: "flex",
                gap: "20px",
                justifyContent: "center",
              }}
            >
              <button
                type="button"
                onClick={() => {
                  handleSet();
                }}
              >
                Set
              </button>
              <button type="button" onClick={() => show(null)}>
                Close
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

function ShowEmpDetails({ data, emp }) {
  // console.log(data);
  // console.log(emp);
  const [animationParent] = useAutoAnimate();

  return (
    <>
      {console.log(data)}
      email :
      <p ref={animationParent}>
        {data.map(
          (item) =>
            item.id == emp && (
              <Link href={`mailto:${item.email}`} key={item.num + 1}>
                <p className="Link" style={{ margin: "0px" }}>
                  {item.email}
                </p>
              </Link>
            )
        )}
      </p>
      phone :
      <p ref={animationParent}>
        {data.map(
          (item) =>
            item.id == emp && (
              <Link href={`Tel:${item.email}`} key={item.num}>
                <p className="Link" style={{ margin: "0px" }}>
                  {item.num}
                </p>
              </Link>
            )
        )}
      </p>
      {/* <p>phone : {data[i].num}</p> */}
    </>
  );
}
