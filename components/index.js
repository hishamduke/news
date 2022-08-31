import Link from "next/link";
import Breaking from "./breaking";
import Image from "next/image";
export default function Index() {
  return (
    <>
      <div className="collumns">
        <div className="dashboard" style={{ marginRight: "100px" }}>
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
          <Image
            className="dashboard"
            src="/news3.png"
            height={"300"}
            width={"250"}
            style={{ transform: "translateY(-40px)" }}
          ></Image>
        </div>
      </div>
      {/* <Breaking /> */}

      <br />
    </>
  );
}
