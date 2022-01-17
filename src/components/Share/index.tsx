import styles from "./styles.module.scss";
import StarIcon from "../../assets/icons/star.svg";
import StarIconFilled from "../../assets/icons/starFilled.svg";
import CommentIcon from "../../assets/icons/comment.svg";
import ShareIcon from "../../assets/icons/share.svg";
import { Profile } from "../Utils/Profile";
import { useEffect, useState } from "react";
import { usePopper } from "react-popper";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase/client";
import { useGlobalContext } from "../../contexts/GlobalContext";
import toast, { Toaster } from "react-hot-toast";

interface Star {
  id: string;
  userId: string;
}

interface ShareProps {
  share: {
    id: string;
    image: string;
    sub: string;
    createdAt: string;
    sharer: {
      id: string;
      username: string;
      avatar: string;
    };
  };
}

export function Share({ share }: ShareProps) {
  const { user } = useGlobalContext();
  const [stars, setStars] = useState<Star[]>(null);
  const [visible, setVisible] = useState(false);
  const [userAlreadyStared, setUserAlreadyStared] = useState(false);

  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const { styles: popperStyles, attributes } = usePopper(
    referenceElement,
    popperElement,
    {
      modifiers: [
        {
          name: "offset",
          options: {
            offset: [70, -35],
          },
        },
      ],
    }
  );

  useEffect(() => {
    const shareCollectionRef = collection(db, "shares", share.id, "stars");
    const unsubscribe = onSnapshot(shareCollectionRef, (snapshot) => {
      const results = [];
      snapshot.docs.forEach((doc) => {
        results.push({ id: doc.id, ...doc.data() });
      });
      setStars(results);
    });

    if (stars?.some((star) => star.userId === user?.uid)) {
      setUserAlreadyStared(true);
    }

    return () => unsubscribe();
  }, [share.id, stars, user?.uid]);

  async function starShare() {
    if (user) {
      const starDocRef = collection(db, "shares", share.id, "stars");
      const q = query(starDocRef, where("userId", "==", user?.uid));
      const starDoc = await getDocs(q);

      if (userAlreadyStared) {
        await deleteDoc(starDoc.docs[0].ref);
        setUserAlreadyStared(false);
      } else {
        await addDoc(starDocRef, { userId: user?.uid });
        setUserAlreadyStared(true);
      }
    } else {
      toast.error("You must be logged in to star a share.", {
        duration: 3000,
      });
    }
  }

  return (
    <div className={styles.container}>
      <Toaster />
      <header>
        <Profile
          variant="light"
          pic={share?.sharer?.avatar}
          userID={share?.sharer?.id}
        />
        <span>{share?.sharer?.username}</span>
      </header>
      <aside>
        <button
          ref={setReferenceElement}
          type="button"
          onClick={starShare}
          onMouseEnter={() => {
            setVisible(true);
          }}
          onMouseLeave={() => {
            setVisible(false);
          }}
        >
          {userAlreadyStared ? <StarIconFilled /> : <StarIcon />}
        </button>
        <div
          ref={setPopperElement}
          style={popperStyles.popper}
          {...attributes.popper}
          className={`${styles.popper} ${visible ? styles.visible : ""}`}
        >
          {stars?.length} stars
        </div>
        <CommentIcon />
        <ShareIcon />
      </aside>
      <div className={styles.image}>
        <img src={share.image} alt="share" />
      </div>
    </div>
  );
}
