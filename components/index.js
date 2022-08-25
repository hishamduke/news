import Link from "next/link";
import Breaking from "./breaking";
export default function Index() {
  return (
    <>
      <div className="collumns">
        <div className="dashboard">
          <br />

          <form>
            <Link href={"/login"}>
              <h2 className={"formhead Link"}>Login?</h2>
            </Link>{" "}
            <Link href={"/loginAgent"}>
              <h2 className={"formhead Link"}>agent Login?</h2>
            </Link>
            <Link href={"/register"}>
              <h2 className={"formhead Link"}>Create a new user account?</h2>
            </Link>
            <Link href={"/test"}>
              <h2 className={"formhead Link"}>Go to test field</h2>
            </Link>
          </form>
        </div>
        {/* <Breaking /> */}
      </div>
    </>
  );
}
