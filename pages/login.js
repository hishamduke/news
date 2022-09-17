import Login from "../components/login";
import Breaking from "../components/breaking";
import Router from "next/router";
export default function Home() {
  console.log(" logout mounted");
  return (
    <div className="collumns">
      <Login />

      <Breaking />
    </div>
  );
}
