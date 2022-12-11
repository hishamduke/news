import Router from "next/router";
import axios from "axios";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Image from "next/image";
import Logout from "../../components/buttons/logoutbutton";
import styles from "../../styles/SubscriptionsEmp.module.css";
import Link from "next/link";
import BackButton from "../../components/buttons/backButton";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import LocView from "../../components/common/LocView";
// import Logout from "../buttons/logoutbutton";
export default function Dashboard(yea) {
  const d = new Date();
  const day = d.getDate();
  const year = d.getFullYear();
  const month = d.getMonth();
  return (
    <>
      <BackButton />
      <div className="collumns">
        {/* {JSON.stringify(data)} */}
        <div className="dashboard" style={{ gap: "10rem" }}>
          <form>
            <h1 className={"formhead test"}>Current subscriptions</h1>
            <p
              style={{
                // backgroundColor: "red",
                margin: "2rem",
                textAlign: "center",
              }}
            >
              for the day {day}/{month}/{year}{" "}
            </p>
          </form>
        </div>
      </div>
      <SubTable />
    </>
  );
}

function SubTable() {
  const { isLoading, error, data } = useQuery(["empSubs"], () =>
    fetch("/api/employees/subscriptions").then((res) => res.json())
  );

  if (data)
    return (
      <>
        <div className="dashboard">
          <table
            className={styles.Table}
            cellSpacing={0}
            cellPadding={0}
            style={{ marginInline: "4rem" }}
          >
            <thead className={styles.TableHead}>
              <tr className={styles.Tr}>
                <th className={styles.Td}>ID</th>
                <th className={styles.Td}>Username</th>
                <th className={styles.Td}>Newspaper</th>
                <th className={styles.Td}>Location</th>
                <th className={styles.Td}>Devivered today?</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td className={styles.Td}>{item.id}</td>
                  <td className={styles.Td}>
                    <Username id={item.userId} />
                  </td>
                  <td className={styles.Td}>
                    <Newspaper id={item.newspaperId} />
                  </td>
                  <td className={styles.Td}>
                    {/* lat:{JSON.parse(val.loc).lat}
                      <br />
                      lng:{JSON.parse(val.loc).lng} */}
                    <Loc id={item.userId} />
                  </td>
                  <td className={styles.Td}>
                    <Delivery id={item.userId} news={item.newspaperId} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* {data.map((item) => (
          <>
            <div key={item.id}>
              <div className={styles.NewsBox} key={item.id}>
                <h1 style={{ fontSize: "1.5rem" }} className={styles.NewsName}>
                  {item.name}
                </h1>
                <img className={styles.NewsImg} src="/newsillu2.webp" />
                <div style={{ marginBottom: "2rem" }}>
                  <Link href={`mailto:${item.email}`}>
                    <p
                      className="Link newa"
                      style={{ fontSize: "1.2rem", margin: "0.1rem" }}
                    >
                      {" "}
                      {item.email}
                    </p>
                  </Link>
                  <Link href={`Tel:${item.num}`}>
                    <p
                      className="newa Link"
                      style={{ fontSize: "1.2rem", margin: "0.1rem" }}
                    >
                      {" "}
                      {item.num}
                    </p>
                  </Link>
                </div>
              </div>
            </div>
          </>
        ))} */}
        </div>
        <p
          style={{
            fontFamily: "arial",
            lineHeight: "3rem",
          }}
        >
          {JSON.stringify(data)}
        </p>{" "}
      </>
    );
}

function Username(id) {
  const { isLoading, error, data } = useQuery([`uname${id.id}`], () =>
    axios
      .post("/api/employees/usernameId", { id: id.id })
      .then((res) => res.data.name)
  );
  console.log(data);
  if (data) return <> {data}</>;
  return <>Loading</>;
}

function Newspaper(id) {
  const { isLoading, error, data } = useQuery([`news${id.id}`], () =>
    axios
      .post("/api/employees/newspaperId", { id: id.id })
      .then((res) => res.data.name)
  );
  console.log(data);
  if (data) return <> {data}</>;
  return <>Loading</>;
}

function Loc(id) {
  const { isLoading, error, data } = useQuery([`loc${id.id}`], () =>
    axios
      .post("/api/employees/usernameId", { id: id.id })
      .then((res) => res.data.loc)
  );
  const [animationParent] = useAutoAnimate();
  const [viewMap, setViewmap] = useState(false);
  if (data)
    return (
      <>
        <a className="Link" onClick={() => setViewmap(!viewMap)}>
          click here to view
          {console.log(JSON.parse(data))}
        </a>

        <div ref={animationParent}>
          {viewMap && (
            <div className={styles.Loading}>
              <div className={styles.Map}>
                <LocView
                  setViewmap={setViewmap}
                  loc={JSON.parse(data)}
                  zoomInp={15}
                />
              </div>
            </div>
          )}
        </div>
      </>
    );
}

function Delivery({ id, news }) {
  const feedbackdel = (state) =>
    axios.post("/api/employees/deliveryMutate", { userId: id, news, state });
  const mutate = useMutation(feedbackdel, {
    // onSuccess: async () => {
    //   setTimeout(() => {}, 800);
    //   setTimeout(() => {}, 700);
    // },
  });
  const d = new Date();
  const day = d.getDate();
  const year = d.getFullYear();
  const month = d.getMonth();

  const { isLoading, error, data } = useQuery([`del${id}${news}`], () =>
    axios.post("/api/employees/delivery", { id, news }).then((res) => res.data)
  );

  console.log("hihi " + data);
  return (
    <>
      <input
        type={"checkbox"}
        onChange={(e) => {
          mutate.mutate(e.target.checked);
          console.log(e.target.checked);
        }}
      />
    </>
  );
}
