import { FETCH_FOODS, FETCH_STORE, FETCH_USER, FETCH_USERS } from './actionType';

export const fetchUsersAction = (payload) => {
  return {
    type: FETCH_USERS,
    payload,
  };
};

export const fetchUserAction = (payload) => {
  return {
    type: FETCH_USER,
    payload,
  };
};

export const fetchStoreAction = (payload) => {
  return {
    type: FETCH_STORE,
    payload,
  };
};

export const fetchFoodsAction = (payload) => {
  return {
    type: FETCH_FOODS,
    payload,
  };
};

let baseUrl = 'https://2e8d-103-156-164-57.ngrok-free.app';

export const fetchUsers = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${baseUrl}/users`);
      if (!response.ok) throw new Error('Something Wrong!');
      const data = await response.json();
      const action = fetchUsersAction(data);
      dispatch(action);
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};

export const fetchUser = (id) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${baseUrl}/users/${id}`);
      if (!response.ok) throw new Error('Something Wrong!');
      const data = await response.json();
      const action = fetchUserAction(data);
      dispatch(action);
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};

export const fetchStore = (id) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${baseUrl}/stores/${id}`);
      if (!response.ok) throw new Error('Something Wrong!');
      const data = await response.json();
      const action = fetchStoreAction(data);
      dispatch(action);
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};

export const fetchFoods = (id) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${baseUrl}/foods?StoreId=${id}`);
      if (!response.ok) throw new Error('Something Wrong!');
      const data = await response.json();
      const action = fetchFoodsAction(data);
      dispatch(action);
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};
