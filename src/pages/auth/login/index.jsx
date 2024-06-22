import Layout from "../layout";
import LoginForm from "./components/login-form";

const Login = () => {
  return (
    <Layout>
      <div className="auth-form-light text-left py-5 px-4 px-sm-5">
        <div className="brand-logo">
          <img src="../../images/logo.svg" alt="logo" />
        </div>
        <h4>Hello! lets get started</h4>
        <h6 className="font-weight-light">Sign in to continue.</h6>
        <LoginForm />
      </div>
    </Layout>
  );
};

export default Login;