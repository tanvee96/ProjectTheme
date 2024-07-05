import {
  RESET_MESSAGE,
  LOGIN_PROGRESS,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_PROGRESS,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
} from "../types";

const initialState = {
  loginUser: null,
  error: null,
  message: null,
};

const user_reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_PROGRESS:
      return { ...state };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loginUser: action.loginUser,
        error: false,
        message: action.loginUser.message,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        error: action.payload,
        message: "Invalid Credentials!",
      };
    case LOGOUT_PROGRESS:
      return { ...state };
    case LOGOUT_SUCCESS:
      return { ...state, loginUser: null, error: false };
    case LOGOUT_FAILURE:
      return { ...state, error: action.payload };

    case RESET_MESSAGE:
      return { ...state, message: null };
    default:
      return state;
  }
};

export default user_reducer;
