import React, { useEffect } from "react";
import Routes from "./components/routes/Routes";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { isUserLoggedIn } from "./redux/actions/authAction";
import { getAllPostAction, getTimelinePosts } from "./redux/actions/postAction";
import { getUserAction } from "./redux/actions/userAction";

const App = () => {
  const dispatch = useDispatch();
  const { authenticate } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!authenticate) {
      dispatch(isUserLoggedIn());
    }
  }, [authenticate, dispatch]);

  useEffect(() => {
    dispatch(getAllPostAction());
    dispatch(getUserAction());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTimelinePosts());
  }, [dispatch]);

  return (
    <>
      <Routes />
    </>
  );
};

export default App;
