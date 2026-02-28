import Post from "../models/Post.js";

// Get all posts
export const getPosts = async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
};

// Like
export const likePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  post.likes += 1;
  await post.save();
  res.json(post);
};

// Dislike
export const dislikePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  post.dislikes += 1;
  await post.save();
  res.json(post);
};

// Share
export const sharePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  post.shares += 1;
  await post.save();
  res.json(post);
};

// Follow
export const followPost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  post.followers = (post.followers || 0) + 1;
  await post.save();
  res.json(post);
};

// Add comment
export const addComment = async (req, res) => {
  const { username, text } = req.body;
  const post = await Post.findById(req.params.id);

  post.comments.push({ username, text });
  await post.save();

  res.json(post);
};

// Delete comment
export const deleteComment = async (req, res) => {
  const { commentId } = req.params;
  const post = await Post.findById(req.params.id);

  post.comments = post.comments.filter(
    (comment) => comment._id.toString() !== commentId,
  );

  await post.save();
  res.json(post);
};
