import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";

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

export default function Breaking() {
  const { isLoading, error, data } = useQuery(["News"], () =>
    axios.get("/api/news").then((res) => {
      return res.data;
    })
  );

  if (isLoading)
    return (
      <>
        <div className="collumn">
          <div className="head">
            <span className="headline hl2">Loading........</span>
          </div>
        </div>
      </>
    );

  if (error) return "An error has occurred: " + error.message;

  const num = genrandom();
  const num2 = genrandom2(num);
  const news = data.articles[num];
  // const news2 = data.articles[num2];

  if (data)
    return (
      <>
        <News>{news}</News>
      </>
    );
}
function News(props) {
  const news = props.children;
  if (news.title)
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
              {/* <Image src={news.urlToImage} height={900} width={1600} /> */}

              <figcaption className="figcaption">
                source : {news.source.name}
              </figcaption>
            </figure>

            {!!news.content && <p>{news.content.split("[")[0]}</p>}
            <p>
              <Link href={news.url}>more....</Link>
            </p>
          </>
        </div>
      </>
    );
}
