import React from "react";
import { Container, Navbar, Nav, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./topbar.css";
import { useSelector, useDispatch } from "react-redux";
import { logoutAction } from "../../redux/actions/authAction";

const Topbar = () => {
  const { authenticate, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const renderLoggedinLinks = () => {
    return (
      <>
        <NavLink to="/followings" className="nav-link">
          My Followings
        </NavLink>
        <NavLink to="/create" className="nav-link">
          Create
        </NavLink>
        <NavLink to="/profile" className="nav-link">
          {user.username}
        </NavLink>
        <Button onClick={() => dispatch(logoutAction())}>Signout</Button>
      </>
    );
  };

  const renderNonLoggedinLinks = () => {
    return (
      <>
        <NavLink to="/signup" className="nav-link">
          Signup
        </NavLink>
        <NavLink to="/signin" className="nav-link">
          Signin
        </NavLink>
      </>
    );
  };

  return (
    <>
      <Navbar
        bg="dark"
        variant="dark"
        className="topNavbar"
        style={{ position: "sticky", top: 0, zIndex: 999 }}
      >
        <Container>
          <NavLink to="/" className="navbar-brand title">
            Instagram
          </NavLink>
          <Nav className="me-right">
            {authenticate ? renderLoggedinLinks() : renderNonLoggedinLinks()}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Topbar;
