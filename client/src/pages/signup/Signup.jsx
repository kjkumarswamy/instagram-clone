import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import "./style.css";
import { Form, Button, Spinner } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import { registerAction } from "../../redux/actions/authAction";
import { useDispatch, useSelector } from "react-redux";

const Signup = () => {
  const dispatch = useDispatch();
  const { loading, message, regError, authenticate } = useSelector(
    (state) => state.auth
  );

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitData = (e) => {
    e.preventDefault();
    const user = { username, email, password };
    dispatch(registerAction(user));
  };

  if (authenticate) {
    return <Redirect to="/" />;
  }

  return (
    <Layout>
      <div className="cardContainer">
        {loading ? (
          <Spinner
            animation="border"
            style={{ textAlign: "center" }}
            size="lg"
          />
        ) : message ? (
          <h6 className="text-success">{message}</h6>
        ) : regError ? (
          <h6 className="text-danger">{regError}</h6>
        ) : null}
        <p className="title">Register</p>
        <Form onSubmit={submitData}>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </Form.Group>
          <Button variant="success" type="submit">
            Submit
          </Button>
          <h6
            style={{
              textAlign: "center",
              cursor: "pointer",
              marginTop: "10px",
            }}
          >
            If you're already Register Please &nbsp;
            <Link to="/signin">Click Here</Link>
          </h6>
        </Form>
      </div>
    </Layout>
  );
};

export default Signup;
