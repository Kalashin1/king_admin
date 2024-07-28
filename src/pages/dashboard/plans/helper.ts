import { query, collection, getDocs } from "firebase/firestore";
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
