const { postService } = require('../services');

const createPost = async (req, res) => {
  const { user } = req;
  const newPost = req.body;
  const post = await postService.createPost(user.id, newPost);
  res.status(201).json(post);
};

module.exports = {
  createPost,
};