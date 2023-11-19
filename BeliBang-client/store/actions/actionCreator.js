// import axios from 'axios';
import { FETCH_DETAIL_STORE, FETCH_FOODS, FETCH_OPEN_STORES, FETCH_SELLER_STORE, FETCH_STORES, FETCH_USER, FETCH_USERS } from './actionType';

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

export const fetchOpenStoresAction = (payload) => {
  return {
    type: FETCH_OPEN_STORES,
    payload,
  };
};

export const fetchSellerStoreAction = (payload) => {
  return {
    type: FETCH_SELLER_STORE,
    payload,
  };
};

export const fetchDetailStoreAction = (payload) => {
  return {
    type: FETCH_DETAIL_STORE,
    payload,
  };
};

export const fetchFoodsAction = (payload) => {
  return {
    type: FETCH_FOODS,
    payload,
  };
};

let baseUrl = 'https://dd18-182-253-245-168.ngrok-free.app';

export const login = (inputForm) => {
  return async (dispatch) => {
    try {
      console.log(inputForm, '<<<<< ini input form');
      const response = await fetch(`${baseUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputForm),
      });
      if (!response.ok) throw data.message;
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};

export const register = (inputForm) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${baseUrl}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputForm),
      });
      if (!response.ok) throw data.message;
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};

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

export const fetchUser = (userId, access_token) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${baseUrl}/users/${userId}`, {
        headers: {
          access_token,
        },
      });
      if (!response.ok) throw new Error('Something Wrong!');
      const data = await response.json();
      console.log(data, '<<< data');
      const action = fetchUserAction(data);
      dispatch(action);
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};

export const fetchSellerStore = ({ access_token }) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${baseUrl}/stores/seller`, {
        headers: {
          access_token,
        },
      });
      if (!response.ok) throw new Error('Something Wrong!');
      const data = await response.json();
      const action = fetchSellerStoreAction(data);
      dispatch(action);
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};

export const fetchDetailStore = (storeId, access_token) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${baseUrl}/stores/${storeId}`, {
        headers: {
          access_token,
        },
      });
      if (!response.ok) throw new Error('Something Wrong!');
      const data = await response.json();
      const action = fetchDetailStoreAction(data);
      dispatch(action);
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};

export const showStores = (access_token) => {
  return async (dispatch) => {
    console.log(access_token);
    try {
      const response = await fetch(`${baseUrl}/stores`, {
        method: 'GET',
        headers: {
          access_token: access_token,
        },
      });
      if (!response.ok) throw new Error('Something Wrong!');
      const data = await response.json();
      const action = fetchOpenStoresAction(data);
      dispatch(action);
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};

export const registerStore = (formData, access_token) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${baseUrl}/stores`, {
        method: 'POST',
        headers: {
          access_token: access_token,
        },
        'Content-Type': 'multipart/form-data',
        body: formData,
      });
      if (!response.ok) throw new Error('Something Wrong!');
      const data = await response.json();
      console.log(data, '<<<< data');
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};

export const createTransaction = (payload) => {
  return async (dispatch) => {
    try {
      // sementara UserId di hardcode dulu, nanti didapet dari server setelah mengembalikan akses token
      const dataTransaction = {
        StoreId: payload.StoreId,
        UserId: 1,
        status: 'Proccessing',
      };

      const response = await fetch(`${baseUrl}/transactions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataTransaction),
      });
      // if (!response.ok) throw new Error('Something Wrong!');
      // const data = await response.json();
      // return data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};

export const fetchTransaction = (payload) => {
  return async (dispatch) => {
    try {
      const id = 1;
      // console.log(payload, '<<< ini payload');
      // const response = await fetch(`${baseUrl}/users/${id}?_embed=transactions`);
      // const data = await response.json();
      // return data
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};

export const updateLocationUser = (userLocation, access_token) => {
  return async (dispatch) => {
    try {
      // hit endpoint update location user
      console.log('update location');
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};
