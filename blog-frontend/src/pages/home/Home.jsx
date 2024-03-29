import { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import "./home.css";
import axios from "axios";
import { useLocation } from "react-router";
import { BACKEND_URL } from "../../backend_url";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     const res = await axios.get(`${BACKEND_URL}/blogs`);
  //     setPosts(res.data.blogs);
  //     console.log(res.data.blogs)

  //   };
  //   fetchPosts();
  // }, []);
  return (
    <>
      <Header />
      <div className="home">
        <Posts />
        <Sidebar />
      </div>
    </>
  );
}
