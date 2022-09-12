import Register from "../components/register";
import Breaking from "../components/breaking";
export default function Home() {
  console.log(" register mounted");

  return (
    <div className="body">
      <div className="collumns">
        <Register />

        <Breaking></Breaking>
      </div>
    </div>
  );
}
