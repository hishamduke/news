import Logout from "../buttons/logoutbutton";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { queryClient } from "../../pages/_app";
import Link from "next/link";
export default function Admin() {
  const { isLoading, error, data } = useQuery(["agentsDetails"], () =>
    fetch("/api/admin/agentstatus").then((res) => res.json())
  );

  const addTodo = (id) => axios.post("/api/admin/disapprove", id);
  const disapprove = useMutation(addTodo, {
    onSuccess: async () => {
      queryClient.invalidateQueries();
    },
    onSettled: async () => {
      console.log("I'm second!");
    },
  });

  const addTodo2 = (id) => axios.post("/api/admin/approve", id);

  const approve = useMutation(addTodo2, {
    onSuccess: async () => {
      queryClient.invalidateQueries(["agentsDetails"]);
    },
  });

  if (isLoading) return <>loading</>;

  return (
    <>
      <div>
        {disapprove.isError || approve.error ? (
          <div>
            An error occurred: {disapprove.error?.message}
            {approve.error?.message}
          </div>
        ) : null}
      </div>
      <div className="collumns">
        <div className="dashboard">
          <h2 className="formhead">Agents list</h2>
          {JSON.stringify(data)}
          <table>
            <thead>
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
                            approve.mutate({ id: val.id });
                          }}
                        >
                          approve
                        </a>
                      </>
                    ) : (
                      <a
                        className="Link"
                        onClick={() => disapprove.mutate({ id: val.id })}
                      >
                        dismiss
                      </a>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <br /> <Logout />
        </div>
      </div>
    </>
  );
}
