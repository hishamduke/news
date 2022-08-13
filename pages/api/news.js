import axios from "axios";
const url =
  "https://newsapi.org/v2/top-headlines?country=in&apiKey=" +
  process.env.NEWSKEY;
export default async function handler(req, res) {
  await axios.get(url).then((res1) => {
    res.status(200).json(res1.data);
  });
}
