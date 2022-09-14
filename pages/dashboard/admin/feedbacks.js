import FeedbackTable from "../../../components/Dashboards/Admin/FeedbackTable";
// import FeedbackTable from "../../../components/Dashboards/Admin/FeedbackTable";
import { BiArrowBack } from "react-icons/bi";
import Router from "next/router";
import BackButton from "../../../components/buttons/backButton";

export default function agentPage() {
  return (
    <>
      <FeedbackTable />
    </>
  );
}
