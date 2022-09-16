import Router from "next/router";
import { BiArrowBack } from "react-icons/bi";
export default function BackButton() {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <p
          style={{
            fontSize: "medium",
            width: "fit-content",
            alignSelf: "center",
          }}
          className="zoom"
          onClick={() => {
            Router.back();
          }}
        >
          {<BiArrowBack />} back
        </p>
      </div>
    </>
  );
}
