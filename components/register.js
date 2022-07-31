import Link from "next/link";
import { useState } from "react";
export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  function handlelogin(e) {
    e.preventDefault();
    axios
      .post("/api/user", {
        email,
        password,
      })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  return (
    <>
      <div className="collumns">
        <div className="collumn">
          <br />

          <form>
            <h2 className="formhead">Create a new user account</h2>
            <div>Name </div>
            <div>
              {" "}
              <input className="forminp" type="text"></input>
            </div>
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
                minLength={10}
                onChange={(e) => {
                  SVGAnimatedNumber(e.target.value);
                }}
              ></input>
            </div>
            <div>
              <h4>Address</h4>
            </div>
            <div>Housename </div>
            <div>
              {" "}
              <input className="forminp" type="text"></input>
            </div>
            <div>Streetname </div>
            <div>
              {" "}
              <input className="forminp" type="text"></input>
            </div>
            <div>Pin </div>
            <div>
              {" "}
              <input className="forminp" type="text"></input>
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
