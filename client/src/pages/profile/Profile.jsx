import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import { Row, Col } from "react-bootstrap";
import "./style.css";
import { FaEdit } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { getPostByIdAction } from "../../redux/actions/postAction";
import { updateUserAction } from "../../redux/actions/userAction";
import { Spinner } from "react-bootstrap";

const Profile = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.getPostById);
  const { user } = useSelector((state) => state.getUser);
  const { loading } = useSelector((state) => state.updateUser);

  const [image, setImage] = useState("");
  const [message, setMessage] = useState(false);

  useEffect(() => {
    if (user._id) {
      dispatch(getPostByIdAction(user._id));
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (loading) {
      setMessage(false);
    }
  }, [loading]);

  if (image) {
    setMessage(true);
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "insta-clone");
    formData.append("cloud_name", "skillsinkannada");
    const fetchPhoto = async () => {
      const response = await fetch(
        "http://api.cloudinary.com/v1_1/skillsinkannada/image/upload",
        {
          method: "post",
          body: formData,
        }
      );
      const data = await response.json();
      const post = { profilePic: data.url };
      dispatch(updateUserAction(post));
    };
    fetchPhoto();
    setImage("");
  }

  return (
    <Layout>
      <div className="profileContainer">
        <Row>
          <Col md="6">
            <div style={{ position: "relative" }}>
              {message ? (
                <div
                  style={{
                    marginTop: "150px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "50px",
                  }}
                >
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </div>
              ) : (
                <img
                  src={image ? URL.createObjectURL(image) : user.profilePic}
                  alt=""
                  className="profileImg"
                />
              )}

              <label htmlFor="profilePic">
                <FaEdit
                  style={{
                    position: "absolute",
                    top: "50",
                    right: "180px",
                    cursor: "pointer",
                    fontSize: "25px",
                    color: "black",
                  }}
                />
              </label>
              <input
                type="file"
                id="profilePic"
                onChange={(e) => setImage(e.target.files[0])}
                style={{ display: "none" }}
              />
            </div>
          </Col>
          <Col md="6">
            <h2>{user ? user.username : "User"}</h2>
            <span>{posts ? posts.length : "0"} Posts</span>
            <span>
              {user.followers ? user.followers.length : "0"} Followers
            </span>
            <span>
              {user.followings ? user.followings.length : "0"} Following
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
    </Layout>
  );
};

export default Profile;
