import { useRouter } from "next/router";
import { BiArrowBack } from "react-icons/bi";
import BackButton from "../../../../components/buttons/backButton";
import axios from "axios";
import { queryClient } from "../../../_app";
import styles from "../../../../styles/Employees.module.css";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import MapView from "../../../../components/Dashboards/Agent/mapView";
import NewspaperEmp from "../../../../components/Dashboards/Agent/NewspaperEmp";
export default function employees() {
  return (
    <>
      <BackButton />
      <NewsMain />
    </>
  );
}
function NewsMain() {
  const router = useRouter();
  const { id } = router.query;
  const { isLoading, error, data } = useQuery([`news${id}`], () =>
    fetch(`/api/user/news/${id}`).then((res) => res.json())
  );
  if (data)
    return (
      <>
        <form>
          <div className="collumns">
            <div className="dashboard">
              <div className="collumns">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    margin: "auto",
                    gap: "1.5rem",
                    textAlign: "center",
                  }}
                >
                  <h2 style={{ textAlign: "center" }}>
                    Subscribe to {data.name}
                  </h2>
                  <form
                    className={styles.form}
                    onSubmit={(e) => {
                      handlesubmit(e);
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        backgroundColor: "#f8b3af",
                        margin: "auto",
                      }}
                    >
                      <p
                        style={{
                          margin: "1rem",
                        }}
                      >
                        Price per month : ₹{"2"}
                      </p>
                    </div>
                    <div style={{ marginTop: "1rem" }}>
                      <p>Months</p>
                    </div>
                    <div>
                      <input type={"number"} value={1} />
                    </div>
                    <p></p>
                    <button>submit</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </form>
        <br />
        <br />
        <br />
        <br />
        {JSON.stringify(data)}
      </>
    );
}
