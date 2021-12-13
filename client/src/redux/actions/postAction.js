import axios from "../../helpers/axios";
import { postConstants } from "../constants";

//create post
export const postCreateAction = (post) => {
  return async (dispatch) => {
    dispatch({ type: postConstants.CREATE_POST_REQUEST });
    try {
      const res = await axios.post("/post/create", { ...post });
      if (res.status === 200) {
        dispatch({
          type: postConstants.CREATE_POST_SUCCESS,
          payload: {
            message: res.data.message,
          },
        });
      }
      window.location.replace("/");
      if (res.status === 400) {
        dispatch({
          type: postConstants.CREATE_POST_FAILURE,
          payload: {
            error: res.data.error,
          },
        });
      }
    } catch (error) {
      dispatch({
        type: postConstants.CREATE_POST_FAILURE,
        payload: {
          error: "Something went wrong",
        },
      });
    }
  };
};

//get all post
export const getAllPostAction = () => {
  return async (dispatch) => {
    dispatch({ type: postConstants.GET_POST_REQUEST });
    try {
      const res = await axios.get("/post/getallposts");
      if (res.status === 200) {
        dispatch({
          type: postConstants.GET_POST_SUCCESS,
          payload: {
            posts: res.data,
          },
        });
      }
      if (res.status === 400) {
        dispatch({
          type: postConstants.GET_POST_FAILURE,
          payload: {
            error: res.data.error,
          },
        });
      }
    } catch (error) {
      dispatch({
        type: postConstants.GET_POST_FAILURE,
        payload: {
          error: "Something went wrong",
        },
      });
    }
  };
};

//get post by id
export const getPostByIdAction = (id) => {
  return async (dispatch) => {
    dispatch({ type: postConstants.GET_POST_BY_ID_REQUEST });
    try {
      const res = await axios.get(`/post/myposts/${id}`);
      if (res.status === 200) {
        dispatch({
          type: postConstants.GET_POST_BY_ID_SUCCESS,
          payload: {
            posts: res.data.posts,
          },
        });
      }
      if (res.status === 400) {
        dispatch({
          type: postConstants.GET_POST_BY_ID_FAILURE,
          payload: {
            error: res.data.error,
          },
        });
      }
    } catch (error) {
      dispatch({
        type: postConstants.GET_POST_FAILURE,
        payload: {
          error: "Something went wrong",
        },
      });
    }
  };
};

//like post
export const likeAction = (id) => {
  return async (dispatch) => {
    dispatch({ type: postConstants.LIKE_POST_REQUEST });
    const res = await axios.put("/post/like", { id });
    if (res.status === 200) {
      dispatch({
        type: postConstants.LIKE_POST_SUCCESS,
        payload: {
          message: res.data.message,
        },
      });
    } else {
      dispatch({
        type: postConstants.LIKE_POST_FAILURE,
        payload: {
          error: res.data.error,
        },
      });
    }
  };
};

//comment post
export const commentAction = (text, id) => {
  return async (dispatch) => {
    dispatch({ type: postConstants.COMMENT_POST_REQUEST });
    const res = await axios.put("/post/comment", { text, id });
    if (res.status === 200) {
      dispatch({
        type: postConstants.COMMENT_POST_SUCCESS,
        payload: {
          message: res.data.message,
        },
      });
    } else {
      dispatch({
        type: postConstants.COMMENT_POST_FAILURE,
        payload: {
          error: res.data.error,
        },
      });
    }
  };
};

//delete post
export const deletePostAction = (id) => {
  return async (dispatch) => {
    dispatch({ type: postConstants.DELETE_POST_REQUEST });
    const res = await axios.delete(`/post/delete/${id}`);
    if (res.status === 200) {
      dispatch({
        type: postConstants.DELETE_POST_SUCCESS,
        payload: {
          message: res.data.message,
        },
      });
      dispatch(getAllPostAction());
      dispatch(getTimelinePosts());
    } else {
      dispatch({
        type: postConstants.DELETE_POST_FAILURE,
        payload: {
          error: res.data.error,
        },
      });
    }
  };
};

//get timeline posts
export const getTimelinePosts = () => {
  return async (dispatch) => {
    dispatch({ type: postConstants.TIMELINE_POST_REQUEST });
    try {
      const res = await axios.get("/post/timeline");
      if (res.status === 200) {
        dispatch({
          type: postConstants.TIMELINE_POST_SUCCESS,
          payload: {
            posts: res.data,
          },
        });
      }
      if (res.status === 400) {
        dispatch({
          type: postConstants.TIMELINE_POST_FAILURE,
          payload: {
            error: res.data.error,
          },
        });
      }
    } catch (error) {
      dispatch({
        type: postConstants.GET_POST_FAILURE,
        payload: {
          error: "Something went wrong",
        },
      });
    }
  };
};
