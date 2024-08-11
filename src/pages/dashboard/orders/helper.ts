import { collection, doc, DocumentData, getDoc, getDocs, orderBy, query, Query, where } from "firebase/firestore";
import { Order, User } from "../../../types"
import { db } from "../../../firebase-setting";

export const CreateOrderPayload = ({id, amount}: Order) => ({
  id,
  amount
})

export const fetchOrders = async (
  id: string
): Promise<[unknown, Order[] | null]> => {
  const userDocRef = await getDoc(doc(db, "users", id));
  const user = { id: userDocRef.id, ...userDocRef.data() } as User;
  try {
    let q: Query<DocumentData, DocumentData>;
    switch (user?.accountType) {
      case "professional":
        q = query(
          collection(db, "orders"),
          where("user.id", "in", user.id),
          orderBy("createdAt", "desc")
        );
        break;
      case "student":
        q = query(
          collection(db, "orders"),
          where("user.id", "in", user.id),
          orderBy("createdAt", "desc")
        );
        break;
      case "admin":
        console.log("admin");
        q = query(
          collection(db, "orders"),
          orderBy("createdAt", "desc")
        );
        break;
    }

    const orderDocs = await getDocs(q);
    const orders = orderDocs.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Order[];
    console.log("orders", orders);
    return [null, orders];
  } catch (error) {
    return [error, null];
  }
};
