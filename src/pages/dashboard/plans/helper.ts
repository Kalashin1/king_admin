import { query, collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase-setting";
import { Course, Plan, PlanPayload } from "../../../types";

export const createPlanPayload = ({
  title,
  description,
  price,
  thumbnail,
  id,
}: Course): PlanPayload => ({
  id,
  title,
  description,
  price,
  thumbnail,
});

export const fetchPlans = async (): Promise<[unknown, Plan[] | null]> => {
  try {
    const q = query(collection(db, "plans"));

    const planDocs = await getDocs(q);
    const plans = planDocs.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Plan[];
    console.log("plans", plans);
    return [null, plans];
  } catch (error) {
    return [error, null];
  }
};

export const getPlan = async (id: string): Promise<[unknown, Plan | null]> => {
  try {
    const docRef = await getDoc(doc(db, "plans", id));
    if (docRef.exists()) {
      return [null, { id: docRef.id, ...docRef.data() } as Plan];
    } else return [{ message: "document does not exist" }, null];
  } catch (error) {
    return [error, null];
  }
};
