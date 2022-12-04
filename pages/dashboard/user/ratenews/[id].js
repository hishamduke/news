// import styles from "../../../styles/Empoyees.module.css";
import styles from "../../../../styles/Rating.module.css";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import Image from "next/image";
import axios from "axios";
import BackButton from "../../../../components/buttons/backButton";
import { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import Router from "next/router";
import { useQuery } from "@tanstack/react-query";

import { queryClient } from "../../../_app";
import { useRouter } from "next/router";
import Loading from "../../../../components/common/Loading";
import LoadingSpinner from "../../../../components/common/LoadingSpinner";

export default function employees() {
  const router = useRouter();
  const { id } = router.query;
  if (id)
    return (
      <>
        <BackButton />
        <Employee id={id} />
      </>
    );
}
function Employee({ id }) {
  const { isLoading, error, data } = useQuery(["anyagents"], () =>
    fetch(`/api/user/news/${id}`).then((res) => res.json())
  );

  queryClient.invalidateQueries(["currentrating"]);

  const { loading: loading2, data: data2 } = useQuery(
    [`currentratingnews`],
    () => fetch(`/api/user/rating/current/${id}`).then((res) => res.json())
  );
  const [rating, setRating] = useState(0);
  const [init, setInit] = useState(0);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");
  const handlesubmit = (e) => {
    e.preventDefault();
    axios.post("/api/user/rating/ratingNews", { id, rating, content });
    queryClient.invalidateQueries("currentrating");
    setLoading(true);
    setTimeout(() => {
      queryClient.invalidateQueries(["currentrating"]);

      Router.push("/dashboard");
    }, 1000);
  };

  if (data2) {
    console.log(data2);
    if (!init) {
      setRating(data2.rating);
      setContent(data2.feedback);
      setInit(1);
    }
  }
  if (data)
    return (
      <>
        <div className={styles.supportCont}>
          <form
            className={styles.form}
            onSubmit={(e) => {
              handlesubmit(e);
            }}
          >
            <h2 className={"formhead"}>Rate your Newspaper - {data.name}</h2>
            <p>Input your rating</p>
            <StarIcon rating={rating} setRating={setRating} />
            <p>Enter any additional feedback you have here!</p>
            <textarea
              placeholder="type here ..."
              className={styles.textarea1}
              onChange={(e) => {
                setContent(e.target.value);
              }}
              value={content}
            ></textarea>
            <p>
              <button>Done</button>
            </p>
            {loading ? <LoadingSpinner /> : ""}
          </form>
        </div>
      </>
    );
}

function StarIcon({ rating, setRating }) {
  const starEmpty = "☆";
  const starFilled = "★";
  const rows = [];
  function handleClick(i) {
    if (i < 0) setRating(0);
    else if (i > 5) setRating(5);
    else setRating(i);
  }

  for (let i = 1; i <= 5; i++) {
    if (rating + 1 > i)
      rows.push(
        <p
          onClick={() => {
            handleClick(i);
          }}
          key={i}
        >
          {starFilled}
        </p>
      );
    else
      rows.push(
        <p
          onClick={() => {
            handleClick(i);
          }}
          key={i}
        >
          {starEmpty}
        </p>
      );
  }
  rows.push(
    <p
      onClick={() => {
        handleClick(rating - 1);
      }}
      key={"down"}
    >
      ⬇
    </p>
  );
  rows.push(
    <p
      onClick={() => {
        handleClick(rating + 1);
      }}
      key={"up"}
    >
      ⬆
    </p>
  );
  return <div style={{ display: "flex", cursor: "pointer" }}>{rows}</div>;
}
