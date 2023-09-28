import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleare from 'redux-thunk';

import chatReducer from '../reducers/chats';
import authReducer from '../reducers/auth';

export default function configureStore() {

  const middlewares = [
    thunkMiddleare
  ];

  const store = createStore(
    combineReducers({ chats: chatReducer, auth: authReducer }),
    applyMiddleware(...middlewares)
  );

  return store;
}