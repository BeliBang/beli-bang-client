import { FETCH_FOODS, FETCH_STORE, FETCH_STORES, FETCH_USER, FETCH_USERS } from './actionType';

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

export const fetchStoresAction = (payload) => {
  return {
    type: FETCH_STORES,
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

let baseUrl = 'https://3bbd-103-156-164-57.ngrok-free.app';

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

export const fetchAllStore = () => {
  return async (dispatch) => {
    try {
      // hit endpoint get all store(include usernya), difilter dimana status store true, dan jaraknya maks 300 meter
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

export const login = (inputForm) => {
  return async (dispatch) => {
    try {
      console.log(inputForm, '<<<<< ini input form');
      // hit login endpoint, jika berhasil akan mengembalikan role dan access_token, sementara keduanya di hardcode
      const hasilHitEndPointLogin = {
        role: 'Customer',
        access_token: '>>> ini access token user <<<',
      };
      return hasilHitEndPointLogin;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};

export const register = (inputForm) => {
  return async (dispatch) => {
    try {
      console.log(inputForm, '<<<<< ini input form');
      // hit register endpoint, jika berhasil akan mengembalikan role dan access_token, sementara keduanya di hardcode
      const hasilHitEndPointRegister = {
        role: inputForm.role,
        access_token: '>>> ini access token user <<<',
      };
      return hasilHitEndPointRegister;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};

export const registerStore = (inputForm) => {
  return async (dispatch) => {
    try {
      console.log(inputForm, '<<<<< ini input form');
      // hit register/create store endpoint
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};
