// import styles from "../../../styles/Empoyees.module.css";
import styles from "../../../styles/Employees.module.css";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import Image from "next/image";
import axios from "axios";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import MapView from "./mapView";
export default function employees() {
  return (
    <>
      <Employee />
    </>
  );
}
function Employee() {
  const [animationParent] = useAutoAnimate();
  const [visible, setVisible] = useState(true);

  const { isLoading, error, data } = useQuery(["employees"], () =>
    fetch("/api/agent/viewemployee").then((res) => res.json())
  );
  if (isLoading) return;
  if (data)
    return (
      <>
        {visible && <NewEmp state={visible} action={setVisible} />}
        <div className={styles.NewsCont} ref={animationParent}>
          {data.map((item) => (
            <div className={styles.NewsBox} ref={animationParent}>
              <h1 className={styles.NewsName}>{item.name}</h1>

              <p className={styles.p} style={{ textAlign: "center" }}>
                Location(pending)
              </p>
              <p className={styles.p} style={{ textAlign: "center" }}>
                {item.num}
              </p>
              <p className={styles.p} style={{ textAlign: "center" }}>
                3 Users assigned.
              </p>
              <button className={styles.button}>Manage</button>
            </div>
          ))}

          <div className={styles.NewsBox} ref={animationParent}>
            {/* <img className={styles.NewsImg} src="/newsboy.jpg" /> */}
            <h1 className={styles.NewsName}>Add a new employee</h1>

            <button className={styles.button} onClick={() => setVisible(true)}>
              Add
            </button>
          </div>
        </div>
      </>
    );
}

function NewEmp(prop) {
  const [animationParent] = useAutoAnimate();
  const [err, setErr] = useState();
  const [inp, setInp] = useState({
    name: "",
    email: "",
    password: "",
    number: "",
    loc: "",
  });
  const [butload, setButload] = useState(false);
  const [mapview, setMapview] = useState(false);

  const { isLoading, error, data } = useQuery(["name"], () =>
    fetch("/api/account").then((res) => res.json())
  );
  function handleSubmit(e) {
    e.preventDefault();
    console.log("hi");
    setButload(true);
    axios
      .post("/api/agent/addemployee", {
        inp,
      })
      .then(function (response) {
        console.log(response);

        setTimeout(() => {
          setErr("Account created");
        }, 1000);
        setTimeout(() => {
          setButload(false);
          setErr();
          prop.action(false);
        }, 1500);
      })
      .catch(function (error) {
        setTimeout(() => {
          setButload(false);
        }, 1500);
        console.log(error);
        if (error.response.data == "Employee_email_key")
          setErr("Please use another email ");
        else if (error.response.data == "Employee_num_key")
          setErr("Please use another number ");
        else setErr("Some error occured");
        setTimeout(() => {
          setErr();
        }, 2000);
      });
  }
  console.log("account", data);
  if (data)
    return (
      <>
        <div
          className={styles.fullscreen}
          onClick={() => {
            prop.action(false);
          }}
        ></div>
        <div className={styles.inside} ref={animationParent}>
          {mapview ? (
            <MapView inp={inp} setInp={setInp} view={setMapview} />
          ) : (
            <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
              <label>name</label>
              <input
                value={inp.name}
                required
                onChange={(e) => {
                  setInp({ ...inp, name: e.target.value });
                }}
              />
              <label>email</label>
              <input
                value={inp.email}
                type="email"
                onChange={(e) => {
                  setInp({ ...inp, email: e.target.value });
                }}
              />
              <label>password</label>
              <input
                value={inp.password}
                required
                type={"password"}
                minLength="6"
                onChange={(e) => {
                  setInp({ ...inp, password: e.target.value });
                }}
              />
              <label>number</label>
              <div>
                <input
                  value={inp.num}
                  type="text"
                  title="Please enter 10 digit numbers"
                  pattern="\d*"
                  minLength="10"
                  maxLength="10"
                  required
                  onChange={(e) => {
                    setInp({ ...inp, num: parseInt(e.target.value) });
                  }}
                ></input>
              </div>
              <label>agent </label>
              <input
                required
                placeholder={` ${data.name} id:${data.id}`}
                readOnly={true}
              />
              <label>
                base location &nbsp;
                <a className="Link" onClick={() => setMapview(true)}>
                  choose
                </a>
              </label>
              <input
                required
                placeholder={` Lat :${inp.loc.lat} Lng:${inp.loc.lat}`}
                readOnly={true}
              />
              <div
                style={{
                  // backgroundColor: "rebeccapurple",
                  display: "flex",
                  gap: "10px",
                }}
              >
                <button className={styles.button}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    {butload && (
                      <Image
                        src={"/spinner.svg"}
                        height={"30px"}
                        width={"30px"}
                      />
                    )}
                    submit
                  </div>
                </button>
                <button
                  className={styles.button}
                  onClick={(e) => {
                    e.preventDefault();
                    prop.action(false);
                  }}
                >
                  close
                </button>
              </div>
              <div ref={animationParent}>{err}</div>
            </form>
          )}
        </div>
      </>
    );
}
