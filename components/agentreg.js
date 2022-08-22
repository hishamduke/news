import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import valida from "../lib/validate";
import Image from "next/image";
import Router from "next/router";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export default function AgentRegister() {
  const [msg, setmsg] = useState("");
  const [vis, setvis] = useState(false);
  const [inp, setInp] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    num: 0,
    loc: "",
  });
  const listRef = useAutoAnimate();
  const after = () => {
    setmsg();
  };
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
    axios
      .post("/api/agentreg", {
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
        Router.push("/dashboard");
      });
  }
  return (
    <>
      <div className="collumn">
        <br />
        <div onClick={() => after()} ref={listRef} className="hey">
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
        >
          <h2 className="formhead headline hl1">Create a new Agent account</h2>

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

          <div>Service location </div>
          <div>
            <input
              required
              className="forminp"
              type="text"
              onChange={(e) => {
                setInp({ ...inp, loc: e.target.value });
              }}
            ></input>
          </div>

          <div className="but">
            <button>Submit</button>{" "}
          </div>
          <br />
          <Link href={"/login"}>
            <div className="Link">Login to User account</div>
          </Link>
        </form>
      </div>
    </>
  );
}
