import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { AccountBox } from "../components/AccountBox";
import { useGlobalContext } from "../contexts/GlobalContext";

export default function Account() {
  const router = useRouter();
  const { user } = useGlobalContext();

  useEffect(() => {
    if (user) router.push("/");
  }, [user, router]);

  return (
    <>
      <Head>
        <title>Besahre | Account</title>
      </Head>
      <div className="container centerContainer">
        <AccountBox />
      </div>
    </>
  );
}
