import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";

import { auth, db } from "../../../firebase/client";

import { Button } from "../Button";
import { Input } from "../Input";

import Google from "../../../assets/icons/google.svg";

import styles from "./styles.module.scss";
import toast, { Toaster } from "react-hot-toast";

export function SignUpForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");

  function handleChange(e: FormEvent) {
    const { name, value } = e.currentTarget as HTMLInputElement;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "username") {
      setUsername(value);
    } else {
      setName(value);
    }
  }

  async function registerWithEmailAndPassword(e: FormEvent) {
    e.preventDefault();
    const users = await getDocs(collection(db, "users"));
    const usernameAlreadyExists = users.docs.some(
      (user) => user.data().username === username
    );
    try {
      if (usernameAlreadyExists) {
        throw new Error("Username already exists");
      }
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userDoc = doc(db, "users", userCredentials.user.uid);
      await updateDoc(userDoc, { name, username });
      router.push("/");
    } catch (error) {
      switch (error.message) {
        case "Firebase: Error (auth/email-already-in-use).":
          toast.error("Email already in use.");
          break;
        case "Firebase: Error (auth/invalid-email).":
          toast.error("Invalid email.");
          break;
        case "Firebase: Password should be at least 6 characters (auth/weak-password).":
          toast.error("Password should be at least 6 characters.");
          break;
        default:
          toast.error(error.message);
          break;
      }
    }
  }

  return (
    <form
      className={styles.formContainer}
      onSubmit={registerWithEmailAndPassword}
    >
      <Toaster position="top-center" />
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
        name="name"
        value={name}
        onChange={handleChange}
        label="Name"
        id="name"
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
