import Link from "next/link";
export default function Footer() {
  console.log("footer mounted");

  return (
    <>
      <div className="foot">
        <div className="subfoot">
          <Link href={"/agentRegister"}>
            <div className="Link"> Create an Agent account instead?</div>
          </Link>
        </div>
      </div>
    </>
  );
}
