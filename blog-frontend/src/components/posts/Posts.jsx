import { useEffect, useState } from "react";
import Post from "../post/Post";
import "./posts.css";
import axios from "axios";
import { BACKEND_URL } from "../../backend_url";

export default function Posts() {


  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(`${BACKEND_URL}/blogs`);
      setPosts(res.data.blogs);
      console.log(res.data.blogs)

    };
    fetchPosts();
  }, []);
  return (
    <div className="posts">
      
      {posts?.length === 0 ? (
       <p>No blogs found!</p>
      ) : (
        <>
        {posts?.map((p) => (
          <Post post={p} />
        ))}
        </>
      )}
    </div>
  );
}
