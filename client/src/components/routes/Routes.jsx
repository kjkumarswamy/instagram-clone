import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "../../pages/home/Home";
import Create from "../../pages/create/Create";
import Profile from "../../pages/profile/Profile";
import Signin from "../../pages/signin/Signin";
import Signup from "../../pages/signup/Signup";
import Followings from "../../pages/followings/Followings";
import UserProfile from "../../pages/profile/UserProfile";
import PrivateRoute from "../hoc/PrivateRoute";

const Routes = () => {
  return (
    <Switch>
      <PrivateRoute path="/" component={Home} exact />
      <PrivateRoute path="/create" component={Create} />
      <PrivateRoute path="/profile" component={Profile} exact />
      <PrivateRoute path="/profile/:id" component={UserProfile} />
      <PrivateRoute path="/followings" component={Followings} />
      <Route path="/Signin" component={Signin} />
      <Route path="/Signup" component={Signup} />
    </Switch>
  );
};

export default Routes;
