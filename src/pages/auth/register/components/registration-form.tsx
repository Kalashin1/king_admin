import { useNavigate, Link } from "react-router-dom";
import { FormEvent, useContext, useRef, useState } from "react";
import { SCREENS } from "../../../../navigation/constant";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../../../../firebase-setting";
import { doc, setDoc } from "firebase/firestore";
import { LoaderContext } from "../../../../App";
import Select from "react-select";
import Input from "../../../../components/ui/input";
import { USER_TYPE } from "../../../../types";

const RegistrationForm = () => {
  const navigate = useNavigate();

  const { isLoading, setIsLoading } = useContext(LoaderContext);

  const [accountType, setAccountType] = useState<USER_TYPE>();

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
        accountType,
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
  const [passwordType, setPasswordType] = useState<"password" | "text">(
    "password"
  );

  return (
    <form
      className="bg-white rounded-md shadow-2xl p-5"
      onSubmit={handleSubmit}
      ref={formRef}
    >
      <h1 className="text-gray-800 font-bold text-2xl mb-1">Welcome!</h1>
      <p className="text-sm font-normal text-gray-600 mb-8">
        Creat your account
      </p>
      <Input
        name="full_name"
        placeholder="Enter your full name"
        hasIcon={true}
        icon="fas fa-user"
        required
        type="text"
      />
      <Input
        name="email"
        type="email"
        placeholder="Enter your email"
        icon="fas fa-envelope"
        hasIcon={true}
        required
      />
      <Input
        name="password"
        type={passwordType}
        iconHasHandler={true}
        placeholder="Enter your password"
        icon="fas fa-lock"
        iconClickHandler={() => {
          if (passwordType === "password") setPasswordType("text");
          else setPasswordType("password");
        }}
        hasIcon={true}
        required
      />
      <Select
        placeholder="Select Your Account Type"
        required
        options={[
          { label: "Student", value: "student" },
          { label: "Professional", value: "professional" },
          { label: "Admin", value: "admin" },
        ]}
        onChange={(v) => setAccountType(v?.value as USER_TYPE)}
      />
      <button
        type="submit"
        disabled={isLoading}
        className="block w-full bg-indigo-600 mt-5 py-2 rounded-md hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500 bg-md text-white font-semibold mb-2"
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
