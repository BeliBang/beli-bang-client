import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import thunk from 'redux-thunk';
import { FETCH_CUSTOMER_ORDERS, FETCH_DETAIL_FOOD, FETCH_DETAIL_ORDER, FETCH_DETAIL_STORE, FETCH_FOODS, FETCH_OPEN_STORES, FETCH_SELLER_ORDERS, FETCH_SELLER_STORE, FETCH_STORES, FETCH_USER, FETCH_USERS } from './actions/actionType';

const defaultState = {
  users: [],
  user: {},
  stores: [],
  sellerStore: {},
  detailStore: {},
  foods: [],
  detailFood: {},
  openStore: [],
  sellerOrder: [],
  customerOrder: [],
  detailOrder: {},
};

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
    case FETCH_DETAIL_FOOD:
      return { ...state, detailFood: action.payload };
    case FETCH_SELLER_ORDERS:
      return { ...state, sellerOrder: action.payload };
    case FETCH_CUSTOMER_ORDERS:
      return { ...state, customerOrder: action.payload };
    case FETCH_DETAIL_ORDER:
      return { ...state, detailOrder: action.payload };
    default:
      return state;
  }
}

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
