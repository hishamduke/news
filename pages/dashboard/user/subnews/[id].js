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
export default function Employees() {
  const router = useRouter();
  const { id } = router.query;
  if (id)
    return (
      <>
        <BackButton />
        <NewsMain id={id} />
      </>
    );
}
function NewsMain({ id }) {
  const { isLoading, error, data } = useQuery([`news${id}`], () =>
    fetch(`/api/user/news/${id}`).then((res) => res.json())
  );

  const { loading: loading2, data: isSub } = useQuery([`isSub${id}`], () =>
    fetch(`/api/user/isSub/${id}`).then((res) => res.json())
  );

  const router = useRouter();
  const [months, setMonths] = useState(0);
  const [zero, setZero] = useState(false);
  const [expireDate, setExpireDate] = useState(updateDate(0));

  if (loading2) return <></>;
  let d = isSub || new Date();
  const updateDate = (val) => {
    if (val < 1 || val > 36) val = 0;

    let exp = addDays(d, val * 28);
    let exp2 = JSON.stringify(exp).split("T")[0];
    exp2 = exp2.split(`"`);
    exp2 = exp2[1];
    return exp2;
  };

  function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  if (months < 0 || months > 36) {
    setMonths(0);
  }

  if (isSub) {
    if (d != isSub) {
      d = isSub;
    }
  }

  if (data && isSub) {
    let price = data.price;
    const handlesubmit = (e) => {
      e.preventDefault();
      if (months < 1) {
        setZero(true);
        return;
      } else {
        setZero(false);
        // alert("next");
      }

      axios.post("/api/user/subnewsAPI", { id, months }).then((res) => {
        router.back();
        queryClient.invalidateQueries([`isSub${id}`]);
      });
    };
    return (
      <>
        {JSON.stringify()}
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
                      margin: "auto",
                    }}
                  >
                    <p
                      style={
                        {
                          // margin: "1rem",
                        }
                      }
                    >
                      Subscription rate : ₹{price}
                    </p>
                  </div>
                  <div style={{ marginTop: "1rem" }}>
                    <p style={{ fontWeight: "bold" }}>Months</p>
                  </div>
                  <div style={{ marginBottom: "1rem" }}>
                    <input
                      value={months}
                      onChange={(e) => {
                        if (e.target.value == "") {
                          setMonths(0);
                          updateDate(0);
                        } else {
                          setMonths(parseInt(e.target.value));
                          setExpireDate(updateDate(e.target.value));
                        }
                      }}
                    />
                    <div>
                      <button
                        type="button"
                        style={{ marginRight: "1rem", width: "2rem" }}
                        onClick={() => {
                          setMonths((months) => parseInt(months) - 1);
                          setExpireDate(updateDate(parseInt(months) - 1));
                        }}
                      >
                        -
                      </button>
                      <button
                        type="button"
                        style={{ width: "2rem" }}
                        onClick={() => {
                          setMonths((months) => parseInt(months) + 1);
                          setExpireDate(updateDate(parseInt(months) + 1));
                        }}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* <div style={{ marginTop: "1rem" }}>
                    <p style={{ fontWeight: "bold" }}>Drop location</p>
                  </div> */}
                  <div
                    style={{
                      display: "flex",
                      // backgroundColor: "#c3f8af80",
                      flexDirection: "column",
                      margin: "auto",
                    }}
                  >
                    <p
                      style={{
                        margin: "1rem",
                      }}
                    >
                      Total price : ₹{(price * months).toFixed(2)}
                    </p>
                    <p
                      style={{
                        margin: "1rem",
                      }}
                    >
                      Will expire at : {expireDate}
                    </p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      // backgroundColor: "#c3f8af80",
                      margin: "auto",
                    }}
                  >
                    <button style={{ textAlign: "center" }}>Confirm</button>
                  </div>
                </form>
                {zero ? (
                  <>
                    <p
                      style={{
                        color: "red",
                      }}
                    >
                      Minimum of one month is required
                    </p>
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>

        <br />
        <br />
        <br />
        <br />
      </>
    );
  }
}
