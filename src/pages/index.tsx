import Head from "next/head";
import { AsideData } from "../components/AsideData";
import { Share } from "../components/Share";
import styles from "../styles/home.module.scss";

export default function Home() {
  return (
    <>
      <Head>
        <title>Besahre | Home</title>
      </Head>
      <div className={`container ${styles.home}`}>
        <div>
          <Share />
          <Share />
        </div>
        <AsideData />
      </div>
    </>
  );
}
