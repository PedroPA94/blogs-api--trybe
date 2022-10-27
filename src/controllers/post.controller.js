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

const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const { id: userId } = req.user;

  const [update] = await postService.updatePost(id, title, content, userId);
  if (update !== 1) throw new Error();

  const [updatedPost] = await postService.getPostById(id);
  res.status(200).json(updatedPost);
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  const { id: userId } = req.user;

  const deleted = await postService.deletePost(id, userId);
  if (deleted !== 1) throw new Error();

  res.status(204).end();
};

module.exports = {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
};