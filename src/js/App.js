import React, { useEffect } from 'react';
import { 
  HashRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import { Provider } from 'react-redux';

import Home from './views/Home';
import Navbar from './components/Navbar';
import Settings from './views/Settings';
import Welcome from './views/Welcome';
import Chat from './views/Chat';

import configureStore from './store';
import { listenToAuthChanges } from './actions/auth';

const store = configureStore();

function App() {

  useEffect(() => {
    store.dispatch(listenToAuthChanges());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <div className='content-wrapper'>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/home" element={<Home />} />
            <Route path='/settings' element={<Settings />} />
            <Route path='/chat/:id' element={<Chat />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  )
  
  
}

export default App;