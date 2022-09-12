import Link from "next/link";
import Breaking from "./breaking";
import Image from "next/image";
import Logout from "./buttons/logoutbutton";
export default function Index() {
  return (
    <>
      <div className="collumns">
        <div className="dashboard" style={{ marginRight: "100px" }}>
          <br />
          <form>
            <h1 className={"formhead test"}>Hey there !</h1>
            <p>
              Welcome to Newspaper subscription <br />
              system
            </p>
            <Link href={"/login"}>
              <h3 className={"formhead Link"}>Login?</h3>
            </Link>{" "}
            <Link href={"/loginAgent"}>
              <h3 className={"formhead Link"}>agent Login?</h3>
            </Link>
            <Link href={"/register"}>
              <h3 className={"formhead Link"}>Create a new user account?</h3>
            </Link>
            <Link href={"/test"}>
              <h3 className={"formhead Link"}>Go to test field</h3>
            </Link>
            <h3 className={"formhead Link"}>
              <Logout />
            </h3>
          </form>
          <Image
            className="dashboard"
            src="/news3.png"
            height={"290"}
            width={"330"}
            style={{ transform: "translateY(-40px)" }}
          ></Image>
        </div>
      </div>
      {/* <Breaking /> */}

      <br />
    </>
  );
}
