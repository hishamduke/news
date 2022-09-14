// import styles from "../../../styles/Empoyees.module.css";
import styles from "../../../styles/Employees.module.css";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import Image from "next/image";
export default function employees() {
  return (
    <>
      <Employee />
    </>
  );
}
function Employee() {
  const [animationParent] = useAutoAnimate();
  return (
    <div className={styles.NewsCont} ref={animationParent}>
      <>
        <div className={styles.NewsBox} ref={animationParent}>
          {/* <img className={styles.NewsImg} src="/newsboy.jpg" /> */}
          <h1 className={styles.NewsName}>Name</h1>

          <p className={styles.p} style={{ textAlign: "center" }}>
            Kinalur
          </p>
          <p className={styles.p} style={{ textAlign: "center" }}>
            9947424367
          </p>
          <p className={styles.p} style={{ textAlign: "center" }}>
            3 Users assigned.
          </p>
          <button className={styles.button}>Manage</button>
        </div>
      </>
      <>
        <div className={styles.NewsBox} ref={animationParent}>
          {/* <img className={styles.NewsImg} src="/newsboy.jpg" /> */}
          <h1 className={styles.NewsName}>Add a new employee</h1>

          <button className={styles.button}>Add</button>
        </div>
      </>
    </div>
  );
}
