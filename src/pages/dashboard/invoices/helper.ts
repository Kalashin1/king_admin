import {
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  orderBy,
  query,
  Query,
  where,
} from "firebase/firestore";
import { Invoice, InvoicePayload, User } from "../../../types";
import { db } from "../../../firebase-setting";

export const CreateInvoicePayload = ({
  id,
  order,
}: Invoice): InvoicePayload => ({
  id,
  order,
});

export const fetchOrders = async (
  id: string
): Promise<[unknown, Invoice[] | null]> => {
  const userDocRef = await getDoc(doc(db, "users", id));
  const user = { id: userDocRef.id, ...userDocRef.data() } as User;
  try {
    let q: Query<DocumentData, DocumentData>;
    switch (user?.accountType) {
      case "professional":
        q = query(
          collection(db, "invoices"),
          where("user.id", "in", user.id),
          orderBy("createdAt", "desc")
        );
        break;
      case "student":
        q = query(
          collection(db, "invoices"),
          where("user.id", "in", user.id),
          orderBy("createdAt", "desc")
        );
        break;
      case "admin":
        console.log("admin");
        q = query(collection(db, "invoices"), orderBy("createdAt", "desc"));
        break;
    }

    const invoicesDocs = await getDocs(q);
    const invoices = invoicesDocs.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Invoice[];
    console.log("invoices", invoices);
    return [null, invoices];
  } catch (error) {
    return [error, null];
  }
};
