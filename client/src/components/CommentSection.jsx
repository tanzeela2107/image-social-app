import { useState } from "react";
import API from "../services/api";

const CommentSection = ({ post, setPost }) => {
  const [username, setUsername] = useState("");
  const [text, setText] = useState("");

  const handleComment = async () => {
    if (!username || !text) return;

    const res = await API.post(`/posts/${post._id}/comment`, {
      username,
      text,
    });

    setPost(res.data);
    setText("");
  };

  const handleDelete = async (commentId) => {
    const res = await API.delete(`/posts/${post._id}/comment/${commentId}`);
    setPost(res.data);
  };

  return (
    <div className="comment-section">
      <div className="comment-title">Comments</div>

      {post.comments.map((comment) => (
        <div key={comment._id} className="comment-item">
          <span>
            <b>{comment.username}</b>: {comment.text}
          </span>
          <button
            className="delete-btn"
            onClick={() => handleDelete(comment._id)}
          >
            Delete
          </button>
        </div>
      ))}

      <div className="comment-inputs">
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          placeholder="Add comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button onClick={handleComment}>Post</button>
      </div>
    </div>
  );
};

export default CommentSection;
