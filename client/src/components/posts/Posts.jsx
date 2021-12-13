import React, { useState, useEffect } from "react";
import "./style.css";
import { Card, Form, Button } from "react-bootstrap";
import { MdFavorite, MdThumbUp } from "react-icons/md";
import { BsTrash } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  likeAction,
  deletePostAction,
  commentAction,
} from "../../redux/actions/postAction";
import { followUserAction } from "../../redux/actions/userAction";

const Posts = ({ post, following }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.getUser);
  const [likeCount, setLikeCount] = useState(0);
  const [isLiked, setisLiked] = useState(false);
  const [Follow, setFollow] = useState("");
  const [isFollow, setisFollow] = useState(false);
  const [comment, setComment] = useState([]);

  useEffect(() => {
    if (user.followers.includes(post.postedBy._id)) {
      setFollow("Unfollow");
    } else {
      setFollow("Follow");
    }
  }, [user, post]);

  //post like
  const likeHandler = (post) => {
    dispatch(likeAction(post._id));

    if (post.likes.includes(user._id)) {
      setLikeCount(isLiked ? likeCount + 1 : likeCount - 1);
    } else {
      setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
    }
    setisLiked(!isLiked);
  };

  //follow user
  const FollowHandler = (post) => {
    dispatch(followUserAction(post.postedBy._id));
    if (user.followers.includes(post.postedBy._id)) {
      setFollow(isFollow ? "Unfollow" : "Follow");
    } else {
      setFollow(isFollow ? "Follow" : "Unfollow");
    }
    setisFollow(!isFollow);
  };

  //post comment
  const commentHandler = async (text, id) => {
    setComment([...comment, text]);
    dispatch(commentAction(text, id));
  };

  //post delete
  const deleteHandler = (post) => {
    dispatch(deletePostAction(post._id));
  };

  return (
    <>
      <Card className="mb-4">
        <div className="cardHeader">
          <Link
            to={
              post.postedBy._id === user._id
                ? `/profile`
                : `/profile/${post.postedBy._id}`
            }
            style={{ textDecoration: "none", color: "black  " }}
          >
            <h5 className="title">{post.postedBy.username} </h5>
          </Link>
          <div>
            {post.postedBy._id !== user._id ? (
              <>
                <Button
                  className="btn-success"
                  onClick={() => FollowHandler(post)}
                >
                  {Follow}
                </Button>
              </>
            ) : null}
            &nbsp;
            {post.postedBy._id === user._id ? (
              <BsTrash
                style={{ color: "red", cursor: "pointer" }}
                onClick={() => deleteHandler(post._id)}
              />
            ) : null}
          </div>
        </div>
        <Card.Img variant="top" src={post.photo} />
        <span
          style={{
            paddingLeft: "10px",
            fontSize: "20px",
          }}
        >
          <MdFavorite
            color="red"
            onClick={() => likeHandler(post)}
            style={{ cursor: "pointer" }}
          />
          &nbsp;
          <MdThumbUp
            onClick={() => likeHandler(post)}
            style={{ cursor: "pointer" }}
          />
          &nbsp;
          <span style={{ fontSize: "14px" }}>
            {post.likes.length + likeCount} likes
          </span>
        </span>
        <Card.Body>
          <Card.Title>{post.title}</Card.Title>
          <Card.Text>{post.desc}</Card.Text>

          <h6 className="text-primary">Comments</h6>
          {post.comments
            ? post.comments.map((comment, i) => (
                <p className="commentBox" key={i}>
                  <b>{comment.postedBy.username} : </b> {comment.text}
                </p>
              ))
            : null}
          {comment.map((cc, i) => (
            <p className="commentBox" key={i}>
              <b>{user.username} </b> {cc}
            </p>
          ))}

          <Form
            onSubmit={(e) => {
              e.preventDefault();
              commentHandler(e.target[0].value, post._id);
            }}
          >
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control type="text" placeholder="Add Comment" />
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

export default Posts;
