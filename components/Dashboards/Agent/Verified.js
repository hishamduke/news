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

  //PRECACHING
  const {} = useQuery(["employees"], () =>
    fetch("/api/agent/viewemployees").then((res) => res.json())
  );
  const {} = useQuery(["Langs"], () =>
    fetch("/api/admin/newslang").then((res) => res.json())
  );
  const {} = useQuery([`AgentPapersEnglish`], () =>
    fetch("/api/agent/viewpapers", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify("English"),
    }).then((res) => res.json())
  );
  const {} = useQuery([`AgentPapersMalayalam`], () =>
    fetch("/api/agent/viewpapers", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify("Malayalam"),
    }).then((res) => res.json())
  );
  const {} = useQuery(["FeedbacksEmp"], () =>
    fetch("/api/agent/feedbacks/viewEmp").then((res) => res.json())
  );
  const {} = useQuery(["FeedbacksUser"], () =>
    fetch("/api/agent/feedbacks/view").then((res) => res.json())
  );
  const {} = useQuery(["usersEmpData"], () =>
    fetch("/api/agent/users/all").then((res) => res.json())
  );

  //END CACHING
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
            <p
              className={" Link"}
              onClick={() => Router.push("/dashboard/agent/emp/feedbacks")}
            >
              Show Employees feedbacks
            </p>
            <h4>Users</h4>
            <p
              className={" Link"}
              onClick={() => Router.push("/dashboard/agent/users/feedbacks")}
            >
              Show user feedbacks
            </p>
            <p
              className={" Link"}
              onClick={() => Router.push("/dashboard/agent/assignemp")}
            >
              Assign users to Employees
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
