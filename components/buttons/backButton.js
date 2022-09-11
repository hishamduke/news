import Router from "next/router";
import { BiArrowBack } from "react-icons/bi";
export default function BackButton() {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          //   backgroundColor: "red",
          alignContent: "center",
        }}
      >
        <p
          style={{
            // marginLeft: "10%",
            fontSize: "medium",
            // backgroundColor: "red",
            width: "fit-content",
            alignSelf: "center",
            // backgroundColor: "red",
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
