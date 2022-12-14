import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { queryClient } from "../../../pages/_app";
import styles from "../../../styles/ManagePapers.module.css";
import Image from "next/image";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { BiArrowBack } from "react-icons/bi";

export default function ManagePapers() {
  console.log("tabless");
  // const [animationParent] = useAutoAnimate();
  const [lang, setLang] = useState("English");

  const [butload, setButload] = useState(false);
  const { isLoading, error, data } = useQuery(["Langs"], () =>
    fetch("/api/admin/newslang").then((res) => res.json())
  );

  if (data)
    return (
      <>
        {butload && (
          <div className={styles.Loading}>
            <div className={styles.LoadingText}>
              <div>Loading please wait..</div>
            </div>
          </div>
        )}

        <div className={styles.Base}>
          {/* {JSON.stringify(lang)} */}
          <div className={styles.In}>
            <div className={styles.DivSelect}>
              <div> Select language</div>
              <select
                className={styles.Select}
                name="lang"
                id="lang"
                defaultValue={""}
                onChange={(e) => {
                  console.log(e.target.value);
                  setLang(e.target.value);
                  queryClient.invalidateQueries(["Newspapers"]);
                }}
              >
                {data.map((val) => (
                  <option value={val} key={val}>
                    {val}
                  </option>
                ))}
              </select>
            </div>

            <NewsTable language={lang} />
          </div>
        </div>
      </>
    );
}
function NewsTable(val) {
  const lang = val.language;
  const [butload, setButload] = useState(false);
  const [animationParent] = useAutoAnimate();
  const [view, setView] = useState(false);

  const { isLoading, error, data } = useQuery(["Newspapers"], () =>
    fetch(`/api/admin/newspapers`).then((res) => res.json())
  );
  let newdata = [];
  if (data)
    for (let i = 0; i < data.length; i++) {
      // console.log(data[i]);
      if (data[i].language == lang) newdata.push(data[i]);
      // console.log("loop");
    }
  for (let i = 0; i < newdata.length; i++) {
    // newdata[0].img.replace(/ /g, "%20");
    newdata[i].img = newdata[i].img.replace(/ /g, "%20");
  }

  if (isLoading) {
    return (
      <div style={{ textAlign: "center" }}>
        <div
          className={styles.Nofeed}
          style={{
            textAlign: "center",
            marginBottom: "40px",
            fontSize: 30,
          }}
          // ref={animationParent}
        >
          Please wait....
        </div>
      </div>
    );
  }
  return (
    <>
      {/* {JSON.stringify(newdata.length)} */}

      {view && <NewPaper a={setView} lang={lang} />}
      {newdata.length ? (
        <div className={styles.NewsCont} ref={animationParent}>
          {newdata.map((val) => (
            <div
              className={styles.NewsBox}
              // ref={animationParent}
              key={val.name}
            >
              {console.log(val)}
              <h1 className={styles.NewsName}>{val.name.toUpperCase()}</h1>
              <img className={styles.NewsImg} src={val.img} />
              <p
                style={{
                  textAlign: "center",
                  height: "3rem",
                  overflow: "hidden",
                }}
              >
                {val.description}
              </p>
            </div>
          ))}
          <div
            className={styles.NewsBox}
            // ref={animationParent}
            style={{ cursor: "pointer" }}
            onClick={() => setView(!view)}
            key={"addnew"}
          >
            <h1 className={styles.NewsName}></h1>
            <img
              // ref={animationParent}
              className={styles.NewsImg}
              src={"/newspapers/add.png"}
            />
            <p
              // className={styles.NewsName}
              style={{
                textAlign: "center",
                height: "3rem",
                overflow: "hidden",
              }}
            >
              Add a new newspaper
            </p>
          </div>
        </div>
      ) : (
        <>
          {lang && (
            <div style={{ textAlign: "center" }}>
              <div
                className={styles.Nofeed}
                style={{
                  textAlign: "center",
                  marginBottom: "40px",
                  fontSize: 30,
                }}
                ref={animationParent}
              >
                There are no {lang} newspapers yet!
              </div>
              <div onClick={() => setView(!view)}>
                <button className={(styles.NewsName, "Link")}>
                  Add a new One
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
function NewPaper(val) {
  const [animationParent] = useAutoAnimate();
  let reader = new FileReader();
  const [inp, setInp] = useState({
    name: "",
    language: "",
    image: [],
    desc: "",
    price: 0,
  });
  // var fReader = new FileReader();

  async function handleImg() {
    reader.onload = function (e) {
      setInp({ ...inp, image: reader.result });
    };
    // console.log(reader.result);
  }
  console.log(inp);
  if (inp.language == "") {
    setInp({ ...inp, language: val.lang });
  }
  const [butload, setButload] = useState(false);
  const { isLoading, error, data } = useQuery(["Langs"], () =>
    fetch("/api/admin/newslang").then((res) => res.json())
  );
  function handleSubmit(e) {
    e.preventDefault();
    setButload(true);

    axios
      .post("/api/admin/addPaper", {
        inp,
      })
      .then(function (response) {
        queryClient.invalidateQueries(["Newspapers"]);
        console.log(response.status);
        const myTimeout = setTimeout(() => {
          setButload(false);
          setTimeout(val.a(false), 200);
        }, 100);
      })
      .catch(function (error) {
        console.log(error.response.data.error);
        setButload(false);
        if (error.response.data.error == "Non unique")
          alert("A newspaper with same name exist in this language,Try again");
      });
    console.log("hi");
  }
  return (
    <>
      <div className={styles.NewCont}>
        <form
          className={styles.NewPaper}
          ref={animationParent}
          onSubmit={(e) => handleSubmit(e)}
        >
          <div>
            <p
              style={{
                // marginLeft: "10%",
                fontSize: "medium",
                // backgroundColor: "red",
                width: "fit-content",
              }}
              className="zoom"
              onClick={() => {
                val.a(false);
              }}
            >
              {<BiArrowBack />} go back
            </p>
          </div>

          <label>Name</label>
          <input
            onChange={(e) => setInp({ ...inp, name: e.target.value })}
            required
            minLength={3}
          />
          <label>language</label>
          <select
            required
            className={styles.Select}
            name="lang"
            id="lang"
            defaultValue={val.lang}
            onChange={(e) => {
              setInp({ ...inp, language: e.target.value });
              queryClient.invalidateQueries(["Newspapers"]);
            }}
          >
            {data.map((val) => (
              <option value={val} key={val}>
                {val}
              </option>
            ))}
          </select>
          <label>Logo</label>

          <input
            id="logo"
            type="file"
            accept="image/*"
            capture="camera"
            onChange={(e) => {
              reader.readAsDataURL(e.target.files[0]);
              handleImg();
              setInp({ ...inp, image: reader });
            }}
          />

          {!!inp.image.length && (
            <div style={{ textAlign: "center" }}>
              <img
                className={styles.img}
                src={inp.image}
                style={{ height: "150px", width: "150px" }}
              />
            </div>
          )}
          <label>Price per month</label>
          <input
            onChange={(e) => setInp({ ...inp, price: e.target.value })}
            required
            type="number"
          />

          <label>Description</label>
          <textarea
            required
            style={{
              height: "2rem",
            }}
            onChange={(e) => {
              setInp({ ...inp, desc: e.target.value });
            }}
          />
          <div>
            <button
              style={{ marginRight: "10px" }}
              ref={animationParent}
              type="submit"
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                {butload && (
                  <Image src={"/spinner.svg"} height={"30px"} width={"30px"} />
                )}
                Submit
              </div>
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
