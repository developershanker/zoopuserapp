import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
// import  rootReducer  from './reducers';
import  counterReducer  from './reducers/counterReducer'


const initialState = {};

const middleware = thunk;

const store = createStore(
  counterReducer,
  initialState,
  compose(
    applyMiddleware(thunk),
  )
);

export default store;