import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import thunk from 'redux-thunk';
import { FETCH_FOODS, FETCH_STORE, FETCH_USER, FETCH_USERS } from './actions/actionType';

const defaultState = { users: [], user: {}, store: {}, foods: [] };

function rootReducer(state = defaultState, action) {
  switch (action.type) {
    case FETCH_USERS:
      return { ...state, users: action.payload };
    case FETCH_USER:
      return { ...state, user: action.payload };
    case FETCH_STORE:
      return { ...state, store: action.payload };
    case FETCH_FOODS:
      return { ...state, foods: action.payload };
    default:
      return state;
  }
}

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
