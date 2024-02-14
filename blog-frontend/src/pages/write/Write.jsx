import { useContext, useState } from "react";
import "./write.css";
import axios from "axios";
import { Context } from "../../context/Context";
import { BACKEND_URL } from "../../backend_url";

export default function Write() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      user_name: user.user.name,
      title,
      body,
      category,
    };
    if (file) {
      const data =new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }
    try {
      console.log(newPost)
      const res = await axios.post(`${BACKEND_URL}/blogs`, newPost);
      console.log(res.data.blog._id);
      // navigate("/post/res.data.blog._id")
      window.location.replace("/post/" + res.data.blog._id);
    } catch (err) {}
  };
  return (
    <div className="write">
      {/* {file && (
        <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
      )} */}
      <form className="writeForm" onSubmit={handleSubmit}>
      <div className="writeFormGroup">
          
          <input
            type="text"
            placeholder="Category"
            className="writeInput"
            autoFocus={true}
            onChange={e=>setCategory(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          
          <input
            type="text"
            placeholder="Title"
            className="writeInput"
            autoFocus={true}
            onChange={e=>setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            placeholder="Tell your story..."
            type="text"
            className="writeInput writeText"
            onChange={e=>setBody(e.target.value)}
          ></textarea>
        </div>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
}
