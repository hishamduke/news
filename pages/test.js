import useSWR from "swr";
const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Profile() {
  const { data, error } = useSWR("/api/auth/user", fetcher);
  console.log(data);
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  return <div>hello {data.Message.name}!</div>;
}
