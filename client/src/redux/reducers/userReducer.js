import { userConstants } from "../constants";

//get user
const initialUserState = {
  loading: false,
  error: null,
  user: {},
};

export const getUserReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case userConstants.GET_USER_REQUEST:
      return { ...state, loading: true };
    case userConstants.GET_USER_SUCCESS:
      return { ...state, loading: false, user: action.payload.user };
    case userConstants.GET_USER_FAILURE:
      return { ...state, loading: false, error: action.payload.error };
    default:
      return state;
  }
};

//follow user
const followState = {
  loading: false,
  message: "",
  error: null,
};

export const followUserReducer = (state = followState, action) => {
  switch (action.type) {
    case userConstants.FOLLOW_USER_REQUEST:
      return { ...state, loading: true };
    case userConstants.FOLLOW_USER_SUCCESS:
      return { ...state, loading: false, message: action.payload.message };
    case userConstants.FOLLOW_USER_FAILURE:
      return { ...state, loading: false, error: action.payload.error };
    default:
      return state;
  }
};

//get user by id
const UserState = {
  loading: false,
  error: null,
  user: {},
};

export const getUserByIdReducer = (state = UserState, action) => {
  switch (action.type) {
    case userConstants.GET_USER_BY_ID_REQUEST:
      return { ...state, loading: true };
    case userConstants.GET_USER_BY_ID_SUCCESS:
      return { ...state, loading: false, user: action.payload.user };
    case userConstants.GET_USER_BY_ID_FAILURE:
      return { ...state, loading: false, error: action.payload.error };
    default:
      return state;
  }
};

//update user
const updateUserState = {
  loading: false,
  error: null,
  message: "",
};

export const updateUserReducer = (state = updateUserState, action) => {
  switch (action.type) {
    case userConstants.UPDATE_USER_REQUEST:
      return { ...state, loading: true };
    case userConstants.UPDATE_USER_SUCCESS:
      return { ...state, loading: false, message: action.payload.message };
    case userConstants.UPDATE_USER_FAILURE:
      return { ...state, loading: false, error: action.payload.error };
    default:
      return state;
  }
};
