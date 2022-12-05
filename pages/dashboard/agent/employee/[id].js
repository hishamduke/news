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
  //~~
  const [visible, setVisible] = useState(0);
  //^^
  //TODO:change to 0
  const { isLoading, error, data } = useQuery([`employee${id}`], () =>
    fetch(`/api/agent/employees/${id}`).then((res) => res.json())
  );
  if (data)
    return (
      <>
        {visible == 0 && (
          <>
            <BackButton />
            <div className="collumns">
              <div className="dashboard" style={{ marginRight: "100px" }}>
                <br />
                <form>
                  <h1 className={"formhead test"}>Manage Employee</h1>
                  <h4>{data.name}</h4>
                  <p className={" Link"} onClick={() => setVisible(1)}>
                    Edit profile
                  </p>
                  <p className={" Link"} onClick={() => setVisible(2)}>
                    Newspapers
                  </p>
                </form>
              </div>
              {/* {JSON.stringify(data)} */}
            </div>
          </>
        )}
        {visible == 1 && <EmpId setVisible={setVisible} />}
        {visible == 2 && <NewspaperEmp setVisible={setVisible} />}
        <br />
      </>
    );
}

const EmpId = ({ setVisible }) => {
  const router = useRouter();
  const { id } = router.query;
  const { isLoading, error, data } = useQuery([`employee${id}`], () =>
    fetch(`/api/agent/employees/${id}`).then((res) => res.json())
  );
  const [init, setInit] = useState(true);
  const [msg, setMsg] = useState();
  const [mapview, setMapview] = useState(false);
  const [inp, setInp] = useState({
    name: "",
    email: "",
    password: "",
    num: 0,
    loc: "",
  });
  function handleSubmit(e) {
    // console.log("here");
    e.preventDefault();
    axios
      .post("/api/agent/updemployee", {
        inp,
      })
      .then(function (response) {
        console.log(response);
        setMsg("Updated successfully");
        queryClient.invalidateQueries(`employee${id}`);
        queryClient.invalidateQueries("employees");
        setTimeout(() => {
          setVisible(0);
          // Router.push("/dashboard/agent/employee/");
        }, 1000);
      })
      .catch(function (error) {
        setMsg("Updation failed");
      });
  }
  if (data) {
    if (data.name) {
      const loc = JSON.parse(data.loc);

      if (init) {
        setInp({ ...data, loc: loc, num: parseInt(data.num) });
        setInit(false);
      }
      console.log("inp");
      console.log(inp);
      return (
        <>
          {mapview ? (
            <Maps inp={inp} setInp={setInp} setMapview={setMapview} />
          ) : (
            <>
              <>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignContent: "center",
                  }}
                >
                  <p
                    style={{
                      fontSize: "medium",
                      width: "fit-content",
                      alignSelf: "center",
                    }}
                    className="zoom"
                    onClick={() => {
                      setVisible(0);
                    }}
                  >
                    {<BiArrowBack />} back
                  </p>
                </div>
              </>
              <div className="dashboard">
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
                    onFocus={(e) => {
                      e.target.type = "text";
                    }}
                    // onClick={(e) => console.log("hi")}
                    onBlur={(e) => (e.target.type = "password")}
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
                    placeholder={` ${inp.agentid}: ${inp.agentName} `}
                    readOnly={true}
                  />
                  <label>
                    base location &nbsp;
                    <a className="Link" onClick={() => setMapview(true)}>
                      change
                    </a>
                  </label>
                  <input
                    required
                    placeholder={` Lat :${inp.loc.lat} Lng:${inp.loc.lng}`}
                    readOnly={true}
                  />
                  <div
                    style={{
                      // backgroundColor: "rebeccapurple",
                      display: "flex",
                      gap: "10px",
                      alignItems: "center",
                    }}
                  >
                    <button className={styles.button}>update</button>
                    <div onClick={() => setMsg()}>{msg} </div>
                  </div>
                  <div></div>
                </form>
              </div>
            </>
          )}
        </>
      );
    }
  }
};

function Maps(val) {
  const { isLoading, error, data } = useQuery(["agentLoc"], () =>
    fetch("/api/agent/baseloc").then((res) => res.json())
  );
  if (data)
    return (
      <>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            //   backgroundColor: "red",
            alignContent: "center",
          }}
        >
          <p
            style={{
              // marginLeft: "10%",
              fontSize: "medium",
              // backgroundColor: "red",
              width: "fit-content",
              alignSelf: "center",
              // backgroundColor: "red",
            }}
            className="zoom"
            onClick={() => {
              val.setMapview(false);
            }}
          >
            {<BiArrowBack />} cancel
          </p>
        </div>
        <div className="dashboard">
          <MapView
            inp={val.inp}
            setInp={val.setInp}
            setMapview={val.setMapview}
            defLoc={JSON.parse(data)}
          />
        </div>
      </>
    );
}
