import Dashboard from "../components/Dashboards/dashboard";
import Admin from "../components/Dashboards/Admin/AdminDashboard";
import Agent from "../components/Dashboards/Agent";
import { useQuery } from "@tanstack/react-query";
export default function Home() {
  const { isLoading, error, data } = useQuery(["roleData"], () =>
    fetch("/api/userrole").then((res) => res.json())
  );
  if (isLoading)
    return (
      <>
        <div className="collumns">
          <div className="collumn">
            <h2 className="formhead">Please wait while the page loads...</h2>
            <br />
          </div>
        </div>
      </>
    );
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
  if (data == "ADMIN") return <Admin />;
  if (data == "AGENT") return <Agent />;

  return (
    <>
      <Dashboard />
    </>
  );
}
