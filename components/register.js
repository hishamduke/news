import Link from "next/link";
import { useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
export default function Register() {
  const listRef = useAutoAnimate();
  const [email, setEmail] = useState("");
  const [emailmsg, setEmailmsg] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [num, setNum] = useState("");
  const [house, setHouse] = useState("");
  const [street, setStreet] = useState("");
  const [pin, setPin] = useState("");
  function handleSubmit(e) {
    e.preventDefault();

    if (!email) {
      setEmailmsg("Enter email");
    }
  }
  return (
    <>
      <div className="collumns">
        <div className="collumn">
          <br />
          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <h2 className="formhead">Create a new user account</h2>
            <div>Name </div>
            <div>
              {" "}
              <input className="forminp" type="text"></input>
            </div>

            <div>
              E-mail<div ref={listRef}>{emailmsg}</div>
            </div>
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
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              ></input>
            </div>
            <div> Re-enter password</div>
            <div>
              {" "}
              <input
                className="forminp"
                type="password"
                onChange={(e) => {
                  setPassword2(e.target.value);
                }}
              ></input>
            </div>
            <div> Phone number</div>
            <div>
              {" "}
              <input
                className="forminp"
                type="number"
                minLength={5}
                onChange={(e) => {
                  setNum(e.target.value);
                }}
              ></input>
            </div>

            {/* <div>
              <h4>Address</h4>
            </div> */}
            <div>Housename </div>
            <div>
              {" "}
              <input
                className="forminp"
                type="text"
                onChange={(e) => {
                  setHouse(e.target.value);
                }}
              ></input>
            </div>
            <div>Streetname </div>
            <div>
              {" "}
              <input
                className="forminp"
                type="text"
                onChange={(e) => {
                  setStreet(e.target.value);
                }}
              ></input>
            </div>
            <div>Pin </div>
            <div>
              {" "}
              <input
                className="forminp"
                type="number"
                minLength={6}
                maxLength={6}
                onChange={(e) => {
                  setPin(e.target.value);
                }}
              ></input>
            </div>

            <div className="but">
              <button>Submit</button>{" "}
            </div>
            <br />
            <Link href={"/login"}>
              <div className="Link">Create an User account</div>
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}
