import Forgot from "../components/forgot";
import Breaking from "../components/breaking";
import Router from "next/router";
export default function Home() {
  console.log(" logout mounted");
  return (
    <div className="collumns">
      <Forgot />

      <Breaking />
    </div>
  );
}
