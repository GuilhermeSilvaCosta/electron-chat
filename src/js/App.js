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
import Navbar from './components/Navbar';
import Settings from './views/Settings';
import Welcome from './views/Welcome';
import Chat from './views/Chat';
import LoadingView from './components/shared/LoadingView';

import { listenToAuthChanges } from './actions/auth';


function AuthRoute({children}) {
  const user = useSelector(({auth}) => auth.user)
  
  return user ? children : <Navigate to={"/"} />;
}

const ContentWrapper = ({children}) => <div className='content-wrapper'>{children}</div>

function ChatApp() {

  const dispatch = useDispatch();
  const isChecking = useSelector(({auth}) => auth.isChecking)

  useEffect(() => {
    dispatch(listenToAuthChanges());
  }, [dispatch]);

  if (isChecking) {
    return <LoadingView />
  }

  return (
    <Router>
      <Navbar />
      <ContentWrapper>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/home" element={
            <AuthRoute>
              <Home />
            </AuthRoute>
          }/>
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