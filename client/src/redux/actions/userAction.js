import axios from "../../helpers/axios";
import { userConstants } from "../constants";

//get user
export const getUserAction = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: userConstants.GET_USER_REQUEST });
      const res = await axios.get("/user/getuser");
      if (res.status === 200) {
        dispatch({
          type: userConstants.GET_USER_SUCCESS,
          payload: {
            user: res.data.user,
          },
        });
      } else {
        dispatch({
          type: userConstants.GET_USER_SUCCESS,
          payload: {
            error: res.data.error,
          },
        });
      }
    } catch (error) {
      dispatch({
        type: userConstants.GET_USER_FAILURE,
        payload: {
          error: "Something went wrong",
        },
      });
    }
  };
};

//follow user
export const followUserAction = (id) => {
  return async (dispatch) => {
    dispatch({ type: userConstants.FOLLOW_USER_REQUEST });
    try {
      const res = await axios.put("/user/follow", { id });
      if (res.status === 200) {
        dispatch({
          type: userConstants.FOLLOW_USER_SUCCESS,
          payload: {
            message: res.data.message,
          },
        });
        dispatch(getUserAction());
      } else {
        dispatch({
          type: userConstants.FOLLOW_USER_FAILURE,
          payload: {
            error: res.data.error,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

//get user by id
export const getUserByIdAction = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: userConstants.GET_USER_BY_ID_REQUEST });
      const res = await axios.get(`/user/profile/${id}`);
      if (res.status === 200) {
        dispatch({
          type: userConstants.GET_USER_BY_ID_SUCCESS,
          payload: {
            user: res.data.user,
          },
        });
      } else {
        dispatch({
          type: userConstants.GET_USER_BY_ID_FAILURE,
          payload: {
            error: res.data.error,
          },
        });
      }
    } catch (error) {
      dispatch({
        type: userConstants.GET_USER_FAILURE,
        payload: {
          error: "Something went wrong",
        },
      });
    }
  };
};

//update user
export const updateUserAction = (data) => {
  return async (dispatch) => {
    dispatch({ type: userConstants.UPDATE_USER_REQUEST });
    try {
      const res = await axios.put("/user/update", { data });
      if (res.status === 200) {
        dispatch({
          type: userConstants.UPDATE_USER_SUCCESS,
          payload: {
            message: res.data.message,
          },
        });
        dispatch(getUserAction());
      } else {
        dispatch({
          type: userConstants.UPDATE_USER_FAILURE,
          payload: {
            error: res.data.error,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
