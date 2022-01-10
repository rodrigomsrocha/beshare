import { Button } from "../Button";
import { Input } from "../Input";
import Google from "../../../assets/icons/google.svg";
import styles from "./styles.module.scss";
import { FormEvent, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase/client";
import { useRouter } from "next/router";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleChange(e: FormEvent) {
    const { name, value } = e.currentTarget as HTMLInputElement;
    if (name === "email") {
      setEmail(value);
    } else {
      setPassword(value);
    }
  }

  async function handleLoginWithEmailAndPassword(e: FormEvent) {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/");
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <form
      onSubmit={handleLoginWithEmailAndPassword}
      className={styles.formContainer}
    >
      <Toaster position="top-center" />
      <Input
        onChange={handleChange}
        value={email}
        label="Email"
        id="email"
        name="email"
        type="email"
      />
      <Input
        onChange={handleChange}
        value={password}
        label="Password"
        id="password"
        name="password"
        type="password"
      />
      <div className={styles.buttons}>
        <Button text="Login" type="submit" />
        <Button text="Login with google">
          <Google />
        </Button>
      </div>
    </form>
  );
}
