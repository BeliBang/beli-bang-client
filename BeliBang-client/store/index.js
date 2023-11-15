import { legacy_createStore as createStore } from 'redux';

const defaultState = { users: [] };

function rootReducer(state = defaultState, action) {
  switch (action.type) {
    case 'users/fetch':
      return { ...state, users: action.payload };
    default:
      return state;
  }
}

const store = createStore(rootReducer);

export default store;
