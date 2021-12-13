import React, { useEffect } from "react";
import Layout from "../../components/layout/Layout";
import { Row, Col, Container } from "react-bootstrap";
import "./style.css";
import { useSelector, useDispatch } from "react-redux";
import { getPostByIdAction } from "../../redux/actions/postAction";
import { getUserByIdAction } from "../../redux/actions/userAction";

const UserProfile = ({ match }) => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.getPostById);
  const { user } = useSelector((state) => state.getUserById);

  const id = match.params.id;

  useEffect(() => {
    if (id) {
      dispatch(getUserByIdAction(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (user._id) {
      dispatch(getPostByIdAction(user._id));
    }
  }, [dispatch, user]);

  return (
    <Layout>
      <Container>
        <div className="profileContainer">
          <Row>
            <Col md="6">
              <img
                src="https://media.istockphoto.com/photos/first-person-point-of-view-of-a-woman-paddling-on-a-stand-up-paddle-picture-id1288844330?b=1&k=20&m=1288844330&s=170667a&w=0&h=nckXG0H5kPDbgDpC8iTObsiqG7Jwt6CeLuJ2WxdOTp4="
                alt=""
                className="profileImg"
              />
            </Col>
            <Col md="6">
              <h2>{user.username}</h2>
              <span>{posts ? posts.length : 0} Posts</span>
              <span>
                {user.followers ? user.followers.length : 0} Followers
              </span>
              <span>
                {user.followers ? user.followings.length : 0} Following
              </span>
              <div className="profilePics">
                <img
                  src="https://images.unsplash.com/photo-1637580981163-1557b750168c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDQ2fDZzTVZqVExTa2VRfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=600&q=60"
                  alt=""
                />
                <img
                  src="https://media.istockphoto.com/photos/taxis-in-times-square-with-7th-avenue-new-york-city-manhattan-picture-id1277102943?b=1&k=20&m=1277102943&s=170667a&w=0&h=tp_vCWDpgrKsUBtl2ZI-8yy2fMHtoZJPcaZBTcnN9nc="
                  alt=""
                />
                <img
                  src="https://images.unsplash.com/photo-1637419980533-1119de04312f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDZ8NnNNVmpUTFNrZVF8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=60"
                  alt=""
                />
                <img
                  src="https://images.unsplash.com/photo-1637580980556-085dee659c7e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDQ0fDZzTVZqVExTa2VRfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=600&q=60"
                  alt=""
                />
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </Layout>
  );
};

export default UserProfile;
