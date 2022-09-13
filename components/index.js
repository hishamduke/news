import Link from "next/link";
import Breaking from "./breaking";
import Image from "next/image";
import Logout from "./buttons/logoutbutton";
export default function Index() {
  return (
    <>
      <div className="collumns">
        <div className="dashboard">
          <br />
          <form
          // style={{ backgroundColor: "blue" }}
          >
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
          <div
            style={{
              height: "500px",
              width: "500px",
              // backgroundColor: "red",
              overflow: "none",
            }}
          >
            <Image
              className="dashboard"
              src="/news3.png"
              height={"1000"}
              width={"950"}
              // layout="fill"
              style={{ transform: "translateY(-40px)" }}
            ></Image>
          </div>
        </div>
      </div>
      {/* <Breaking /> */}

      <br />
    </>
  );
}
