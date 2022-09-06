import Dashboard from "../components/Dashboards/dashboard";
import Admin from "../components/Dashboards/Admin/AdminDashboard";
import Agent from "../components/Dashboards/Agent";
import { useQuery } from "@tanstack/react-query";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export default function Home() {
  const { isLoading, error, data } = useQuery(["roleData"], () =>
    fetch("/api/userrole").then((res) => res.json())
  );
  const listRef = useAutoAnimate();

  if (error)
    return (
      <>
        <div className="collumns">
          <div className="collumn">
            <h2 className="formhead">
              An error occured, Please try again. If this error persists please
              contact the support.
            </h2>
            <br />
          </div>
        </div>
      </>
    );

  return (
    <>
      {/* {JSON.stringify(data)} */}
      <div ref={listRef}>
        {data == "ADMIN" && <Admin />}
        {data == "AGENT" && <Agent />}
        {data == "USER" && <Dashboard />}
      </div>
    </>
  );
}
