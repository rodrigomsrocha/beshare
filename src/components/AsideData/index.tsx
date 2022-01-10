import Link from "next/link";
import Router from "next/router";
import { useGlobalContext } from "../../contexts/GlobalContext";
import { Button } from "../AccountBox/Button";
import styles from "./styles.module.scss";

export function AsideData() {
  const { user } = useGlobalContext();

  function handleRedirect() {
    Router.push("/account");
  }
  return (
    <div className={styles.asideData}>
      {user ? (
        <>
          <Link href="/profile">
            <a>
              <div
                className="profilePurple"
                style={{
                  backgroundImage: `url(${user?.photoURL})`,
                }}
              ></div>
            </a>
          </Link>
          <div className={styles.info}>
            <strong>{user?.username}</strong>
            <span>{user?.name}</span>
          </div>
        </>
      ) : (
        <button onClick={handleRedirect}>Login</button>
      )}
    </div>
  );
}
