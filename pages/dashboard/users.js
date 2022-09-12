import FeedbackTable from "../../components/Dashboards/Admin/FeedbackTable";
import { BiArrowBack } from "react-icons/bi";
import Router from "next/router";
import BackButton from "../../components/buttons/backButton";
import UserTable from "../../components/Dashboards/Admin/UserTable";

export default function agentPage() {
  return (
    <>
      <BackButton />
      <UserTable />
    </>
  );
}
