import Logout from "../buttons/logoutbutton";
import { useQuery } from "@tanstack/react-query";

export default function Agent() {
  const { isLoading, error, data } = useQuery(["agentStatus"], () =>
    fetch("/api/agent/agentstatus").then((res) => res.json())
  );

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
