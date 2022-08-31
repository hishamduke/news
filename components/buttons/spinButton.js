import Image from "next/image";
import { useState } from "react";

export function SpinButton(child) {
  console.log(child.children);
  const [butload, setButload] = useState(false);
  return (
    <>
      <button
        onClick={() => {
          setButload(!butload);
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          {butload && (
            <Image src={"/spinner.svg"} height={"30px"} width={"30px"} />
          )}{" "}
          {child.children}
        </div>
      </button>
    </>
  );
}
