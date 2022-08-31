import { useState } from "react";
import styles from "../styles/Support.module.css";
import Image from "next/image";
import Router from "next/router";
import Link from "next/link";
import axios from "axios";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export default function Support() {
  const listRef = useAutoAnimate();
  const [content, setContent] = useState("");
  const [resp, setResp] = useState();
  let date = new Date();
  function handlesubmit(e) {
    e.preventDefault();
    axios
      .post("/api/post/support", {
        content,
      })
      .then(function (response) {
        console.log(response.status);
        setResp(response.status);

        const myTimeout = setTimeout(() => {
          Router.push("/dashboard");
          setTimeout(setResp(""), 3000);
        }, 3000);
      });
  }
  return (
    <>
      <br />
      <div className={styles.supportCont}>
        <form
          className={styles.form}
          onSubmit={(e) => {
            handlesubmit(e);
          }}
        >
          <h2 className={"formhead"}>We are happy to help you.</h2>
          <p>Please input in the following field :</p>
          <textarea
            placeholder="type here ..."
            className={styles.textarea1}
            onChange={(e) => {
              setContent(e.target.value);
            }}
          ></textarea>
          <p></p>
          <button> submit</button>
          <div ref={listRef}>
            {" "}
            {resp == 200 && (
              <>
                <p>
                  Feedback posted
                  <br />
                  Redirecting automatically...
                </p>
              </>
            )}
            {resp == 404 && <p>Sorry an error occured</p>}
          </div>
        </form>
        <div className={styles.imge}>
          <Image
            src="/news2.png"
            height={"300"}
            width={"250"}
            // style={{ transform: "translateY(-40px)" }}
          ></Image>
        </div>
      </div>

      <br />
    </>
  );
}
