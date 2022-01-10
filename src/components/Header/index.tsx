import Search from "../../assets/icons/search.svg";
import Link from "next/link";
import { FormEvent, useState } from "react";
import Router from "next/router";
import { useGlobalContext } from "../../contexts/GlobalContext";
import styles from "./styles.module.scss";
import Pencil from "../../assets/icons/larger-edit.svg";

export function Header() {
  const { logout, user } = useGlobalContext();

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
      <header className={`container header ${styles.header}`}>
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
              <div
                className={styles.profile}
                style={{
                  backgroundImage: `url(${user?.photoURL})`,
                }}
              >
                <div className={styles.tooltip}>
                  {user ? (
                    <div className={styles.controls}>
                      <Link href="/profile">
                        <a>
                          <div
                            className="profile"
                            style={{
                              backgroundImage: `url(${user?.photoURL})`,
                            }}
                          ></div>
                          Profile
                        </a>
                      </Link>
                      <Link href="/profile/edit">
                        <a>
                          <Pencil />
                          Profile
                        </a>
                      </Link>
                      <button onClick={logout}>Logout</button>
                    </div>
                  ) : (
                    <button onClick={handleRedirect}>Login</button>
                  )}
                </div>
              </div>
            </li>
          </ul>
        </div>
      </header>
    </div>
  );
}
