import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { queryClient } from "../../../pages/_app";
import styles from "../../../styles/AgentTable.module.css";
import Image from "next/image";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export default function AgentTable() {
  console.log("tabless");
  const listRef = useAutoAnimate();
  const [status, setStatus] = useState();

  const [butload, setButload] = useState(false);
  const { isLoading, error, data } = useQuery(["agentsDetails"], () =>
    fetch("/api/admin/agentstatus").then((res) => res.json())
  );

  const addTodo = (id) => axios.post("/api/admin/disapprove", id);
  const disapprove = useMutation(addTodo, {
    onSuccess: async () => {
      setTimeout(() => {
        setButload(false);
      }, 500);
      setTimeout(() => {
        queryClient.invalidateQueries(["agentsDetails"]);
      }, 700);
    },
  });

  const addTodo2 = (id) => axios.post("/api/admin/approve", id);

  const approve = useMutation(addTodo2, {
    onMutate: async () => {},
    onSuccess: async () => {
      setTimeout(() => {
        setButload(false);
      }, 500);
      setTimeout(() => {
        queryClient.invalidateQueries(["agentsDetails"]);
      }, 700);
    },
  });

  if (isLoading) return <>loading</>;

  return (
    <>
      <div ref={listRef}>
        {disapprove.isError || approve.error ? (
          <div>
            An error occurred: {disapprove.error?.message}
            {approve.error?.message}
          </div>
        ) : null}
      </div>
      <div className={styles.Base}>
        <div className={styles.In}>
          {/* {JSON.stringify(data)} */}

          <table className={styles.Table} cellspacing={0} cellpadding={0}>
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
                  <td className={styles.Td}>{val.loc}</td>
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
                            setStatus("Loading....");
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
                          setStatus("Loading....");
                          disapprove.mutate({ id: val.id });
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center" }}>
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
          <div ref={listRef}>
            {disapprove.isLoading || approve.isLoading ? (
              <p>
                {" "}
                <br />
                Loading....
              </p>
            ) : (
              ""
            )}
            <br />
          </div>
        </div>
      </div>
    </>
  );
}
