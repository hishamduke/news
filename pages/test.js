import useSWR from "swr";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
const fetcher = (url) => fetch(url).then((res) => res.json());
import { logout } from "../lib/logout";
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
    <>
      <div className="collumns">
        <div className="collumn">hihihihihihihihihihihihihihihihihi</div>
        <div className="collumn">hey</div>
      </div>
    </>
  );
}
