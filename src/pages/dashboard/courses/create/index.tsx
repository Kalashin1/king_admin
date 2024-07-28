import AuthContext from "../../components/auth-provider";
import CreateCourseForm from "../components/create-course-form";

const CreateCourse = () => {
  return (
    <AuthContext>
      <section className="px-6 py-2">
        <div className="px-12 mt-8">
          <h3 className="text-2xl font-bold">
            View uour {/* // TODO: Change text based on user  */ } Courses
          </h3>
        </div>
        <section className="px-12 py-6 h-screen">
          <div className="bg-white">
            <CreateCourseForm />
          </div>
        </section>
      </section>
    </AuthContext>
  );
};

export default CreateCourse;
