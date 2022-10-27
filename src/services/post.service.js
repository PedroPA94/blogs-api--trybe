const Sequelize = require('sequelize');
const { BlogPost, PostCategory, User, Category } = require('../models');
const { validateNewPost, validateUpdatePost } = require('../validations/validateInputs');
const config = require('../config/config');

const env = process.env.NODE_ENV || 'development';
const sequelize = new Sequelize(config[env]);

const createPost = async (userId, newPost) => {
  await validateNewPost(newPost);
  const { categoryIds, ...postContent } = newPost;

  try {
    const result = await sequelize.transaction(async (t) => {
      const post = await BlogPost.create({ userId, ...postContent }, { transaction: t });

      const postAndCategories = categoryIds.map((categoryId) => (
        { categoryId, postId: post.dataValues.id }
      ));

      await PostCategory.bulkCreate(postAndCategories, { transaction: t });
      
      return post;
    });
    return result;  
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const getPosts = async () => BlogPost.findAll({
  include: [
    { model: User, as: 'user', attributes: { exclude: 'password' } },
    { model: Category, as: 'categories', through: PostCategory },
  ],
});

const getPostById = async (id) => BlogPost.findAll({
  where: { id },
  include: [
    { model: User, as: 'user', attributes: { exclude: 'password' } },
    { model: Category, as: 'categories', through: PostCategory },
  ],
});

const updatePost = async (id, title, content, userId) => {
  await validateUpdatePost(id, title, content, userId);

  const updatedPost = await BlogPost.update(
    { title, content },
    { where: { id } },
  );

  return updatedPost;
};

module.exports = {
  createPost,
  getPosts,
  getPostById,
  updatePost, 
};