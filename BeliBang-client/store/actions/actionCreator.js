// import axios from 'axios';
import { FETCH_CUSTOMER_ORDERS, FETCH_DETAIL_FOOD, FETCH_DETAIL_ORDER, FETCH_DETAIL_STORE, FETCH_FOODS, FETCH_OPEN_STORES, FETCH_SELLER_ORDERS, FETCH_SELLER_STORE, FETCH_STORES, FETCH_USER, FETCH_USERS } from './actionType';

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
export const fetchDetailFoodAction = (payload) => {
  return {
    type: FETCH_DETAIL_FOOD,
    payload,
  };
};
export const fetchSellerOrderAction = (payload) => {
  return {
    type: FETCH_SELLER_ORDERS,
    payload,
  };
};
export const fetchCustomerOrderAction = (payload) => {
  return {
    type: FETCH_CUSTOMER_ORDERS,
    payload,
  };
};
export const fetchDetailOrderAction = (payload) => {
  return {
    type: FETCH_DETAIL_ORDER,
    payload,
  };
};

let baseUrl = 'https://7597-182-253-245-165.ngrok-free.app';

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
      if (!response.ok) throw new Error('Something Wrong!');
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
      if (!response.ok) throw new Error('Something Wrong!');
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
      const action = fetchUserAction(data);
      dispatch(action);
      return data;
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
      return data;
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
      console.log(formData, '<<<<<');
      const response = await fetch(`${baseUrl}/stores`, {
        method: 'POST',
        headers: {
          access_token: access_token,
          'Content-Type': 'multipart/form-data',
        },
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

export const updateStatusStore = (formData, id, access_token) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${baseUrl}/stores/${id}`, {
        method: 'PUT',
        headers: {
          access_token: access_token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error('Something Wrong!');
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};

export const createFood = (formData, access_token) => {
  return async (dispatch) => {
    try {
      console.log(formData, '<<<<<<');
      const response = await fetch(`${baseUrl}/foods`, {
        method: 'POST',
        headers: {
          access_token,
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });
      if (!response.ok) throw new Error('Something Wrong!');
      const data = await response.json();
      dispatch(fetchSellerStore({ access_token }));
      return data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};

export const deleteFood = (foodId, access_token) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${baseUrl}/foods/${foodId}`, {
        method: 'DELETE',
        headers: {
          access_token,
        },
      });
      if (!response.ok) throw new Error('Something Wrong!');
      dispatch(fetchSellerStore({ access_token }));
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};

export const createOrder = (access_token, StoreId) => {
  return async (dispatch) => {
    try {
      const dataTransaction = {
        StoreId,
        status: 'Waiting',
      };

      const response = await fetch(`${baseUrl}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          access_token,
        },
        body: JSON.stringify(dataTransaction),
      });
      if (!response.ok) throw new Error('Something Wrong!');
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};

export const fetchSellerOrder = (access_token) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${baseUrl}/orders/seller`, {
        method: 'GET',
        headers: {
          access_token,
        },
      });
      if (!response.ok) throw new Error('Something Wrong!');
      const data = await response.json();
      const action = fetchSellerOrderAction(data);
      dispatch(action);
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};

export const fetchDetailOrder = (orderId, access_token) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${baseUrl}/orders/${orderId}`, {
        method: 'GET',
        headers: {
          access_token,
        },
      });
      if (!response.ok) throw new Error('Something Wrong!');
      const data = await response.json();
      const action = fetchDetailOrderAction(data);
      dispatch(action);
      return data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};

export const updateStatusOrder = (orderId, status, access_token) => {
  return async (dispatch) => {
    try {
      console.log({ orderId, status, access_token });
      const response = await fetch(`${baseUrl}/orders/${orderId}`, {
        method: 'PUT',
        headers: {
          access_token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(status),
      });
      if (!response.ok) throw new Error('Something Wrong!');
      dispatch(fetchSellerOrder(access_token));
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};

export const updateProfile = (field, value, access_token, userId) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${baseUrl}/users/${field}`, {
        method: 'PATCH',
        headers: {
          access_token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ [field]: value }),
      });
      if (!response.ok) throw new Error('Something Wrong!');
      dispatch(fetchUser(userId, access_token));
    } catch (error) {
      console.log(error);
      throw error;
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

export const fetchDetailFood = (foodId, access_token) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${baseUrl}/foods/${foodId}`, {
        headers: {
          access_token,
        },
      });
      if (!response.ok) throw new Error('Something Wrong!');
      const data = await response.json();
      const action = fetchDetailFoodAction(data);
      dispatch(action);
      return data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};

export const updateFood = (formData, foodId, access_token) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${baseUrl}/foods/${foodId}`, {
        method: 'PUT',
        headers: {
          access_token,
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      if (!response.ok) throw new Error('Something Wrong!');
      const data = await response.json();
      dispatch(fetchSellerStore({ access_token }));
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};
