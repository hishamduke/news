import Logout from "../buttons/logoutbutton";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../../pages/_app";

export default function Agent() {
  const { isLoading, error, data } = useQuery(["agentStatus"], () =>
    fetch("/api/agent/agentstatus").then((res) => res.json())
  );
  if (data) queryClient.invalidateQueries("account");
  return (
    <>
      <div className="collumns">
        <div className="collumn">
          <h2 className="formhead">agent {JSON.stringify(data)}</h2>
          <br /> <Logout />
        </div>
      </div>
    </>
  );
}
