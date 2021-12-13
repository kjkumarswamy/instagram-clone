import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { postCreateAction } from "../../redux/actions/postAction";
import { Spinner } from "react-bootstrap";

const Create = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.createPost);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");

  const updatePhoto = (file) => {
    setImage(file);
  };

  useEffect(() => {
    if (image) {
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
        setUrl(data.url);
      };
      fetchPhoto();
      if (url) {
        const post = { title, desc, url };
        dispatch(postCreateAction(post));
      }
    }
  }, [image, url, title, desc, dispatch]);

  const postData = () => {
    if (!title || !desc || !image) {
      alert("Please fill all fields");
    }
  };

  return (
    <Layout>
      <div className="cardContainer">
        {loading ? (
          <Spinner animation="border" size="lg" variant="success" />
        ) : null}
        <p className="title">Create Post</p>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="text"
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="text"
              placeholder="Description"
              onChange={(e) => setDesc(e.target.value)}
              value={desc}
            />
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Control
              type="file"
              onChange={(e) => updatePhoto(e.target.files[0])}
            />
          </Form.Group>
          <Button variant="warning" onClick={postData}>
            Submit
          </Button>
        </Form>
      </div>
    </Layout>
  );
};

export default Create;
