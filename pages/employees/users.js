import Router from "next/router";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import Logout from "../../components/buttons/logoutbutton";
import styles from "../../styles/ManagePapers.module.css";
import Link from "next/link";
import BackButton from "../../components/buttons/backButton";
// import Logout from "../buttons/logoutbutton";
export default function Dashboard(yea) {
  const logout = async () => {
    let val = await axios.get("/api/auth/logout");
    Router.push("/login");
  };

  const [userflag, setUserflag] = useState(1);

  const { isLoading, error, data } = useQuery(["empdetails"], () =>
    fetch("/api/employees/empdetails").then((res) => res.json())
  );

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  if (data) if (data.success == false) Router.push("/employees/login");
  return (
    <>
      <BackButton />
      <div className="collumns">
        {/* {JSON.stringify(data)} */}
        <div
          className="dashboard"
          style={{ backgroundColor: "", gap: "10rem" }}
        >
          <form>
            <h1 className={"formhead test"}>
              Users assigned to{" "}
              <el className="el" style={{}}>
                {data.name}
              </el>
            </h1>
          </form>
        </div>
      </div>
      <UsersTable />
    </>
  );
}
const UsersTable = () => {
  const { isLoading, error, data } = useQuery(["empUsers"], () =>
    fetch("/api/employees/empUsers").then((res) => res.json())
  );
  const [animationParent] = useAutoAnimate();

  if (data)
    return (
      <>
        <div
          ref={animationParent}
          style={{
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
            marginTop: "15px",
            gap: "2rem",
          }}
        >
          {/* {JSON.stringify(data)} */}
          {console.log(data)}
          {data.map((item) => (
            <>
              <div key={item.id}>
                <div className={styles.NewsBox} key={item.id}>
                  <h1
                    style={{ fontSize: "1.5rem" }}
                    className={styles.NewsName}
                  >
                    {item.name}
                  </h1>
                  <img className={styles.NewsImg} src="/newsillu3.webp" />
                  <div style={{ marginBottom: "2rem" }}>
                    <Link href={`mailto:${item.email}`}>
                      <p
                        className="Link newa"
                        style={{ fontSize: "1.2rem", margin: "0.1rem" }}
                      >
                        {" "}
                        {item.email}
                      </p>
                    </Link>
                    <Link href={`Tel:${item.num}`}>
                      <p
                        className="newa Link"
                        style={{ fontSize: "1.2rem", margin: "0.1rem" }}
                      >
                        {" "}
                        {item.num}
                      </p>
                    </Link>
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
      </>
    );
};
