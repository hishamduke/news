export default async function handler(req, res) {
  console.log("im here");
  res.status(200).json({ name: "John Doe" });
}
