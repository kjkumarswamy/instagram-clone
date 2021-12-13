import { authConstants } from "../constants";

const initialState = {
  token: null,
  user: {
    username: "",
    email: "",
    password: "",
  },
  authenticating: false,
  authenticate: false,
  message: "",
  error: null,
  regError: null,
  loading: false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case authConstants.SIGNUP_REQUEST:
      return { ...initialState, loading: true };
    case authConstants.SIGNUP_SUCCESS:
      return {
        ...initialState,
        loading: false,
        message: action.payload.message,
      };
    case authConstants.SIGNUP_FAILURE:
      return {
        ...initialState,
        loading: false,
        regError: action.payload.error,
      };
    case authConstants.SIGNIN_REQUEST:
      return { ...state, authenticating: true };
    case authConstants.SIGNIN_SUCCESS:
      return {
        ...state,
        authenticating: false,
        authenticate: true,
        token: action.payload.token,
        user: action.payload.user,
      };
    case authConstants.SIGNIN_FAILURE:
      return {
        ...state,
        authenticating: false,
        authenticate: false,
        error: action.payload.error,
      };
    case authConstants.SIGNOUT_REQUEST:
      return { ...initialState, loading: true };
    case authConstants.SIGNOUT_SUCCESS:
      return {
        ...initialState,
        loading: false,
        message: action.payload.message,
      };
    case authConstants.SIGNOUT_FAILURE:
      return { ...initialState, loading: false, error: action.payload.error };
    default:
      return state;
  }
};
