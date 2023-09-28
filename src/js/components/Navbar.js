import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Navbar() {

  const navigate = useNavigate();
  const message = useSelector(state => state.message);

  function handleBack() {
    navigate(-1);
  }

  function handleLogin() {
    navigate('/')
  }

  return (
    <div className="chat-navbar">
      <nav className="chat-navbar-inner">
        <div className="chat-navbar-inner-left">
          <button onClick={handleBack} className="btn btn-outline-primary">Back</button>
          <Link to="/settings" className="btn btn-outline-success ml-2">Settings</Link>
          {message}
        </div>
        <div className="chat-navbar-inner-right">
          <span className="logged-in-user">Hi User</span>
          <button
            onClick={handleLogin}
            className="btn btn-outline-success ml-2">Login</button>
        </div>
      </nav>
    </div>
  )
}

export default Navbar;