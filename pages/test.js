import useSWR from "swr";
import axios from "axios";
import Footer from "../components/footer";
import Header from "../components/header";
import login from "../components/login";
import Breaking from "../components/breaking";
const fetcher = (url) => fetch(url).then((res) => res.json());
import { logout } from "../lib/logout";
import Login from "../components/login";
// export default function Profile() {
//   const { isLoading, error, data } = useQuery(["repoData"], () =>
//     axios.get("/api/current").then((res) => {
//       return res.data;
//     })
//   );

//   if (isLoading) return "Loading...";

//   if (error) return "An error has occurred: " + error.message;

//   return (
//     <form>
//       <h1>{data.name}</h1>
//       <p>{data.email}</p>
//       <strong>👀 {data.num}</strong> <strong>✨ {data.house}</strong>{" "}
//       <strong>🍴 {data.pin}</strong>
//     </form>
//   );
// }

export default function Profile() {
  return (
    <div className="body">
      <div className="content">
        <div className="collumns">
          <Login />

          <Breaking></Breaking>
        </div>
      </div>
    </div>
  );
}
