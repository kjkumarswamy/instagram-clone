import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import "./style.css";
import { Form, Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../../redux/actions/authAction";
import { Redirect } from "react-router-dom";

const Signin = () => {
  const dispatch = useDispatch();
  const { authenticating, authenticate, error } = useSelector(
    (state) => state.auth
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitData = (e) => {
    e.preventDefault();
    const user = { email, password };
    dispatch(loginAction(user));
  };

  if (authenticate) {
    return <Redirect to="/" />;
  }

  return (
    <Layout>
      <div className="cardContainer">
        {authenticating ? (
          <Spinner
            animation="border"
            style={{ textAlign: "center" }}
            size="lg"
          />
        ) : error ? (
          <h6 className="text-danger">{error}</h6>
        ) : null}
        <p className="title">Login</p>
        <Form onSubmit={submitData}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
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
            If you're not Register Please <Link to="/signup">Click Here</Link>
          </h6>
        </Form>
      </div>
    </Layout>
  );
};

export default Signin;
