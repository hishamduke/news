import Link from "next/link";
export default function Footer() {
  console.log("footer mounted");

  return (
    <>
      <div className="newfoot">
        <ul className="newul">
          <li className="newli">
            <a className="newa" href="https://twitter.com/julesforrest">
              Twitter
            </a>
          </li>
          <li className="newli">
            <Link href="Tel: 123321">
              <a className="newa">Call-us</a>
            </Link>
          </li>
          <li className="newli">
            <Link href="mailto:julesforrest@gmail.com">
              <a className="newa">Email</a>
            </Link>
          </li>

          <li className="newli">
            <Link href={"https://github.com/hishamduke/News"}>
              <a className="newa">Github</a>
            </Link>
          </li>
          <li className="newli">
            <p>👋</p>
          </li>
        </ul>
      </div>
    </>
  );
}
