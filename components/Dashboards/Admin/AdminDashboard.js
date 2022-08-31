import AgentTable from "./AgentTable";
import Link from "next/link";
import Logout from "../../buttons/logoutbutton";
import Image from "next/image";
import { useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export default function Index() {
  const listRef = useAutoAnimate();
  const [currcomp, setCurrcomp] = useState(0);
  console.log(currcomp);

  return (
    <div ref={listRef}>
      {currcomp == 0 && (
        <>
          <div className="collumns">
            <div className="dashboard" style={{ marginRight: "100px" }}>
              <br />
              <form>
                <h2 className={"formhead Link"} onClick={() => setCurrcomp(1)}>
                  Approve or disapprove agents
                </h2>

                <h2 className={"formhead Link"} onClick={() => setCurrcomp(2)}>
                  View feedbacks
                </h2>

                <h2 className={"formhead Link"} onClick={() => setCurrcomp(3)}>
                  Manage users
                </h2>

                <Link href={"/test"}>
                  <h2 className={"formhead Link"}>Go to test field</h2>
                </Link>
                <Logout />
              </form>
              <Image
                priority="false"
                // placeholder="blur"
                className="dashboard"
                src="/news1.png"
                height={"300"}
                width={"250"}
                style={{ transform: "translateY(-40px)" }}
              ></Image>
            </div>
          </div>

          <br />
        </>
      )}
      {currcomp == 1 && (
        <>
          <AgentTable />
          <br />
          <button
            onClick={() => {
              setCurrcomp(0);
            }}
          >
            Go back
          </button>
        </>
      )}
      {currcomp == 2 && (
        <>
          <AgentTable />
          <br />
          <button
            onClick={() => {
              setCurrcomp(0);
            }}
          >
            Go back
          </button>
        </>
      )}
    </div>
  );
}
