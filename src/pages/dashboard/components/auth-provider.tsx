import { createContext, FC, ReactNode, useEffect, useState } from "react";
import Layout from "../components/layout";
import { useNavigate } from "react-router-dom";
import { SCREENS } from "../../../navigation/constant";
import { auth, db } from "../../../firebase-setting";
import { User } from "../../../types";
import { doc, getDoc } from "firebase/firestore";

export const UserAuthContext = createContext<
  Partial<{
    user: User | null;
  }>
>({});

const AuthContext: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const set_up = async () => {
      const _user = auth.currentUser;
      if (_user) {
        const docRef = await getDoc(doc(db, "users", _user.uid));
        if (docRef.exists()) {
          const existingUser = { id: docRef.id, ...docRef.data() } as User;
          setUser(existingUser);
        } else {
          navigate(SCREENS.LOGIN);
        }
      } else {
        const uid = localStorage.getItem("user_id");
        if (uid) {
          const docRef = await getDoc(doc(db, "users", uid));
          if (docRef.exists()) {
            const existingUser = { id: docRef.id, ...docRef.data() } as User;
            setUser(existingUser);
          } else {
            navigate(SCREENS.LOGIN);
          }
        } else navigate(SCREENS.LOGIN);
      }
    };

    set_up();
  }, [navigate]);

  return (
    <UserAuthContext.Provider value={{ user }}>
      <Layout initials={user?.name[0] ?? ""} profilePic={user?.thumbnail ?? ""}>
        {children}
      </Layout>
    </UserAuthContext.Provider>
  );
};

export default AuthContext;
