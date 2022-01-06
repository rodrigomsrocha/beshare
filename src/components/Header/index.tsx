import styles from "./styles.module.scss";
import Search from "../../assets/icons/search.svg";
import Link from "next/link";
import { FormEvent, useState } from "react";
import Router from "next/router";

export function Header() {
  const [search, setSearch] = useState("");
  function handleSearch(e: FormEvent) {
    e.preventDefault();
    setSearch("");
  }

  function handleRedirect() {
    Router.push("/account");
  }

  return (
    <div className={styles.holder}>
      <header className={`container ${styles.header}`}>
        <h1>Beshare</h1>
        <div className={styles.nav}>
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            <button type="submit">
              <Search />
            </button>
          </form>
          <ul>
            <li>
              <a>
                <Link href="/">Home</Link>
              </a>
            </li>
            <li>
              <a>
                <Link href="/chat">Chat</Link>
              </a>
            </li>
            <li>
              <button>Notifications</button>
            </li>
            <li>
              <div className={styles.profile}>
                <div className={styles.tooltip}>
                  <button onClick={handleRedirect}>Login</button>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </header>
    </div>
  );
}
