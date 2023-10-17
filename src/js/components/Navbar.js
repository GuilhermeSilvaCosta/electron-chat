import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/auth';
import BackButton from './shared/BackButton';

function Navbar({ canGoBack, view }) {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(({auth}) => auth.user)

  function handleLogin() {
    navigate('/')
  }

  function handleLogout() {
    dispatch(logout());
  }

  return (
    <div className="chat-navbar">
      <nav className="chat-navbar-inner">
        <div className="chat-navbar-inner-left">
          {canGoBack && 
            <BackButton />
          }
          { view !== 'Settings' &&
            <Link to="/settings" className="btn btn-outline-success ml-2">Settings</Link>
          }
        </div>
        <div className="chat-navbar-inner-right">
          { !user && 
          <button
            onClick={handleLogin}
            className="btn btn-outline-success ml-2">
              Login
          </button>}
          { !!user && 
          <>
            <img className="avatar mr-2" src={user.avatar}></img>
            <span className="logged-in-user">Hi, {user.username}</span>
            <button
              onClick={handleLogout}
              className="btn btn-outline-danger ml-2">
                Logout
            </button>
          </>}
        </div>
      </nav>
    </div>
  )
}

export default Navbar;