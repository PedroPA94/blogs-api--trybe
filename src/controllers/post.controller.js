const { postService } = require('../services');

const createPost = async (req, res) => {
  const { user } = req;
  const newPost = req.body;
  const post = await postService.createPost(user.id, newPost);
  res.status(201).json(post);
};

const getPosts = async (_req, res) => {
  const posts = await postService.getPosts();
  res.status(200).json(posts);
};

module.exports = {
  createPost,
  getPosts,
};