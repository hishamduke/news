import Login from "../components/login";
import Breaking from "../components/breaking";

export default function Home() {
  console.log(" login mounted");

  return (
    <div className="body">
      <div className="content">
        <div className="collumns">
          <Login />

          <Breaking></Breaking>
        </div>
      </div>
    </div>
  );
}
