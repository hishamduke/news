import Logout from "../buttons/logoutbutton";
import { useQuery } from "@tanstack/react-query";

export default function Agent() {
  const { isLoading, error, data } = useQuery(["agentStatus"], () =>
    fetch("/api/agent/agentstatus").then((res) => res.json())
  );
  if (isLoading)
    return (
      <>
        <div className="collumns">
          <div className="collumn">
            <h2 className="formhead">Please wait while the page loads</h2>
            <br /> <Logout />
          </div>
        </div>
      </>
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
