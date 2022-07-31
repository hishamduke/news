import Link from "next/link";
export default function Footer() {
  return (
    <>
      <div className="foot">
        <div className="subfoot">
          <Link href={"/a"}>
            <div className="Link"> Create an Agent account instead?</div>
          </Link>
        </div>
      </div>
    </>
  );
}
