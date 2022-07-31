import Link from "next/link";
export default function Index() {
  return (
    <>
      <div className="collumns">
        <div className="collumn">
          <br />

          <form>
            <Link href={"/login"}>
              <h2 className={("formhead", "Link")}>Login?</h2>
            </Link>
            <Link href={"/register"}>
              <h2 className={("formhead", "Link")}>
                Create a new user account?
              </h2>
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}
