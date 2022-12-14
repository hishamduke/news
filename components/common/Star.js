const Star = (number) => {
  const starfilled = "★";
  const starempt = "☆";
  let out = "";
  for (let i = 0; i < 5; i++) {
    if (i < Math.floor(number.val)) {
      out = out + starfilled;
    } else {
      out = out + starempt;
    }
  }
  return <p style={{ fontSize: "1.5rem" }}>{out}</p>;
};

export default Star;
