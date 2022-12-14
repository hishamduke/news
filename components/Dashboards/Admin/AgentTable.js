import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { queryClient } from "../../../pages/_app";
import styles from "../../../styles/AgentTable.module.css";
import Image from "next/image";
import BackButton from "../../buttons/backButton";
import LocView from "../../common/LocView2";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export default function AgentTable() {
  console.log("tabless");
  const [animationParent] = useAutoAnimate();
  const [viewMap, setViewmap] = useState(false);

  const [butload, setButload] = useState(false);
  const { isLoading, error, data } = useQuery(["agentsDetails"], () =>
    fetch("/api/admin/agentstatus").then((res) => res.json())
  );

  const addTodo = (id) => axios.post("/api/admin/disapprove", id);
  const disapprove = useMutation(addTodo, {
    onSuccess: async () => {
      queryClient.invalidateQueries(["agentStatus"]);
      queryClient.invalidateQueries(["agentsDetails"]);
      setButload(false);
    },
  });

  const addTodo2 = (id) => axios.post("/api/admin/approve", id);

  const approve = useMutation(addTodo2, {
    onMutate: async () => {},
    onSuccess: async () => {
      queryClient.invalidateQueries(["agentStatus"]);
      queryClient.invalidateQueries(["agentsDetails"]);
      setButload(false);
    },
  });

  if (isLoading) return <>loading</>;
  console.log(viewMap);
  return (
    <>
      {/* {butload && (
        <div className={styles.Loading}>
          <div className={styles.LoadingText}>
            <div>Loading please wait..</div>
          </div>
        </div>
      )} */}

      <div>
        {disapprove.isError || approve.error ? (
          <div>
            An error occurred: {disapprove.error?.message}
            {approve.error?.message}
          </div>
        ) : null}
      </div>
      {data.length == 0 ? (
        <>
          <div
            className={styles.Nofeed}
            style={{ textAlign: "center", fontSize: 30 }}
          >
            There are no Agents yet!
          </div>
        </>
      ) : (
        <div className={styles.Base}>
          <div className={styles.In}>
            {/* {JSON.stringify(data)} */}
            <table className={styles.Table} cellSpacing={0} cellPadding={0}>
              <thead className={styles.TableHead}>
                <tr className={styles.Tr}>
                  <th colSpan="20" className={styles.MainHead}>
                    Agents list
                  </th>
                </tr>

                <tr className={styles.Tr} key="head">
                  <th className={styles.Td}>Name</th>
                  <th className={styles.Td}>Email</th>
                  <th className={styles.Td}>Number</th>
                  <th className={styles.Td}>Location</th>
                  <th className={styles.Td}>Status</th>
                  <th className={styles.Td}>Approve?</th>
                </tr>
              </thead>
              <tbody>
                {data.map((val) => (
                  <tr className={styles.Tr} key={val.id}>
                    <td className={styles.Td}>{val.name}</td>
                    <td className={styles.Td}>{val.email}</td>
                    <td className={styles.Td}>{val.num}</td>
                    <td className={styles.Td}>
                      {/* lat:{JSON.parse(val.loc).lat}
                      <br />
                      lng:{JSON.parse(val.loc).lng} */}
                      <a className="Link" onClick={() => setViewmap(val.loc)}>
                        click here to view
                        {console.log(JSON.parse(val.loc))}
                      </a>
                    </td>
                    <td className={styles.Td}>
                      {!val.app ? "Not approved" : "Approved"}
                    </td>
                    <td className={styles.Td}>
                      {!val.app ? (
                        <>
                          <button
                            className={styles.Button}
                            onClick={() => {
                              setButload(!butload);
                              approve.mutate({ id: val.id });
                            }}
                          >
                            <div
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              {butload && (
                                <Image
                                  src={"/spinner.svg"}
                                  height={"30px"}
                                  width={"30px"}
                                />
                              )}
                              Approve
                            </div>
                          </button>
                        </>
                      ) : (
                        <button
                          className={styles.Button}
                          onClick={() => {
                            setButload(!butload);
                            // setStatus("Loading....");
                            disapprove.mutate({ id: val.id });
                          }}
                        >
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            {butload && (
                              <Image
                                src={"/spinner.svg"}
                                height={"30px"}
                                width={"30px"}
                              />
                            )}
                            Disapprove
                          </div>
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <div ref={animationParent}>
        {viewMap && (
          <div className={styles.Loading} key={viewMap}>
            <div className={styles.Map}>
              <LocView setViewmap={setViewmap} loc={viewMap} />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
