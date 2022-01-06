import styles from "./styles.module.scss";
import { LoginForm } from "./LoginForm";
import { SignUpForm } from "./SignUpForm";
import { motion } from "framer-motion";
import { useState } from "react";

const backdropVariant = {
  expanded: {
    width: "220%",
    height: "200%",
    borderRadius: "10%",
    transform: "rotate(60deg)",
  },
  collapsed: {
    width: "110%",
    height: "110%",
    borderRadius: "50%",
    transform: "rotate(60deg)",
  },
};

const expandingTransition = {
  type: "spring",
  duration: 2.3,
  stiffness: 30,
};

export function AccountBox() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeForm, setActiveForm] = useState("login");

  function playExpandingAnimation() {
    setIsExpanded(true);
    setTimeout(() => {
      setIsExpanded(false);
    }, expandingTransition.duration * 1000 - 1500);
  }
  function switchForm() {
    playExpandingAnimation();
    setTimeout(() => {
      if (activeForm === "login") {
        setActiveForm("signup");
      } else {
        setActiveForm("login");
      }
    }, 400);
  }

  return (
    <div className={styles.container}>
      <div className={styles.topContainer}>
        <motion.div
          variants={backdropVariant}
          className={styles.backdrop}
          animate={isExpanded ? "expanded" : "collapsed"}
          initial={false}
          transition={expandingTransition}
        ></motion.div>
        <div className={styles.headerContainer}>
          {activeForm === "login" ? (
            <>
              <h1>Welcome back</h1>
              <span>
                sign in to continue, <br />
                don’t have an account?{" "}
                <strong onClick={switchForm}>Singup</strong>
              </span>
            </>
          ) : (
            <>
              <h1>Create account</h1>
              <span>
                sign up and start sharing, <br />
                already have an account?{" "}
                <strong onClick={switchForm}>Login</strong>
              </span>
            </>
          )}
        </div>
      </div>
      <div className={styles.innerContainer}>
        {activeForm === "login" ? <LoginForm /> : <SignUpForm />}
      </div>
    </div>
  );
}
