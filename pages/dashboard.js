import Dashboard from "../components/Dashboards/dashboard";
import Admin from "../components/Dashboards/Admin/AdminDashboard";
import Agent from "../components/Dashboards/Agent/dashboard";
import { useQuery } from "@tanstack/react-query";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export default function Home() {
  const { isLoading, error, data } = useQuery(["roleData"], () =>
    fetch("/api/userrole").then((res) => res.json())
  );
  const listRef = useAutoAnimate();
  if (isLoading)
    return (
      <>
        <div className="collumns">
          <div className="collumn">
            <h2 className="formhead">Loading........</h2>
            <br />
          </div>
        </div>
      </>
    );
  if (error) return <Error />;
  if (data == "ADMIN") return <Admin />;
  if (data == "AGENT") {
    return <Agent />;
  }
  if (data == "USER") return <Dashboard />;
  else return <Error />;
}

function Error() {
  return (
    <>
      <div className="collumns">
        <div className="collumn">
          {/* <h2 className="formhead"> */}
          An error occured, Please try again. If this error persists please
          contact the support.
          <br /> Is db connected??
          {/* </h2> */}
          <br />
        </div>
      </div>
    </>
  );
}
