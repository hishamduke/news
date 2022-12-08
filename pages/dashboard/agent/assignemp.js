import BackButton from "../../../components/buttons/backButton";
import { useState } from "react";
import { queryClient } from "../../_app";
import { useQuery } from "@tanstack/react-query";
import NoNewspapersAdded from "../../../components/Dashboards/Agent/NoNewspapersAdded";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import styles from "../../../styles/ManagePapers.module.css";
import axios from "axios";

export default function Show() {
  return (
    <>
      <BackButton />
      <AddedNews />
    </>
  );
}
function AddedNews() {
  const [emp, setEmp] = useState(false);
  const [show, setShow] = useState(true);
  const [animationParent] = useAutoAnimate();
  const { isLoading, error, data } = useQuery(["users"], () =>
    fetch("/api/agent/users/all").then((res) => res.json())
  );
  if (data)
    return (
      <>
        {/* {JSON.stringify(data)} */}
        <div className="dashboard" ref={animationParent}>
          <div
            className="collumn"
            style={{ justifyContent: "center", margin: "auto" }}
          >
            <form
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <h4 style={{ textAlign: "center" }}>List Users</h4>
              <div
                style={{
                  margin: "auto",
                  display: "flex",
                  gap: "1px",
                }}
              >
                <label style={{ width: "200px" }}>Users with</label>

                <select
                  name="lang"
                  id="lang"
                  style={{
                    // width: "60%",
                    fontSize: "1rem",
                    padding: "1%",
                  }}
                  defaultValue={emp}
                  onChange={(e) => {
                    setEmp((emp) => !emp);
                    queryClient.invalidateQueries(["users"]);
                  }}
                >
                  <option value={true}> Employees</option>
                  <option value={false}>No Employees</option>
                </select>
              </div>
            </form>
          </div>
        </div>
        <ShowPapers emp={emp} />
      </>
    );
}

function ShowPapers({ emp }) {
  const { isLoading, error, data } = useQuery(["users"], () =>
    fetch("/api/agent/users/all").then((res) => res.json())
  );
  console.log("show");
  console.log(emp);
  const [animationParent] = useAutoAnimate();

  if (data) {
    let data2 = [];
    for (let i = 0; i < data.length; i++) {
      console.log(!!data[i].employeeId);
      if (!!data[i].employeeId == emp) {
        data2[data2.length] = data[i];
        console.log(data[i]);
      }
    }

    return (
      <div ref={animationParent}>
        {data.map((item) =>
          !!item.employeeId == emp ? (
            <div key={item.id}>{JSON.stringify(item)}</div>
          ) : (
            " "
          )
        )}
      </div>
    );
  }
}
