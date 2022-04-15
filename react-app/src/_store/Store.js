import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import AuthenticationReducer from '../_reducers/AuthenticationReducer';

const AppReducer = combineReducers({
  user: AuthenticationReducer
});

const configureStore = () => {
  return createStore(
    AppReducer,
    compose(applyMiddleware(thunk))
  );
};

export default configureStore;