import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState, useRef } from "react";
import { queryClient } from "../../../pages/_app";
import styles from "../../../styles/ManagePapers.module.css";
import Image from "next/image";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { BiArrowBack } from "react-icons/bi";

export default function ManagePapers() {
  console.log("tabless");
  const listRef = useAutoAnimate();
  const [lang, setLang] = useState("English");

  const [butload, setButload] = useState(false);
  const { isLoading, error, data } = useQuery(["Langs"], () =>
    fetch("/api/admin/newslang").then((res) => res.json())
  );

  if (isLoading) return <>loading</>;

  // if (data) console.log(data);

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
  const listRef = useAutoAnimate();
  const [view, setView] = useState(false);

  const { isLoading, error, data } = useQuery(["Newspapers"], () =>
    fetch(`/api/admin/newspapers`).then((res) => res.json())
  );
  let newdata = [];
  if (data)
    for (let i = 0; i < data.length; i++) {
      console.log(data[i]);
      if (data[i].language == lang) newdata.push(data[i]);
      console.log("loop");
    }
  return (
    <>
      {/* {JSON.stringify(newdata.length)} */}

      <div className={styles.NewsCont} ref={listRef}>
        {view && <NewPaper a={setView} lang={lang} />}
        {newdata.length ? (
          <>
            <div className={styles.NewsBox} ref={listRef}>
              <img
                ref={listRef}
                className={styles.NewsImg}
                src={"/newspapers/manorama.jpg"}
              />
              <p className={styles.NewsName}>Malayala Manorama</p>
            </div>
            <div className={styles.NewsBox} ref={listRef}>
              <img
                ref={listRef}
                className={styles.NewsImg}
                src={"/newspapers/manorama.jpg"}
              />
              <p className={styles.NewsName}>Malayala Manorama</p>
            </div>
            <div className={styles.NewsBox} ref={listRef}>
              <img
                ref={listRef}
                className={styles.NewsImg}
                src={"/newspapers/manorama.jpg"}
              />
              <p className={styles.NewsName}>Malayala Manorama</p>
            </div>

            <div
              className={styles.NewsBox}
              ref={listRef}
              style={{ cursor: "pointer" }}
              onClick={() => setView(!view)}
            >
              <img
                ref={listRef}
                className={styles.NewsImg}
                src={"/newspapers/add.png"}
              />
              <p className={styles.NewsName}>Add a new newspaper</p>
            </div>
          </>
        ) : (
          <>
            {lang && (
              <div style={{ textAlign: "center" }}>
                <div
                  className={styles.Nofeed}
                  style={{
                    textAlign: "center",
                    marginBottom: "10px",
                    fontSize: 30,
                  }}
                  ref={listRef}
                >
                  There are no {lang} newspapers yet!
                </div>
                <div onClick={() => setView(!view)}>
                  <button className={styles.NewsName}>Add a new One</button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
function NewPaper(val) {
  const listRef = useAutoAnimate();
  let reader = new FileReader();
  const [inp, setInp] = useState({
    name: "",
    language: "",
    image: [],
    desc: "",
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
  function handleSubmit() {
    console.log("hi");
  }
  return (
    <div className={styles.NewCont}>
      <div className={styles.NewPaper} ref={listRef}>
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
        <input onChange={(e) => setInp({ ...inp, name: e.target.value })} />
        <label>language</label>
        <select
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
        <br />
        {!!inp.image.length && (
          <div style={{ textAlign: "center" }}>
            <img
              className={styles.img}
              src={inp.image}
              // style={{ height: "150px" }}
            />
          </div>
        )}
        <label>Description</label>
        <textarea
          onChange={(e) => {
            setInp({ ...inp, desc: e.target.value });
          }}
        />
        <div>
          <button
            style={{ marginRight: "10px" }}
            ref={listRef}
            onClick={() => {
              setButload(!butload);
              handleSubmit();
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              {butload && (
                <Image src={"/spinner.svg"} height={"30px"} width={"30px"} />
              )}
              Submit
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
