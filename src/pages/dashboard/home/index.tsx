import { useEffect, useState } from "react";
import AuthContext from "../components/auth-provider";
import { Course, Plan } from "../../../types";
import { fetchCourses } from "../courses/helper";
import { notify, NotificationComponent } from "../../../components/ui/toast";
import CourseTable from "../courses/components/course-table";
import Plans from "../plans/components/plans-table";
import { fetchPlans } from "../plans/helper";

const Home = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [plans, setPlans] = useState<Plan[]>([]);

  const loadPlans = async () => {
    const [error, _plans] = await fetchPlans();
    if (error) {
      notify(<NotificationComponent message="error fetching plans" />, {
        className: "bg-red-500 font-bold",
      });
      console.log(error);
    }

    if (_plans) {
      console.log(_plans);
      setPlans(_plans);
    }
  };

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
    loadPlans();
  }, []);

  useEffect(() => {
    loadCourses();
  }, []);
  return (
    <AuthContext>
      <section className="px-8 py-2 min-h-screen">
        {courses && (
          <>
            <div className="mt-8 mb-4">
              <h3 className="text-2xl">
                View your {/* // TODO: Change text based on user  */} Courses
              </h3>
            </div>
            <div className="bg-white">
              <CourseTable loadCourses={loadCourses} courses={courses} />
            </div>
          </>
        )}
        {plans && plans.length && (
          <>
            <div className="mt-8 mb-4">
              <h3 className="text-2xl">View your Plans</h3>
            </div>
            <div className="bg-white">
              <Plans setPlans={loadPlans} plans={plans} />
            </div>
          </>
        )}
      </section>
    </AuthContext>
  );
};

export default Home;
