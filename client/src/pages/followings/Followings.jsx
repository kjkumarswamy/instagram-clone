import React from "react";
import Layout from "../../components/layout/Layout";
import { useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import Posts from "../../components/posts/Posts";

const Followings = () => {
  const { loading, posts, error } = useSelector(
    (state) => state.getTimelinePosts
  );
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
          posts.map((post, i) => <Posts post={post} key={i} following={true} />)
        ) : null}
      </div>
    </Layout>
  );
};

export default Followings;
