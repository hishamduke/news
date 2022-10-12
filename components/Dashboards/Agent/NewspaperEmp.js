import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { BiArrowBack } from "react-icons/bi";
const NewsEmp = ({ setVisible }) => {
  const router = useRouter();

  const { id } = router.query;

  const { isLoading, error, data } = useQuery([`employee${id}`], () =>
    fetch(`/api/agent/employees/${id}`).then((res) => res.json())
  );
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
            setVisible(0);
          }}
        >
          {<BiArrowBack />} back
        </p>
      </div>

      <div className="dashboard">
        <form>
          <h2 className={"formhead test"}>Newspapers of {data.name}</h2>
          <h4>hi</h4>
          {/* <p className={" Link"} onClick={() => setVisible(2)}>
              Newspapers
            </p> */}
        </form>
      </div>
    </>
  );
};

export default NewsEmp;
