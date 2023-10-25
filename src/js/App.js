import React, { useEffect } from 'react';
import { 
  HashRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import StoreProvider from './store/StoreProvider';
import Home from './views/Home';
import Settings from './views/Settings';
import ChatCreate from './views/ChatCreate';
import Welcome from './views/Welcome';
import Chat from './views/Chat';
import LoadingView from './components/shared/LoadingView';

import { listenToAuthChanges } from './actions/auth';
import { listenToConnectionChanges } from './actions/app';
import { checkUserConnection } from './actions/connection';
import { loadInitialSettings } from './actions/settings';


function AuthRoute({children}) {
  const user = useSelector(({auth}) => auth.user)
  
  return user ? children : <Navigate to={"/"} />;
}

const ContentWrapper = ({children}) => {
  const isDarkTheme  = useSelector(({settings}) => settings.isDarkTheme);
  return (
    <div className={`content-wrapper ${isDarkTheme ? 'dark' : 'light'}`}>{children}</div>
  )
}

function ChatApp() {

  const dispatch = useDispatch();
  const isChecking = useSelector(({auth}) => auth.isChecking);
  const isOnline = useSelector(({app}) => app.isOnline);
  const user = useSelector(({auth}) => auth.user);

  useEffect(() => {
    dispatch(loadInitialSettings());
    const unsubFromAuth = dispatch(listenToAuthChanges());
    const unsubFromConnection = dispatch(listenToConnectionChanges());

    return () => {
      unsubFromAuth();
      unsubFromConnection();
    }
  }, [dispatch]);

  useEffect(() => {
    let unsubFromUserConnection;
    if (user?.uid) {
      unsubFromUserConnection = dispatch(checkUserConnection(user.uid));
    }

    return () => {
      unsubFromUserConnection && unsubFromUserConnection();
    }
  }, [dispatch, user])

  if (!isOnline) {
    return <LoadingView message="Application has been disconnected from the internet. Please reconnect..." />
  }

  if (isChecking) {
    return <LoadingView />
  }

  return (
    <Router>
      <ContentWrapper>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/home" element={
            <AuthRoute>
              <Home />
            </AuthRoute>
          }/>
          <Route path='/chatCreate' element={
            <AuthRoute>
              <ChatCreate />
            </AuthRoute>
          } />
          <Route path='/settings' element={
            <AuthRoute>
              <Settings />
            </AuthRoute>
          } />
          <Route path='/chat/:id' element={
            <AuthRoute>
              <Chat />
            </AuthRoute>
          }/>
        </Routes>
      </ContentWrapper>
    </Router>
  )
  
}

function App() {
  return (
    <StoreProvider>
      <ChatApp />
    </StoreProvider>
  )
}

export default App;