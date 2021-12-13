import { postConstants } from "../constants";

const createPostState = {
  loading: false,
  message: "",
  error: null,
  success: false,
};

export const createPostReducer = (state = createPostState, action) => {
  switch (action.type) {
    case postConstants.CREATE_POST_REQUEST:
      return { ...state, loading: true };
    case postConstants.CREATE_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload.message,
        success: true,
      };
    case postConstants.CREATE_POST_FAILURE:
      return { ...state, loading: false, error: action.payload.error };
    default:
      return state;
  }
};

const getPostState = {
  loading: false,
  posts: [],
  error: null,
};

export const getPostsReducer = (state = getPostState, action) => {
  switch (action.type) {
    case postConstants.GET_POST_REQUEST:
      return { ...state, loading: true };
    case postConstants.GET_POST_SUCCESS:
      return { ...state, loading: false, posts: action.payload.posts };
    case postConstants.GET_POST_FAILURE:
      return { ...state, loading: false, error: action.payload.error };
    default:
      return state;
  }
};

const likePostState = {
  loading: false,
  message: [],
  error: null,
};

export const likePostReducer = (state = likePostState, action) => {
  switch (action.type) {
    case postConstants.LIKE_POST_REQUEST:
      return { ...state, loading: true };
    case postConstants.LIKE_POST_SUCCESS:
      return { ...state, loading: false, message: action.payload.message };
    case postConstants.LIKE_POST_FAILURE:
      return { ...state, loading: false, error: action.payload.error };
    default:
      return state;
  }
};

//comment post
const commentPostState = {
  loading: false,
  message: [],
  error: null,
};

export const commentPostReducer = (state = commentPostState, action) => {
  switch (action.type) {
    case postConstants.COMMENT_POST_REQUEST:
      return { ...state, loading: true };
    case postConstants.COMMENT_POST_SUCCESS:
      return { ...state, loading: false, message: action.payload.message };
    case postConstants.COMMENT_POST_FAILURE:
      return { ...state, loading: false, error: action.payload.error };
    default:
      return state;
  }
};

//delete post
const deletePostState = {
  loading: false,
  message: "",
  error: null,
};

export const deletePostReducer = (state = deletePostState, action) => {
  switch (action.type) {
    case postConstants.DELETE_POST_REQUEST:
      return { ...state, loading: true };
    case postConstants.DELETE_POST_SUCCESS:
      return { ...state, loading: false, message: action.payload.message };
    case postConstants.DELETE_POST_FAILURE:
      return { ...state, loading: false, error: action.payload.error };
    default:
      return state;
  }
};

//get post by id
const postState = {
  loading: false,
  posts: [],
  error: null,
};

export const getByPostReducer = (state = postState, action) => {
  switch (action.type) {
    case postConstants.GET_POST_BY_ID_REQUEST:
      return { ...state, loading: true };
    case postConstants.GET_POST_BY_ID_SUCCESS:
      return { ...state, loading: false, posts: action.payload.posts };
    case postConstants.GET_POST_BY_ID_FAILURE:
      return { ...state, loading: false, error: action.payload.error };
    default:
      return state;
  }
};

//get timeline posts
const timelinepostState = {
  loading: false,
  posts: [],
  error: null,
};

export const getTimelinePostReducer = (state = timelinepostState, action) => {
  switch (action.type) {
    case postConstants.TIMELINE_POST_REQUEST:
      return { ...state, loading: true };
    case postConstants.TIMELINE_POST_SUCCESS:
      return { ...state, loading: false, posts: action.payload.posts };
    case postConstants.TIMELINE_POST_FAILURE:
      return { ...state, loading: false, error: action.payload.error };
    default:
      return state;
  }
};
