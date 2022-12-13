import Link from "next/link";
import Router from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";
import { queryClient } from "../pages/_app";
import Image from "next/image";
import { useAutoAnimate } from "@formkit/auto-animate/react";
export default function Login() {
  const [parent] = useAutoAnimate(/* optional config */);

  const [axres, setAxres] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [items, setItems] = useState([]);

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
    setTimeout(() => setItems([]), 4000);
    e.preventDefault();
    setButload(true);
    axios.post("/api/auth/forgot", {
      email,
    });
    // .then(function (response) {
    //   setAxres(1);
    //   queryClient.invalidateQueries("account");
    //   Router.push("/dashboard");
    // })
    // .catch(function (error) {
    //   setButload(false);
    //   setItems(["Invalid credentials"]);
    //   setAxres(0);
    // });
  }

  return (
    <>
      <div className="collumn">
        <br />
        <form onSubmit={(e) => handlelogin(e)}>
          <h2 className="headline hl4">Forgot your password?</h2>
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
          <br />
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
          <div ref={parent}>
            {items.map((item) => (
              <div key={item}>{item}</div>
            ))}
          </div>
          <br />
          <div style={{ display: "content", marginBottom: "1rem" }}>
            Create an&nbsp;
            <Link href={"/register"}>
              <a className="Link">User account </a>
            </Link>
            /
            <Link href={"/agentRegister"}>
              <a className="Link">Agent account </a>
            </Link>
          </div>
          <div style={{ display: "content" }}>
            Or Log into&nbsp;
            <Link href={"/employees/login"}>
              <a className="Link">Employees account </a>
            </Link>
          </div>

          <br />
        </form>
      </div>
    </>
  );
}
