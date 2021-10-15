const GET_USERS = "users/GET_USERS";
const FOLLOW_USER = "users/FOLLOW_USERS";

// actions
const get = (users) => {
  return {
    type: GET_USERS,
    payload: users,
  };
};

// const follow = (user) => {
//   return {
//     type: FOLLOW_USER
//   }
// };

// thunks
export const getUsers = () => async (dispatch) => {
  const res = await fetch("/api/users");
  const users = await res.json();
  dispatch(get(users));

  return users;
};

export const follow_user = (userId) => async (dispatch) => {
  console.log("we are now in follow user thunk");
  console.log(window.location);
  const res = await fetch(
    `${window.location.origin}/api/users/${userId}/follow`
  );
  if (res.ok) {
    const response = await res.json();
    console.log(response);
  }
};

const initialState = {};

// reducer
export default function reducer(state = initialState, action) {
  let newState = Object.assign({}, state);
  switch (action.type) {
    case GET_USERS:
      const users = action.payload;
      newState = { ...newState, ...users };
      return newState;
    default:
      return newState;
  }
}
