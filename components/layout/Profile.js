import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import styles from "../../styles/Profile.module.css";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useState, useMemo } from "react";
import { logout } from "../../lib/logout";
import Router from "next/router";

export default function Profile() {
  const [animationParent] = useAutoAnimate();
  const [show, setShow] = useState(false);
  const [uname, setUname] = useState();

  function handleclick() {
    setShow(!show);
  }

  function go(val) {
    setShow(!show);
    Router.push("/" + val);
  }
  async function fetcher() {
    return await fetch("/api/account");
  }

  const { isLoading, error, data } = useQuery(["account"], () =>
    fetcher().then((res) => res.json())
  );

  // if (data) console.log(data);
  if (data) {
    if (data.role == "AGENT" || data.role == "USER")
      return (
        <>
          <div ref={animationParent}>
            <div
              className={styles.head}
              style={{ marginRight: 10 }}
              onClick={() => handleclick()}
            >
              <Image src={"/user.png"} height={"16%"} width={"16%"}></Image>
            </div>

            {show && (
              <div className={styles.profileCont}>
                <div
                  className={styles.filler}
                  onClick={() => handleclick()}
                ></div>
                <div className={styles.born}>
                  <div className={styles.dropMenu}>
                    <div className={styles.row1}>
                      <b style={{ fontSize: 17 }}>Hey {data.name}.</b>
                      <br />
                    </div>
                    <div
                      className={styles.row}
                      onClick={() => {
                        handleclick();
                        go("dashboard");
                      }}
                    >
                      🏠 Home
                    </div>
                    <div className={styles.row}>👤 Profile</div>

                    <div
                      className={styles.row}
                      onClick={() => {
                        handleclick();
                        go("support");
                      }}
                    >
                      ✉️ Write to Admin
                    </div>
                    <div
                      className={styles.row}
                      onClick={() => {
                        handleclick();
                        logout();
                      }}
                    >
                      🚶 Logout
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      );
  }
}
