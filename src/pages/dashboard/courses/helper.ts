import {
  Query,
  DocumentData,
  query,
  collection,
  where,
  orderBy,
  getDocs,
  getDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../../firebase-setting";
import { Course, COURSE_STATUS, CoursePayload, User } from "../../../types";
import { CreateUserPayload } from "../../auth/helper";

export const createCoursePayload = ({
  title,
  description,
  price,
  thumbnail,
  id,
}: Course): CoursePayload => ({
  id,
  title,
  description,
  price,
  thumbnail,
});

export const fetchCourses = async (
  id: string,
  status?: (typeof COURSE_STATUS)[number]
): Promise<[unknown, Course[] | null]> => {
  const userDocRef = await getDoc(doc(db, "users", id));
  const user = { id: userDocRef.id, ...userDocRef.data() } as User;
  try {
    let q: Query<DocumentData, DocumentData>;
    switch (user?.accountType) {
      case "professional":
        q = query(
          collection(db, "courses"),
          where("students", "in", CreateUserPayload(user)),
          where("status", "==", status ?? COURSE_STATUS[0]),
          orderBy("createdAt", "desc")
        );
        break;
      case "student":
        q = query(
          collection(db, "courses"),
          where("students", "in", CreateUserPayload(user)),
          where("status", "==", status ?? COURSE_STATUS[0]),
          orderBy("createdAt", "desc")
        );
        break;
      case "admin":
        console.log("admin");
        q = query(
          collection(db, "courses")
          // where("status", "==", status ?? COURSE_STATUS[0]),
          // orderBy("createdAt", "desc")
        );
        break;
    }

    const courseDocs = await getDocs(q);
    const courses = courseDocs.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Course[];
    console.log("courses", courses);
    return [null, courses];
  } catch (error) {
    return [error, null];
  }
};

export const getCourse = async (
  id: string
): Promise<[unknown, Course | null]> => {
  try {
    const docRef = await getDoc(doc(db, "courses", id));
    if (docRef.exists()) {
      return [null, { id: docRef.id, ...docRef.data() } as Course];
    } else return [{ message: "document does not exist" }, null];
  } catch (error) {
    return [error, null];
  }
};
