import Layout from "../layout";
import RegisterForm from "./components/register-form";

const Register = () => {
  return (
    <Layout>
      <div className="auth-form-light text-left py-5 px-4 px-sm-5">
        <div className="brand-logo">
          <img src="../../images/logo.svg" alt="logo" />
        </div>
        <h4>New here?</h4>
        <h6 className="font-weight-light">Signing up is easy. It only takes a few steps</h6>
        <RegisterForm />
      </div>
    </Layout>
  );
};

export default Register;