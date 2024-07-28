import {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";
import router from "./navigation";
import { RouterProvider } from "react-router-dom";
import { User } from "./types";
import { auth, db } from "./firebase-setting";
import { doc, getDoc } from "firebase/firestore";

export const LoaderContext = createContext<
  Partial<{
    isLoading: boolean;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
  }>
>({});
export const UserContext = createContext<
  Partial<{
    user: User | null;
    getUser: () => Promise<User | null>;
  }>
>({});
function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const set_up = async () => {
    const _user = auth.currentUser;
    if (_user) {
      const docRef = await getDoc(doc(db, "users", _user.uid));
      if (docRef.exists()) {
        const data = { id: docRef.id, ...docRef.data() } as User;
        return data;
      } else {
        return null;
      }
    } else {
      const uid = localStorage.getItem("user_id");
      if (uid) {
        const docRef = await getDoc(doc(db, "users", uid));
        if (docRef.exists()) {
          const data = { id: docRef.id, ...docRef.data() } as User;
          return data;
        } else {
          return null;
        }
      } else return null;
    }
  };

  useEffect(() => {
    const getUser = async () => {
      setIsLoading(true);
      const data = await set_up();
      if (data) setUser(data);
      setIsLoading(false);
    };

    getUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        getUser: set_up,
      }}
    >
      <LoaderContext.Provider
        value={{
          isLoading,
          setIsLoading,
        }}
      >
        <RouterProvider router={router} />
      </LoaderContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
