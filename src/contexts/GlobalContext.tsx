import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { collection, doc, getDoc } from "firebase/firestore";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { auth, db } from "../firebase/client";

interface GlobalProviderProps {
  children: ReactNode;
}

interface DbUser extends User {
  username: string;
  name: string;
  avatar: string;
}

interface GlobalContent {
  user: DbUser;
  logout: () => Promise<void>;
}

const GlobalContext = createContext<GlobalContent>({} as GlobalContent);

export function GlobalProvider({ children }: GlobalProviderProps) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      const usersRef = collection(db, "users");
      const userRef = currentUser
        ? await getDoc(doc(usersRef, currentUser.uid))
        : null;
      const user = userRef?.data();
      setUser(user);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  async function logout() {
    await signOut(auth);
  }

  return (
    <GlobalContext.Provider value={{ user, logout }}>
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobalContext() {
  return useContext(GlobalContext);
}
