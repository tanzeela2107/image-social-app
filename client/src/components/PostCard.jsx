import { useState } from "react";
import API from "../services/api";
import CommentSection from "./CommentSection";
import "./PostCard.css";

const PostCard = ({ post }) => {
  const [data, setData] = useState(post);

  const handleAction = async (type) => {
    const res = await API.put(`/posts/${data._id}/${type}`);
    setData(res.data);
  };

  const handleShare = async () => {
    await handleAction("share");

    if (navigator.share) {
      navigator.share({
        title: "Check this image",
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied!");
    }
  };

  return (
    <div className="post-card">
      {/* PROFILE HEADER */}
      <div className="post-header">
        <img
          src="https://i.pinimg.com/236x/6d/4a/9f/6d4a9fdca509fde5a5c372fdee072084.jpg"
          alt="profile"
          className="profile-pic"
        />
        <span className="username">tanzeela</span>
      </div>

      {/* IMAGE */}
      <img src={data.image} alt="post" className="post-image" />

      {/* ICONS */}
      <div className="post-icons">
        <span onClick={() => handleAction("like")}>❤️ {data.likes}</span>
        <span onClick={() => handleAction("dislike")}>👎 {data.dislikes}</span>
        <span onClick={handleShare}>📤 {data.shares}</span>
        <span onClick={() => handleAction("follow")}>
          ➕ Follow {data.followers}
        </span>
      </div>

      <CommentSection post={data} setPost={setData} />
    </div>
  );
};

export default PostCard;
