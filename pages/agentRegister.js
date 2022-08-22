import AgentRegister from "../components/agentreg";
import Breaking from "../components/breaking";
export default function Home() {
  console.log(" register mounted");

  return (
    <div className="body">
      <div className="collumns">
        <AgentRegister />
        <Breaking></Breaking>
      </div>
    </div>
  );
}
