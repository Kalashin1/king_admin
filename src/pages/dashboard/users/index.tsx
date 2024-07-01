import { useEffect, useState } from "react";
import Layout from "../components/layout";
import UserTable from "./components/users-table";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../firebase-setting";
import { User } from "../../../types";

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    const q = query(collection(db, "users"), where("isAdmin", "==", false));
    const docRefs = await getDocs(q);
    const _users = docRefs.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() } as User)
    );
    setUsers(_users);
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <Layout>
      <div className="px-12 py-8">
        <h3 className="text-2xl font-bold">Users</h3>
      </div>
      <section className="px-12 py-6 h-screen">
        <div className="bg-white">
          {users && <UserTable users={users} updateUsers={fetchUsers} />}
        </div>
      </section>
    </Layout>
  );
};

export default Users;
