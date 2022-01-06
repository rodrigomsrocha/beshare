import { Button } from "../Button";
import { Input } from "../Input";
import Google from "../../../assets/icons/google.svg";
import styles from "./styles.module.scss";
import { FormEvent, useState } from "react";

export function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  function handleChange(e: FormEvent) {
    const { name, value } = e.currentTarget as HTMLInputElement;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else {
      setUsername(value);
    }
  }

  return (
    <form className={styles.formContainer}>
      <Input
        type="email"
        name="email"
        value={email}
        onChange={handleChange}
        label="Email"
        id="email"
      />
      <Input
        name="username"
        value={username}
        onChange={handleChange}
        label="Username"
        id="username"
      />
      <Input
        type="password"
        name="password"
        value={password}
        onChange={handleChange}
        label="Password"
        id="password"
      />
      <div className={styles.buttons}>
        <Button type="submit" text="Signup" />
        <Button text="Signup with google">
          <Google />
        </Button>
      </div>
    </form>
  );
}
