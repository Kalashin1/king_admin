import { Link } from "react-router-dom";
import RegistrationForm from "./components/registration-form";
import { SCREENS } from "../../../navigation/constant";

const Register = () => {
  return (
    <div className="h-screen flex">
      <div
        className="hidden lg:flex w-full lg:w-1/2 signup_img_section
          justify-around items-center"
      >
        <div
          className="bg-black opacity-20 
                  inset-0 
                  z-0"
        ></div>
        <div className="w-full mx-auto px-20 flex-col items-center space-y-6">
          <h1 className="text-white font-bold text-4xl font-sans">
            Create An Account
          </h1>
          <p className="text-white mt-1">Already have an account?</p>
          <div className="flex justify-center lg:justify-start mt-6">
            <Link
              to={SCREENS.LOGIN}
              className="hover:bg-indigo-700 hover:text-white hover:-translate-y-1 transition-all duration-500 bg-white text-indigo-800 mt-4 px-4 py-2 rounded-2xl font-bold mb-2"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
      <div className="flex w-full lg:w-1/2 justify-center items-center bg-white space-y-8">
        <div className="w-full px-8 md:px-32 lg:px-24">
          <RegistrationForm />
        </div>
      </div>
    </div>
  );
};

export default Register;
