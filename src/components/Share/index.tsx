import styles from "./styles.module.scss";
import StarIcon from "../../assets/icons/star.svg";
import CommentIcon from "../../assets/icons/comment.svg";
import ShareIcon from "../../assets/icons/share.svg";

export function Share() {
  return (
    <div className={styles.container}>
      <header>
        <div className={styles.profile}></div>
        <span>Username</span>
      </header>
      <aside>
        <StarIcon />
        <CommentIcon />
        <ShareIcon />
      </aside>
      <div
        className={styles.image}
        style={{
          backgroundImage: `url(
            'https://images.unsplash.com/photo-1641290440848-c8b41e4b0727?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1587&q=80'
          )`,
        }}
      ></div>
    </div>
  );
}
