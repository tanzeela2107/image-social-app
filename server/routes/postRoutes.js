import express from "express";
import Post from "../models/Post.js";
import {
  getPosts,
  likePost,
  dislikePost,
  sharePost,
  followPost,
  addComment,
  deleteComment,
} from "../controllers/postController.js";

const router = express.Router();

router.get("/", getPosts);
router.put("/:id/like", likePost);
router.put("/:id/dislike", dislikePost);
router.put("/:id/share", sharePost);
router.put("/:id/follow", followPost);
router.post("/:id/comment", addComment);
router.delete("/:id/comment/:commentId", deleteComment);

router.put("/:id", async (req, res) => {
  const updatedPost = await Post.findByIdAndUpdate(
    req.params.id,
    { image: req.body.image },
    { new: true },
  );
  res.json(updatedPost);
});

export default router;
