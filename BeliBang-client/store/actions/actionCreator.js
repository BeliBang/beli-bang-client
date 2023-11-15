import { FETCH_USER, FETCH_USERS } from './actionType';

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
