export default async function handler(req, res) {
  try {
    res.status(200).json("HI");
  } catch (e) {
    console.log(e);
    res.status(200).json({ error: e.name });
  }
}
