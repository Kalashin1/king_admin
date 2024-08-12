import { useParams } from "react-router-dom";
import AuthContext from "../../components/auth-provider";
import { useEffect, useState } from "react";
import { Course } from "../../../../types";
import { getCourse } from "../helper";
import { NotificationComponent, notify } from "../../../../components/ui/toast";
import EditCourseForm from "../components/edit-course-form";

const EditCourse = () => {
  const { id } = useParams();

  const [course, setCourse] = useState<Course | null>(null);

  useEffect(() => {
    const setup = async () => {
      const [error, _course] = await getCourse(id!);

      if (error) {
        notify(
          <NotificationComponent
            message={`Error, ${(error as Error).message}`}
          />,
          { className: "bg-red-500" }
        );
        console.log(error);
      }

      if (_course) {
        setCourse(_course);
      }
    };

    setup();
  }, [id]);

  return (
    <AuthContext>
      <section className="px-6 py-2">
        <div className="px-12 mt-8">
          <h3 className="text-2xl font-bold">
            Edit {/* // TODO: Change text based on user  */} Course
          </h3>
        </div>
        <section className="px-12 py-6 h-screen">
          {course && (
            <div className="bg-white">
              <EditCourseForm course={course as Course} />
            </div>
          )}
        </section>
      </section>
    </AuthContext>
  );
};

export default EditCourse;
