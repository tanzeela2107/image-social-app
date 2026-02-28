import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  username: String,
  text: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const postSchema = new mongoose.Schema({
  image: String,
  likes: {
    type: Number,
    default: 0,
  },
  dislikes: {
    type: Number,
    default: 0,
  },
  shares: {
    type: Number,
    default: 0,
  },
  comments: [commentSchema],
  followers: {
    type: Number,
    default: 0,
  },
});

export default mongoose.model("Post", postSchema);
