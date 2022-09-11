import Link from "next/link";
import Router from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";
import { queryClient } from "../pages/_app";
import Image from "next/image";
import { useAutoAnimate } from "@formkit/auto-animate/react";
export default function Login() {
  const listRef = useAutoAnimate();
  const [axres, setAxres] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [butload, setButload] = useState(false);

  useEffect(() => {
    queryClient.invalidateQueries("account");
    axios
      .get("/api/auth/cook")
      .then(function (response) {
        if (response.data.Message !== true) {
          axios.get("/api/auth/logout");
        }
      })
      .catch(function (error) {});
  }, []);

  function handlelogin(e) {
    setTimeout(() => setAxres(""), 4000);
    e.preventDefault();
    setButload(true);
    axios
      .post("/api/auth/login", {
        email,
        password,
      })
      .then(function (response) {
        setAxres("");
        queryClient.invalidateQueries("account");
        Router.push("/dashboard");
      })
      .catch(function (error) {
        setButload(false);
        setAxres("Invalid credentials");
      });
  }

  return (
    <>
      <div className="collumn">
        <br />
        <form onSubmit={(e) => handlelogin(e)}>
          <h2 className="headline hl4">Login to account</h2>
          <div>E-mail </div>
          <div>
            <input
              className="forminp"
              type="email"
              required
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            ></input>
          </div>
          <div> Password</div>
          <div>
            {" "}
            <input
              required
              className="forminp"
              type="password"
              minLength={5}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            ></input>
          </div>
          <div className="but">
            <button>
              <div style={{ display: "flex", alignItems: "center" }}>
                {butload && (
                  <Image src={"/spinner.svg"} height={"30px"} width={"30px"} />
                )}
                Login
              </div>
            </button>
          </div>
          <br />
          <div ref={listRef} className="axres">
            {axres}
          </div>

          <div style={{ display: "flex" }}>
            Create an
            <Link href={"/register"}>
              <a className="Link">User account </a>
            </Link>
            /
            <Link href={"/agentRegister"}>
              <a className="Link">Agent account </a>
            </Link>
          </div>

          <br />
        </form>
      </div>
    </>
  );
}
