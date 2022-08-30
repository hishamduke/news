import styles from "../styles/Support.module.css";
export default function Support() {
  let date = new Date();
  function handlesubmit(e) {
    e.preventDefault();
    console.log(e);
  }
  return (
    <>
      <br />
      <div className={styles.supportCont}>
        <form
          className={styles.form}
          onSubmit={(e) => {
            handlesubmit(e);
          }}
        >
          <h2 className={"formhead"}>We are happy to help you.</h2>
          <p>Please input in the following field :</p>

          <textarea
            placeholder="type here ..."
            className={styles.textarea1}
          ></textarea>
          <p></p>
          <button> submit</button>
        </form>
      </div>
      <br />
    </>
  );
}
