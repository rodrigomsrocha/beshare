import { ReactNode } from "react";
import styles from "./styles.module.scss";

interface ButtonProps {
  children?: ReactNode;
  text: string;
  type?: "submit" | "button";
  onClick?: () => void;
}

export function Button({
  onClick,
  children,
  text,
  type = "button",
}: ButtonProps) {
  return (
    <button type={type} className={styles.button} onClick={onClick}>
      {text}
      {children}
    </button>
  );
}
