import React from "react";
import Topbar from "../topbar/Topbar";

const Layout = (props) => {
  return (
    <>
      <Topbar />
      {props.children}
    </>
  );
};

export default Layout;
