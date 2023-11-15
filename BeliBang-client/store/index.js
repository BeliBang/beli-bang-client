import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import thunk from 'redux-thunk';
import { FETCH_USER, FETCH_USERS } from './actions/actionType';

const defaultState = { users: [], user: {} };

function rootReducer(state = defaultState, action) {
  switch (action.type) {
    case FETCH_USERS:
      return { ...state, users: action.payload };
    case FETCH_USER:
      return { ...state, user: action.payload };
    default:
      return state;
  }
}

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
