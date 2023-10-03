import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';


function Welcome() {
  const navigate = useNavigate();
  const [isLoginView, setLoginView] = useState(true);
  const { user } = useSelector(({auth}) => auth);

  useEffect(() => {
    if (user) {
      navigate('/home');
    }
  }, [user])

  return (
    <div className="centered-view">
      <div className="centered-container">
        {isLoginView ? <LoginForm /> : <RegisterForm />}
        <small className="form-text text-muted mt-2">
          {isLoginView ? 'Need an account?' : 'Already registered?'}
          <span
            onClick={() => {setLoginView(!isLoginView)}}
            className="btn-link ml-2">
              {isLoginView ? 'Register' : 'Login'}
          </span>
        </small>
      </div>
    </div>
  );
}

export default Welcome;