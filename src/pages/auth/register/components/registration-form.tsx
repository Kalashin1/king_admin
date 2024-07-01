import { useNavigate, Link } from "react-router-dom";
import { FormEvent, useContext, useRef } from "react";
import { SCREENS } from "../../../../navigation/constant";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../../../../firebase-setting";
import { doc, setDoc } from "firebase/firestore";
import { LoaderContext } from "../../../../App";

const RegistrationForm = () => {
  const navigate = useNavigate();

  const { isLoading, setIsLoading } = useContext(LoaderContext);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading!(true);
    const {
      full_name: { value: name },
      email: { value: email },
      password: { value: password },
    } = formRef.current!;
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email.toLowerCase().trim(),
        password
      );
      await updateProfile(user, {
        displayName: name,
      });
      localStorage.setItem("user_id", user.uid);
      await setDoc(doc(db, "users", user.uid), {
        name,
        isAdmin: email.toLowerCase().includes("@admin") ? true : false,
        email,
        createdAt: new Date().getTime().toString(),
      });
      setIsLoading!(false);
      navigate(SCREENS.DASHBOARD);
    } catch (error) {
      setIsLoading!(false);
      alert("error creating account");
      //TODO: handle error later
      console.log(error);
    }
  };

  const formRef = useRef<HTMLFormElement | null>(null);
  return (
    <form
      className="bg-white rounded-md shadow-2xl p-5"
      onSubmit={handleSubmit}
      ref={formRef}
    >
      <h1 className="text-gray-800 font-bold text-2xl mb-1">Hello Again!</h1>
      <p className="text-sm font-normal text-gray-600 mb-8">Welcome Back</p>
      <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
        <svg
          width={16}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
        >
          <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
        </svg>
        <input
          id="name"
          className=" pl-2 w-full outline-none border-none"
          type="text"
          name="full_name"
          placeholder="Your Name"
        />
      </div>
      <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
          />
        </svg>
        <input
          id="email"
          className=" pl-2 w-full outline-none border-none"
          type="email"
          name="email"
          placeholder="Email Address"
        />
      </div>
      <div className="flex items-center border-2 mb-12 py-2 px-3 rounded-2xl ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-400"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
            clipRule="evenodd"
          />
        </svg>
        <input
          className="pl-2 w-full outline-none border-none"
          type="password"
          name="password"
          id="password"
          placeholder="Password"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="block w-full bg-indigo-600 mt-5 py-2 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2"
      >
        {isLoading ? "...Loading" : "Create Account"}
      </button>
      <div className="mt-4">
        <Link
          to={SCREENS.LOGIN}
          className="text-sm ml-2 hover:text-blue-500 cursor-pointer hover:-translate-y-1 duration-500 transition-all"
        >
          Already have an account?
        </Link>
      </div>
    </form>
  );
};

export default RegistrationForm;
