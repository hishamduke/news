import Router from "next/router";
export default function Logout() {
  const logout = async () => {
    let val = await fetch("/api/auth/logout");
    Router.push("/login");
  };
  return (
    <>
      <button
        onClick={(e) => {
          e.preventDefault();
          logout();
        }}
      >
        logout
      </button>
    </>
  );
}
