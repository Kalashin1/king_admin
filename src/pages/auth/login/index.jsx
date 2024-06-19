import Layout from "../layout";

const Login = () => {
  return (
    <Layout>
      <div className="auth-form-light text-left py-5 px-4 px-sm-5">
        <div className="brand-logo">
          <img src="../../images/logo.svg" alt="logo" />
        </div>
        <h4>Hello! lets get started</h4>
        <h6 className="font-weight-light">Sign in to continue.</h6>
        <form className="pt-3">
          <div className="form-group">
            <input type="email" className="form-control form-control-lg" id="exampleInputEmail1" placeholder="Username" />
          </div>
          <div className="form-group">
            <input type="password" className="form-control form-control-lg" id="exampleInputPassword1" placeholder="Password" />
          </div>
          <div className="mt-3">
            <a className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" href="../../index.html">SIGN IN</a>
          </div>
          <div className="my-2 d-flex justify-content-between align-items-center">
            <div className="form-check">
              <label className="form-check-label text-muted">
                <input type="checkbox" className="form-check-input" />
                Keep me signed in
              </label>
            </div>
            <a href="#" className="auth-link text-black">Forgot password?</a>
          </div>
          <div className="mb-2">
            <button type="button" className="btn btn-block btn-facebook auth-form-btn">
              <i className="ti-facebook mr-2"></i>Connect using facebook
            </button>
          </div>
          <div className="text-center mt-4 font-weight-light">
            Dont have an account? <a href="register.html" className="text-primary">Create</a>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Login;