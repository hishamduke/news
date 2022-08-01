import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useState } from "react";

export default function Message(arg) {
  const listRef = useAutoAnimate();
  const [init, setInit] = useState("1");
  const [axres, setAxres] = useState("");
  if (init) {
    setAxres(arg.children);
    console.log(axres);
    setInit(0);
  }
  return (
    <>
      <div ref={listRef}>{axres}</div>
      {/* {axres} */}
    </>
  );
}
