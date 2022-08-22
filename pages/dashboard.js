import Dashboard from "../components/Dashboards/dashboard";
import Admin from "../components/Dashboards/AdminDashboard";
import Agent from "../components/Dashboards/Agent";
import { useQuery } from "@tanstack/react-query";
export default function Home() {
  const { isLoading, error, data } = useQuery(["roleData"], () =>
    fetch("/api/userrole").then((res) => res.json())
  );
  if (isLoading) return <>Loading .........</>;
  if (error) return <>Please try again...</>;
  if (data == "ADMIN") return <Admin />;
  if (data == "AGENT") return <Agent />;

  return (
    <>
      <Dashboard />
    </>
  );
}
