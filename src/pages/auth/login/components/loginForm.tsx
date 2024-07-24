import { FormEvent, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { SCREENS } from "../../../../navigation/constant";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../../firebase-setting";
import { doc, getDoc } from "firebase/firestore";
import Input from "../../../../components/ui/input";

const LoginForm = () => {
  const naivgate = useNavigate();

  const formRef = useRef<HTMLFormElement | null>(null);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    const {
      email: { value: email },
      password: { value: password },
    } = formRef.current!;
    try {
      const { user } = await signInWithEmailAndPassword(
        auth,
        email.toLowerCase().trim(),
        password
      );
      localStorage.setItem("user_id", user.uid);
      const docRef = await getDoc(doc(db, "users", user.uid));
      if (docRef.exists()) {
        naivgate(SCREENS.DASHBOARD);
      } else {
        alert("Your account has been deactivated please contact the admin");
        return;
      }
    } catch (error) {
      alert("error logging in");
      // handle error later
      console.log(error);
    }
  };

  return (
    <form
      className="bg-white rounded-md shadow-2xl p-5"
      onSubmit={handleLogin}
      ref={formRef}
    >
      <h1 className="text-gray-800 font-bold text-2xl mb-1">Hello Again!</h1>
      <p className="text-sm font-normal text-gray-600 mb-8">Welcome Back</p>
      <Input
        name="email"
        type="email"
        placeholder="Enter your email"
        hasIcon={true}
        icon="fas fa-envelope"
      />

      <Input
        name="passwrod"
        type="password"
        placeholder="Enter your password to continue"
        hasIcon={true}
        icon="fas fa-lock"
      />
      <div className="text-sm ml-2 hover:text-blue-500 cursor-pointer hover:-translate-y-1 duration-500 transition-all">
        Forgot Password ?
      </div>
      <button
        type="submit"
        className="block w-full bg-indigo-600 mt-5 py-2 rounded-md hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2"
      >
        Login
      </button>
      <div className="mt-4">
        <Link
          to={SCREENS.REGISTER}
          className="text-sm ml-2 hover:text-blue-500 cursor-pointer hover:-translate-y-1 duration-500 transition-all"
        >
          Don't have an account yet?
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
