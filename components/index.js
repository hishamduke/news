import Link from "next/link";
import Breaking from "./breaking";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import Logout from "./buttons/logoutbutton";
import styles from "../styles/Index.module.css";
import { queryClient } from "../pages/_app";
import { useEffect } from "react";
// import styles from "./styles/Index.module.css";

export default function Index() {
  //caching
  const {} = useQuery(["News"], () =>
    axios.get("/api/news").then((res) => {
      return res.data;
    })
  );
  //end of caching

  return (
    <>
      <div className="collumns">
        <div className="dashboard">
          {/* <br /> */}
          <form style={{ marginTop: "2rem" }} className="collumn">
            <h1 className={"formhead test"}>Hey there !!</h1>
            <div className={styles.box}>
              <div>
                <p className={styles.para}>
                  Welcome to Newspaper subscription system.
                </p>
                {/* <br /> */}
                <br />
                <p className={styles.para} style={{ textAlign: "justify" }}>
                  <i>
                    &nbsp;&nbsp; Our goal is to enable internet connectivity to
                    the traditional newspaper subscription and delivery system.
                    Click Login below to start.
                  </i>
                </p>
              </div>
              <Link href={"/login"}>
                <button className={styles.button}>
                  {/* <h3
                    className={"formhead Link"}
                    style={{
                      margin: "0px",
                      padding: "0px",
                      fontSize: "25px",
                    }}
                  > */}
                  Login
                </button>
              </Link>{" "}
            </div>

            <div className={styles.box}>
              <p className={styles.para}>Or you want to create an account?</p>
              <Link href={"/register"}>
                <button className={styles.button}>Register</button>
              </Link>
            </div>

            <div
              style={{
                // backgroundColor: "red",
                marginBottom: "2rem",
              }}
            >
              <p className={styles.para}>Are you an delivery employee?</p>
              <Link href={"/employees/dashboard"}>
                <button className={styles.button}>Employee</button>
              </Link>
            </div>
            {/* <h3 className={"formhead "}>
              <Logout />
            </h3> */}
          </form>
          <div
            style={{
              height: "500px",
              maxWidth: "500px",
              // backgroundColor: "red",
              overflow: "none",
            }}
          >
            <Image
              className="dashboard"
              src="/news3.png"
              height={"10000"}
              width={"10000"}
              // layout="fill"
              style={{
                transform: "translateY(-40px)",
                imageRendering: "auto",
              }}
            ></Image>
          </div>
        </div>
      </div>
      {/* <Breaking /> */}

      <br />
    </>
  );
}
