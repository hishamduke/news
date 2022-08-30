import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import styles from "../../styles/Profile.module.css";
export default function Profile() {
  const { isLoading, error, data } = useQuery(["roleData"], () =>
    fetch("/api/userrole").then((res) => res.json())
  );
  if (data)
    if (data == "AGENT")
      return (
        <>
          <div className={styles.head} style={{ marginRight: 10 }}>
            <Image src={"/user.png"} height={"20%"} width={"20%"}></Image>
          </div>
          <div className={styles.profileCont}>
            <div className={styles.filler}></div>
            <div className={styles.born}>
              <div className={styles.dropMenu}>
                <div className={styles.row}>
                  <b>Hey Hisham.</b>
                  <br />
                  <br />
                </div>
                <div className={styles.row}>Profile</div>

                <div className={styles.row}>Logout</div>
              </div>
            </div>
          </div>
        </>
      );
}
