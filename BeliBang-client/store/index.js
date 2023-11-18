import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import thunk from 'redux-thunk';
import { FETCH_DETAIL_STORE, FETCH_FOODS, FETCH_OPEN_STORES, FETCH_SELLER_STORE, FETCH_STORES, FETCH_USER, FETCH_USERS } from './actions/actionType';

const defaultState = { users: [], user: {}, stores: [], sellerStore: {}, detailStore: {}, foods: [], openStore: [] };

function rootReducer(state = defaultState, action) {
  switch (action.type) {
    case FETCH_USERS:
      return { ...state, users: action.payload };
    case FETCH_USER:
      return { ...state, user: action.payload };
    case FETCH_STORES:
      return { ...state, stores: action.payload };
    case FETCH_OPEN_STORES:
      return { ...state, openStore: action.payload };
    case FETCH_SELLER_STORE:
      return { ...state, sellerStore: action.payload };
    case FETCH_DETAIL_STORE:
      return { ...state, detailStore: action.payload };
    case FETCH_FOODS:
      return { ...state, foods: action.payload };
    default:
      return state;
  }
}

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
