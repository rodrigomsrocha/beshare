import styles from "./styles.module.scss";
import { useRouter } from "next/router";
import { useGlobalContext } from "../../../contexts/GlobalContext";

interface ProfileProps {
  variant: "light" | "dark";
  pic: string;
  userID: string;
}

export function Profile({ variant, pic, userID }: ProfileProps) {
  const router = useRouter();
  const { user } = useGlobalContext();

  function handleRedirect() {
    if (user && user.uid === userID) {
      router.push("/profile");
    } else {
      router.push(`/${userID}`);
    }
  }

  return (
    <div
      className={styles.profile}
      style={{
        backgroundImage: `url(${pic})`,
        backgroundColor:
          variant === "light" ? "var(--white)" : "var(--light-purple)",
      }}
      onClick={handleRedirect}
    ></div>
  );
}
