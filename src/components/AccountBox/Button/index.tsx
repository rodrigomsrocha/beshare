import { MouseEvent, ReactNode } from "react";
import styles from "./styles.module.scss";

interface ButtonProps {
  children?: ReactNode;
  text: string;
  color?: string;
  type?: "submit" | "button";
  onClick?: (e: MouseEvent<HTMLElement>) => void;
}

export function Button({
  onClick,
  children,
  text,
  type = "button",
  color = "#a594f9",
}: ButtonProps) {
  return (
    <button type={type} className={styles.button} onClick={onClick}>
      {text}
      {children}
    </button>
  );
}
