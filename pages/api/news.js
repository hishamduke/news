import axios from "axios";
const add = "https://newsapi.org/v2/top-headlines?country=in&apiKey=";
const url = add + process.env.NEWSKEY;
export default async function handler(req, res) {
  await axios.get(url).then((res1) => {
    res.status(200).json(res1.data);
  });
}
