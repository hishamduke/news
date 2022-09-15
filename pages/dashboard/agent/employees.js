// import styles from "../../../styles/Empoyees.module.css";
import styles from "../../../styles/Employees.module.css";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import Image from "next/image";
import { useState } from "react";
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

  return (
    <>
      <NewEmp state={visible} action={setVisible} />
      <div className={styles.NewsCont} ref={animationParent}>
        <div className={styles.NewsBox} ref={animationParent}>
          {/* <img className={styles.NewsImg} src="/newsboy.jpg" /> */}
          <h1 className={styles.NewsName}>Name</h1>

          <p className={styles.p} style={{ textAlign: "center" }}>
            Kinalur
          </p>
          <p className={styles.p} style={{ textAlign: "center" }}>
            9947424367
          </p>
          <p className={styles.p} style={{ textAlign: "center" }}>
            3 Users assigned.
          </p>
          <button className={styles.button}>Manage</button>
        </div>

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
  const [inp, setInp] = useState({
    name: "",
    email: "",
    password: "",
    number: "",
  });
  const [butload, setButload] = useState(false);

  if (prop.state)
    return (
      <>
        <div
          className={styles.fullscreen}
          onClick={() => {
            prop.action(false);
          }}
        ></div>
        <div className={styles.inside} onClick={() => {}}>
          <form
            className={styles.form}
            onSubmit={(e) => {
              e.preventDefault();
              console.log("hi");
              // prop.action(false);
            }}
          >
            <label>name</label>
            <input
              required
              onChange={(e) => {
                setInp({ ...inp, name: e.target.value });
              }}
            />
            <label>email</label>
            <input
              type="email"
              onChange={(e) => {
                setInp({ ...inp, email: e.target.value });
              }}
            />
            <label>password</label>
            <input
              required
              type={"password"}
              onChange={(e) => {
                setInp({ ...inp, password: e.target.value });
              }}
            />
            <label>number</label>
            <div>
              <input
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
          </form>
        </div>
      </>
    );
}
