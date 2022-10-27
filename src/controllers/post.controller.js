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

const getPostById = async (req, res) => {
  const { id } = req.params;
  const [post] = await postService.getPostById(id);

  if (post === undefined) {
    const e = new Error('Post does not exist');
    e.name = 'PostNotFound';
    throw e;
  }

  res.status(200).json(post);
};

module.exports = {
  createPost,
  getPosts,
  getPostById,
};