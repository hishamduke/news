import Link from "next/link";
import Router from "next/router";
import { useState } from "react";
import axios from "axios";
import { useAutoAnimate } from "@formkit/auto-animate/react";
export default function Login() {
  const listRef = useAutoAnimate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [axres, setAxres] = useState("");
  function handlelogin(e) {
    e.preventDefault();
    axios
      .post("/api/auth/login", {
        email,
        password,
      })
      .then(function (response) {
        setAxres("");
        Router.push("/dashboard");
      })
      .catch(function (error) {
        setAxres("Invalid credentials");
      });
  }

  return (
    <>
      <div className="collumns">
        <div className="collumn">
          <br />

          <form onSubmit={(e) => handlelogin(e)}>
            <h2 className="formhead">Login to account</h2>
            <div>E-mail </div>
            <div>
              {" "}
              <input
                className="forminp"
                type="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              ></input>
            </div>
            <div> Password</div>
            <div>
              {" "}
              <input
                className="forminp"
                type="password"
                minLength={5}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              ></input>
            </div>
            <div className="but">
              <button>Login</button>
            </div>
            <br />
            <div ref={listRef}>{axres}</div>
            <Link href={"/dashboard"}>
              <div className="Link">Create an User account</div>
            </Link>
            <br />
          </form>
        </div>
      </div>
    </>
  );
}
