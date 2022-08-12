import Login from "../components/login";

export default function Home() {
  console.log(" login mounted");

  return (
    <>
      <div className="collumns">
        <Login />
      </div>
    </>
  );
}
