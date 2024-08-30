import { useEffect, useState } from "react";
import AuthContext from "../components/auth-provider";
import CourseTable from "./components/course-table";
import { Course } from "../../../types";
import { fetchCourses } from "./helper";
import { NotificationComponent, notify } from "../../../components/ui/toast";

const Courses = () => {
  const [courses, setCourses] = useState<Course[]>([]);

  const loadCourses = async () => {
    const [error, _courses] = await fetchCourses(
      localStorage.getItem("user_id")!
    );
    if (error) {
      notify(<NotificationComponent message="error fetching courses" />, {
        className: "bg-red-500 font-bold",
      });
      console.log(error);
    }

    if (_courses) {
      console.log(_courses);
      setCourses(_courses);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  return (
    <AuthContext>
      <section className="px-6 py-2">
        <div className="px-12 mt-8">
          <h3 className="text-2xl font-bold">
            View your {/* // TODO: Change text based on user  */} Courses
          </h3>
        </div>
        <section className="px-12 py-6 h-screen">
          <div className="bg-white">
            <CourseTable courses={courses} loadCourses={loadCourses} />
          </div>
        </section>
      </section>
    </AuthContext>
  );
};

export default Courses;
