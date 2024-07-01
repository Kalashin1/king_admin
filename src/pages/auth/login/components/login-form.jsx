import { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { SCREENS } from '../../../../navigation/constants';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../../firebase-settings';

const LoginForm = () => {

  const formRef = useRef(null);
  const navigate = useNavigate();
  const login = async (e) => {
    e.preventDefault();
    const { email: { value: email }, password: { value: password } } = formRef.current
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate(SCREENS.DASHBOARD)
    } catch (error) {
      alert("error loging in");
      console.error('error', error)
    }
  }
  return (
    <form className="pt-3" onSubmit={login} ref={formRef}>
      <div className="form-group">
        <input type="email" name="email" className="form-control form-control-lg" id="exampleInputEmail1" placeholder="Username" />
      </div>
      <div className="form-group">
        <input type="password" className="form-control form-control-lg" id="exampleInputPassword1" name='password' placeholder="Password" />
      </div>
      <div className="mt-3">
        <button className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" to={SCREENS.REGISTER}>SIGN IN</button>
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
      {/* <div className="mb-2">
        <button type="button" className="btn btn-block btn-facebook auth-form-btn">
          <i className="ti-facebook mr-2"></i>Connect using facebook
        </button>
      </div> */}
      <div className="text-center mt-4 font-weight-light">
        Dont have an account? <Link to={SCREENS.REGISTER} className="text-primary">Create</Link>
      </div>
    </form>
  )
}

export default LoginForm;