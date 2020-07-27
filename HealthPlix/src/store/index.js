import { createStore, applyMiddleware } from 'redux'
import otpReducer from './reducer';
import thunk from 'redux-thunk';

const store = createStore(otpReducer, applyMiddleware(thunk));

export default store;