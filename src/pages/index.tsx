import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { AsideData } from "../components/AsideData";
import { PostShareModal } from "../components/PostShareModal";
import { Share } from "../components/Share";
import { db } from "../firebase/client";
import styles from "../styles/home.module.scss";

interface Share {
  id: string;
  image: string;
  sub: string;
  createdAt: string;
  sharer: {
    id: string;
    username: string;
    avatar: string;
  };
}

export default function Home() {
  const [shares, setShares] = useState<Share[]>(null);

  useEffect(() => {
    const shareCollectionRef = collection(db, "shares");
    const q = query(shareCollectionRef, orderBy("createdAt", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const results = [];
      snapshot.docs.forEach((doc) => {
        results.push({ id: doc.id, ...doc.data() });
      });
      setShares(results);
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <Head>
        <title>Besahre | Home</title>
      </Head>
      <div className={`container ${styles.home}`}>
        <PostShareModal />
        <div>
          {shares?.map((share) => (
            <Share key={share.id} share={share} />
          ))}
        </div>
        <AsideData />
      </div>
    </>
  );
}
