import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import valida from "../lib/validate";
import Image from "next/image";
import Router from "next/router";
import RegMap from "./reg/RegMap";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export default function Register() {
  const [msg, setmsg] = useState("");
  const [vis, setvis] = useState(false);
  const [butload, setButload] = useState(false);
  const [inp, setInp] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    num: 0,
    loc: {
      lat: 11.257059218149296,
      lng: 75.77515962416318,
    },
  });
  const after = () => {
    setmsg();
  };
  const [animationParent] = useAutoAnimate();

  function message(message) {
    setmsg(message);
    setTimeout(() => {
      setmsg("");
    }, 2000);
  }
  function handleSubmit(e) {
    console.log(inp.password);
    if (inp.password !== inp.password2) {
      message("Passwords do not match");
    } else {
      valida();
    }
    e.preventDefault();
  }
  function valida() {
    console.log(inp);
    setButload(true);
    axios
      .post("/api/reg", {
        inp,
      })
      .then(function (response) {
        console.log(response);
        login();
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  function login() {
    axios
      .post("/api/auth/login", {
        email: inp.email,
        password: inp.password,
      })
      .then(function (response) {
        setButload(false);
        Router.push("/dashboard");
      })
      .catch((e) => {
        setButload(false);
      });
  }
  return (
    <>
      <div className="collumn">
        <br />
        <div onClick={() => after()} className="hey">
          {msg ? (
            <>
              <div className="messtext">
                <Image
                  className="messtext2"
                  src="/close.png"
                  height={15}
                  width={15}
                ></Image>
                <b>{msg}</b> <br />
                <i className="messtext2"></i>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
          ref={animationParent}
        >
          <h2 className="formhead headline hl1">Create a new user account</h2>

          <div>Name </div>
          <div>
            <input
              required
              className="forminp"
              type="text"
              onChange={(e) => {
                setInp({ ...inp, name: e.target.value });
              }}
            ></input>
          </div>
          <div>E-mail</div>
          <div>
            <input
              required
              className="forminp"
              type="email"
              onChange={(e) => {
                setInp({ ...inp, email: e.target.value });
              }}
            ></input>
          </div>
          <div> Password</div>
          <div>
            <input
              className="forminp"
              required
              type="password"
              minLength="6"
              onChange={(e) => {
                setInp({ ...inp, password: e.target.value });
              }}
            ></input>
          </div>
          <div> Re-enter password</div>
          <div>
            <input
              required
              className="forminp"
              type="password"
              minLength="6"
              onChange={(e) => {
                setInp({ ...inp, password2: e.target.value });
              }}
            ></input>
          </div>
          <div>Phone number</div>
          <div>
            <input
              className="forminp"
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
          {/* <div>
              <h4>Address</h4>
            </div> */}

          <div>location</div>
          <div
            style={{
              display: "flex ",
              alignItems: "center",
              gap: "1%",
              alignContent: "center",
            }}
          >
            <input
              required
              className="forminp"
              readOnly
              // value={inp.loc}
              placeholder={`Lat ${inp.loc.lat}   Lng ${inp.loc.lng}`}
              style={{
                width: "50%",
              }}
              type="text"
              onChange={(e) => {
                setInp({ ...inp, loc: e.target.value });
              }}
            ></input>
            <div className="Link" onClick={() => setvis(!vis)}>
              click here to set
            </div>
          </div>
          {vis && (
            <>
              <RegMap setvis={setvis} inp={inp} setInp={setInp} />
            </>
          )}

          <button>
            <div style={{ display: "flex", alignItems: "center" }}>
              {butload && (
                <Image src={"/spinner.svg"} height={"30px"} width={"30px"} />
              )}{" "}
              Submit
            </div>
          </button>

          <br />
          <div style={{ marginTop: "1rem" }}>
            <Link href={"/agentRegister"}>
              <a className="Link">Create an Agent account</a>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
