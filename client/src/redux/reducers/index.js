import { combineReducers } from "redux";
import { authReducer } from "../reducers/authReducer";
import {
  getUserReducer,
  updateUserReducer,
  followUserReducer,
  getUserByIdReducer,
} from "../reducers/userReducer";
import {
  createPostReducer,
  getPostsReducer,
  getTimelinePostReducer,
  likePostReducer,
  commentPostReducer,
  deletePostReducer,
  getByPostReducer,
} from "../reducers/postReducer";

export const rootReducer = combineReducers({
  auth: authReducer,
  createPost: createPostReducer,
  getPosts: getPostsReducer,
  getPostById: getByPostReducer,
  getTimelinePosts: getTimelinePostReducer,
  likePosts: likePostReducer,
  commentPost: commentPostReducer,
  deletePost: deletePostReducer,
  getUser: getUserReducer,
  getUserById: getUserByIdReducer,
  updateUser: updateUserReducer,
  followUser: followUserReducer,
});
