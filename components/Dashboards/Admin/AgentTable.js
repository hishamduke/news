import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { queryClient } from "../../../pages/_app";
import styles from "../../../styles/AgentTable.module.css";

import { useAutoAnimate } from "@formkit/auto-animate/react";

export default function AgentTable() {
  console.log("tabless");
  const listRef = useAutoAnimate();
  const [status, setStatus] = useState();
  const { isLoading, error, data } = useQuery(["agentsDetails"], () =>
    fetch("/api/admin/agentstatus").then((res) => res.json())
  );

  const addTodo = (id) => axios.post("/api/admin/disapprove", id);
  const disapprove = useMutation(addTodo, {
    onSuccess: async () => {
      queryClient.invalidateQueries();
    },
  });

  const addTodo2 = (id) => axios.post("/api/admin/approve", id);

  const approve = useMutation(addTodo2, {
    onMutate: async () => {},
    onSuccess: async () => {
      queryClient.invalidateQueries(["agentsDetails"]);
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

          <table className={styles.Table}>
            <thead className={styles.TableHead}>
              <tr className={styles.TableHead}>
                <th colSpan="20">Agents list</th>
              </tr>
              <tr key="head">
                <th>Name</th>
                <th>Email</th>
                <th>Number</th>
                <th>Location</th>
                <th>Status</th>
                <th>Approve?</th>
              </tr>
            </thead>
            <tbody>
              {data.map((val) => (
                <tr key={val.id}>
                  <td>{val.name}</td>
                  <td>{val.email}</td>
                  <td>{val.num}</td>
                  <td>{val.loc}</td>
                  <td>{!val.app ? "Not approved" : "Approved"}</td>
                  <td>
                    {!val.app ? (
                      <>
                        <a
                          className="Link"
                          onClick={() => {
                            setStatus("Loading....");
                            approve.mutate({ id: val.id });
                          }}
                        >
                          approve
                        </a>
                      </>
                    ) : (
                      <a
                        className="Link"
                        onClick={() => {
                          setStatus("Loading....");
                          disapprove.mutate({ id: val.id });
                        }}
                      >
                        dismiss
                      </a>
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
