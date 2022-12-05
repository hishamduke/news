import { useState } from "react";
import styles from "../../../styles/Support.module.css";
import Image from "next/image";
import Router from "next/router";
import Link from "next/link";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import axios from "axios";
import BackButton from "../../../components/buttons/backButton";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../components/common/LoadingSpinner";
export default function AgentSupport() {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [animationParent] = useAutoAnimate();

  let date = new Date();
  const { isLoading, error, data } = useQuery(["currentagent"], () =>
    fetch("/api/user/currentagent").then((res) => res.json())
  );
  const handlesubmit = (e) => {
    e.preventDefault();

    axios.post("/api/user/feedagent", { content });
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      Router.back();
    }, 1200);
  };
  if (data)
    return (
      <>
        <BackButton />

        <div className={styles.supportCont}>
          <form
            className={styles.form}
            onSubmit={(e) => {
              handlesubmit(e);
            }}
            ref={animationParent}
          >
            <h2 className={"formhead"}>
              Writing to your Agent{" "}
              <el
                style={{
                  backgroundColor: "#fee160",
                }}
              >
                {data.name}
              </el>
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
            <button>submit</button>
            {loading ? <LoadingSpinner /> : ""}
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
