import { useState } from "react";
import styles from "../../styles/Support.module.css";
import Image from "next/image";
import Router from "next/router";
import Link from "next/link";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import BackButton from "../../components/buttons/backButton";

export default function Main() {
  return (
    <>
      <BackButton />
      <Support />
    </>
  );
}
export function Support() {
  const [butload, setButload] = useState(false);

  const [content, setContent] = useState("");
  const [resp, setResp] = useState();
  let date = new Date();
  const { isLoading, error, data } = useQuery(["empdetails"], () =>
    fetch("/api/employees/empAgent").then((res) => res.json())
  );
  function handlesubmit(e) {
    e.preventDefault();
    setButload(true);

    axios
      .post("/api/employees/support", {
        content,
      })
      .then(function (response) {
        console.log(response.status);
        setResp(response.status);
        setTimeout(() => {
          setTimeout(setResp(""), 800);
        }, 1100);
        setTimeout(() => {
          // setTimeout(setResp(""), 800);
          Router.back();
          setButload(false);
        }, 900);
      });
  }
  if (data)
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
            <h2 className={"formhead"}>
              Write to
              <el
                style={{
                  backgroundColor: "#fee160",
                  margin: "10px",
                }}
              >
                {data[0]}
              </el>
              <br />
              your feedbacks and requests.
              <br />
              <p style={{ fontSize: "1.5rem" }}>{data[1]}</p>
            </h2>
            <p>Please input in the following field :</p>
            <textarea
              required
              placeholder="type here ..."
              className={styles.textarea1}
              style={{ width: "479px", height: "403px" }}
              onChange={(e) => {
                setContent(e.target.value);
              }}
            ></textarea>
            <p></p>
            <button>
              <div style={{ display: "flex", alignItems: "center" }}>
                {butload && (
                  <Image src={"/spinner.svg"} height={"30px"} width={"30px"} />
                )}
                submit
              </div>
            </button>
            <div>
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
              src="/newsillu3.webp"
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
