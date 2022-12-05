import Router from "next/router";
import Logout from "../../buttons/logoutbutton";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Loading from "../../common/Loading";
import Link from "next/link";
export default function Verified() {
  const { isLoading, error, data } = useQuery(["name"], () =>
    fetch("/api/account").then((res) => res.json())
  );
  if (isLoading) return <Loading />;
  return (
    <>
      <div className="collumns">
        <div className="dashboard" style={{ marginRight: "100px" }}>
          <br />
          <form>
            <h1 className={"formhead test"}>Hey {data.name} !</h1>
            <h4>Employees</h4>
            <p
              className={" Link"}
              onClick={() => Router.push("/dashboard/agent/employees")}
            >
              Manage Employees
            </p>

            <p
              className={" Link"}
              onClick={() => Router.push("/dashboard/agent/newspapers")}
            >
              Manage Newspapers
            </p>
            <h4>Users</h4>
            <p
              className={" Link"}
              onClick={() => Router.push("/dashboard/agent/feedbacks")}
            >
              Show user feedbacks
            </p>
            <h4>Admin</h4>
            <p className={" Link"} onClick={() => Router.push("/support")}>
              Write to Admin
            </p>
            <Logout />
          </form>
          <Image
            priority="false"
            // placeholder="blur"
            className="dashboard"
            src="/news1.png"
            height={"320"}
            width={"320"}
            // style={{ transform: "translateY(-40px)" }}
          ></Image>
        </div>
      </div>

      <br />
    </>
  );
}
