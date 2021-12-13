import React, { useEffect } from "react";
import Layout from "../../components/layout/Layout";
import Posts from "../../components/posts/Posts";
import { useSelector, useDispatch } from "react-redux";
import { Spinner } from "react-bootstrap";
import "./style.css";
import { getUserAction } from "../../redux/actions/userAction";

const Home = () => {
  const dispatch = useDispatch();
  const { loading, posts, error } = useSelector((state) => state.getPosts);

  useEffect(() => {
    dispatch(getUserAction());
  }, [dispatch]);

  return (
    <Layout>
      <div className="homeContainer">
        {loading ? (
          <div style={{ textAlign: "center" }}>
            <Spinner animation="border" size="lg" variant="success" />
          </div>
        ) : error ? (
          <h6 className="text-danger">{error}</h6>
        ) : posts ? (
          posts.map((post, i) => <Posts post={post} key={i} />)
        ) : null}
      </div>
    </Layout>
  );
};

export default Home;
