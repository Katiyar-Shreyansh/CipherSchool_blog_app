import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link, useParams } from "react-router-dom";
import { Context } from "../../context/Context";
import "./singlePost.css";
import { BACKEND_URL } from "../../backend_url";

export default function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  // const PF = "http://localhost:5000/images/";
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("")
  const [updateMode, setUpdateMode] = useState(false);

  const params = useParams();

  const {id} = params;

  useEffect(() => {
    const getPost = async () => {
      console.log(id)
      const res = await axios.get(`${BACKEND_URL}/blogs/${id}`);
   
      setPost(res.data.blog);
      setTitle(res.data.blog.title);
      setBody(res.data.blog.body);
      setCategory(res.data.blog.category)
    };
    getPost();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`${BACKEND_URL}/blogs/${post._id}`);
      window.location.replace("/");
    } catch (err) {}
  };

  const handleUpdate = async () => {
    try {
      await axios.patch(`${BACKEND_URL}/blogs/${post._id}`, {
        category,
        title,
        body,
      });
      setUpdateMode(false)
    } catch (err) {}
  };

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {/* {post.photo && (
          <img src={PF + post.photo} alt="" className="singlePostImg" />
        )} */}
        {updateMode ? (
          <input
            type="text"
            value={title}
            className="singlePostTitleInput"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className="singlePostTitle">
            {title}
            {post.user_name === user?.user.name && (
              <div className="singlePostEdit">
                <i
                  className="singlePostIcon far fa-edit"
                  onClick={() => setUpdateMode(true)}
                ></i>
                <i
                  className="singlePostIcon far fa-trash-alt"
                  onClick={handleDelete}
                ></i>
              </div>
            )}
          </h1>
        )}
        <div className="singlePostInfo">
          <span className="singlePostAuthor">
            Author:
            <Link to={`/?user=${post.user_name}`} className="link">
              <b> {post.user_name}</b>
            </Link>
          </span>
          <span className="singlePostDate">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        {updateMode ? (
          <textarea
            className="singlePostDescInput"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        ) : (
          <p className="singlePostDesc">{body}</p>
        )}
        {updateMode && (
          <button className="singlePostButton" onClick={handleUpdate}>
            Update
          </button>
        )}
      </div>
    </div>
  );
}
