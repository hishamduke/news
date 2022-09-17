// import AgentTable from "../../components/Dashboards/Admin/AgentTable";
import AgentTable from "../../../components/Dashboards/Admin/AgentTable";
import { BiArrowBack } from "react-icons/bi";
import Router from "next/router";
import BackButton from "../../../components/buttons/backButton";

export default function agentPage() {
  return (
    <>
      <BackButton />

      <AgentTable />
    </>
  );
}
