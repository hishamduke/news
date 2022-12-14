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
            <h1 className={"formhead test"}>Hey there !!</h1>
            <div
              style={{
                // backgroundColor: "red",
                marginBottom: "2rem",
              }}
            >
              <p
                style={{
                  fontSize: "20px",
                  maxWidth: "20vw",
                  lineHeight: "22px",
                  textAlign: "justify",
                  padding: "0px",
                  margin: "0px",
                  marginBottom: "1rem",
                }}
              >
                Welcome to Newspaper subscription system.
                <br />
                &nbsp;&nbsp; Our goal is to enable internet connectivity to the
                traditional newspaper subscription and delivery system. Click
                Login below to start.
              </p>
              <Link href={"/login"}>
                <h3
                  className={"formhead Link"}
                  style={{
                    margin: "0px",
                    padding: "0px",
                  }}
                >
                  Login
                </h3>
              </Link>{" "}
            </div>
            <div
              style={{
                // backgroundColor: "red",
                marginBottom: "2rem",
              }}
            >
              <p
                style={{
                  fontSize: "20px",
                  maxWidth: "20vw",
                  lineHeight: "22px",
                  textAlign: "justify",
                  padding: "0px",
                  margin: "0px",
                  marginBottom: "1rem",
                }}
              >
                Or you want to create an account?
              </p>
              <Link href={"/register"}>
                <h3
                  className={"formhead Link"}
                  style={{
                    margin: "0px",
                    padding: "0px",
                  }}
                >
                  Register
                </h3>
              </Link>
            </div>

            <div
              style={{
                // backgroundColor: "red",
                marginBottom: "2rem",
              }}
            >
              <p
                style={{
                  fontSize: "20px",
                  maxWidth: "20vw",
                  lineHeight: "22px",
                  textAlign: "justify",
                  padding: "0px",
                  margin: "0px",
                  marginBottom: "1rem",
                }}
              >
                Are you an delivery employee?
              </p>
              <Link href={"/employees/dashboard"}>
                <h3
                  className={"formhead Link"}
                  style={{
                    margin: "0px",
                    padding: "0px",
                  }}
                >
                  Employee
                </h3>
              </Link>
            </div>
            {/* <h3 className={"formhead "}>
              <Logout />
            </h3> */}
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
