import Link from "next/link";
export default function Footer() {
  console.log("footer mounted");

  return (
    <>
      <div className="newfoot">
        <div className="contfoot">
          <div className="newli">© Newspaper Subscription System 2022</div>
          <ul className="newul">
            <li className="newli">
              <Link href="Tel: 123321">
                <a className="newa">Call-us</a>
              </Link>
            </li>
            <li className="newli">
              <Link href="mailto:hishamdkz@gmail.com">
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
      </div>
    </>
  );
}
