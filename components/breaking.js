import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
function genrandom() {
  return Math.floor(Math.random() * (18 - 0 + 1) + 0);
}
function genrandom2(val) {
  let newval = genrandom();
  if (newval == val) {
    return genrandom2();
  } else {
    return newval;
  }
}
function News(props) {
  console.log("here bois");
  const news = props.children;
  return (
    <>
      <div className="collumn">
        <div className="head">
          <span className="headline hl4">{news.title}</span>
        </div>
        <p>{news.description}</p>
        <>
          <figure className="figure">
            <img className="media" src={news.urlToImage}></img>

            <figcaption className="figcaption">
              source : {news.source.name}
            </figcaption>
          </figure>
          <p>{news.content}</p>
          <p>
            <Link href={news.url}>Read more....</Link>
          </p>
        </>{" "}
      </div>
    </>
  );
}
export default function breaking() {
  const { isLoading, error, data } = useQuery(["News"], () =>
    axios.get("/api/news").then((res) => {
      return res.data;
    })
  );

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  const num = genrandom();
  const num2 = genrandom2(num);
  const news = data.articles[num];
  const news2 = data.articles[num2];
  console.log(num + " " + num2);
  return (
    <>
      <News>{news}</News>
      <News>{news2}</News>
    </>
  );
}
