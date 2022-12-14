import Link from "next/link";
import Router from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";
import { queryClient } from "../../pages/_app";
import Image from "next/image";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import Breaking from "../../components/breaking";
import { logout } from "../../lib/logout";
export default function Main() {
  return (
    <>
      <div className="collumns" style={{}}>
        <div className="collumn">
          <Login />
        </div>
        <Breaking />
      </div>
    </>
  );
}
export function Login() {
  const [parent] = useAutoAnimate(/* optional config */);

  const [axres, setAxres] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [items, setItems] = useState([]);
  const [butload, setButload] = useState(false);

  useEffect(() => {
    fetch("/api/auth/logout");
  }, []);

  function handlelogin(e) {
    setTimeout(() => setItems([]), 4000);
    e.preventDefault();
    setButload(true);
    axios
      .post("/api/employees/login", {
        email,
        password,
      })
      .then(function (response) {
        setAxres(1);
        queryClient.invalidateQueries("account");
        Router.push("/employees/dashboard");
      })
      .catch(function (error) {
        setButload(false);
        setItems(["Invalid credentials"]);
        setAxres(0);
      });
  }

  return (
    <>
      <form
        onSubmit={(e) => handlelogin(e)}
        style={{ display: "flex", flexDirection: "column", gap: ".6rem" }}
      >
        <h2 className="headline hl4">Login to Employee account</h2>
        <div>
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
          <div> Password</div>
          <div>
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
        </div>

        <div ref={parent}>
          {items.map((item) => (
            <div key={item}>{item}</div>
          ))}
        </div>
        <div style={{ display: "content" }}>
          Go to&nbsp;
          <Link href={"/"}>
            <a className="Link">Home </a>
          </Link>
          /
          <Link href={"/login"}>
            <a className="Link">Login for Users </a>
          </Link>
        </div>

        <br />
      </form>
    </>
  );
}
