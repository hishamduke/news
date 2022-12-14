import BackButton from "../../../components/buttons/backButton";
import ManagePapers from "../../../components/Dashboards/Admin/ManagePapers";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export default function agentPage() {
  const [animationParent] = useAutoAnimate();

  return (
    <div ref={animationParent}>
      <BackButton />
      <ManagePapers />
    </div>
  );
}
