import { useRef } from 'react';
import { auth } from '../../../../firebase-settings';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { db } from '../../../../firebase-settings';
import { setDoc, doc } from 'firebase/firestore';
import { useNavigate, Link } from 'react-router-dom';
import { SCREENS } from '../../../../navigation/constants';

const RegisterForm = () => {

  const formRef = useRef(null);
  const navigate = useNavigate()

  const register = async (e) => {
    e.preventDefault()
    const { name: { value: name }, email: { value: email }, password: { value: password } } = formRef.current;
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "users", user.uid), {
        name
      })
      navigate(`${SCREENS.DASHBOARD}`)
    } catch (error) {
      alert("error creating account")
      console.log(error);
    }
  }


  return (
    <form className="pt-3" ref={formRef} onSubmit={register}>
      <div className="form-group">
        <input type="text" className="form-control form-control-lg" name="name" id="exampleInputUsername1" placeholder="name" />
      </div>
      <div className="form-group">
        <input type="email" name="email" className="form-control form-control-lg" id="exampleInputEmail1" placeholder="Email" />
      </div>

      <div className="form-group">
        <input type="password" className="form-control form-control-lg" id="exampleInputPassword1" placeholder="Password" name="password" />
      </div>
      <div className="mb-4">
        <div className="form-check">
          <label className="form-check-label text-muted">
            <input type="checkbox" className="form-check-input" />
            I agree to all Terms & Conditions
          </label>
        </div>
      </div>
      <div className="mt-3">
        <button className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" type='submit'>SIGN UP</button>
      </div>
      <div className="text-center mt-4 font-weight-light">
        Already have an account? <Link to={SCREENS.LOGIN} className="text-primary">Login</Link>
      </div>
    </form>
  )
}

export default RegisterForm;