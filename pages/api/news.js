const add = "https://newsapi.org/v2/top-headlines?country=in&apiKey=";
const url = add + process.env.NEWSKEY;
export default async function handler(req, res) {
  try {
    const val = await fetch(url).then((res1) => res1.json());
    // console.log(val);
    // console.log(url);
    return res.status(200).json(val);
  } catch (error) {
    console.log(error);
    return res.status(404).json({ error: "true" });
  }
}
