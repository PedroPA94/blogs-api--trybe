const { User, Category, BlogPost } = require('../models');
const { newUserSchema, categoryNameSchema, newPostSchema, updatePostSchema } = require('./schema');

const validateNewUser = async (newUser) => {
  const { error } = newUserSchema.validate(newUser);
  if (error) {
    const e = new Error(error.message);
    e.name = 'InvalidValue';
    throw e;
  }

  const existingUser = await User.findOne({ where: { email: newUser.email } });
  if (existingUser !== null) {
    const e = new Error('User already registered');
    e.name = 'UserAlreadyRegistered';
    throw e;
  }
};

const validateNewCategory = (name) => {
  const { error } = categoryNameSchema.validate({ name });
  if (error) {
    const e = new Error(error.message);
    e.name = 'InvalidValue';
    throw e;
  }
};

const validateCategories = async (categoryIds) => {
  const promises = categoryIds.map((id) => Category.findByPk(id));
  const foundCategories = await Promise.all(promises);

  if (foundCategories.some((category) => category === null)) {
    const e = new Error('one or more "categoryIds" not found');
    e.name = 'CategoryNotFound';
    throw e;
  }
};

const validateNewPost = async (newPost) => {
  const { error } = newPostSchema.validate(newPost);
  if (error) {
    const e = new Error('Some required fields are missing');
    e.name = 'InvalidValue';
    throw e;
  }

  await validateCategories(newPost.categoryIds);
};

const validatePostUser = async (postId, userId) => {
  const { dataValues: { userId: postUser } } = await BlogPost.findByPk(postId);
  console.log('id', postUser, 'user', userId);
  if (postUser !== userId) {
    const e = new Error('Unauthorized user');
    e.name = 'UnauthorizedUser';
    throw e;
  }
};

const validateUpdatePost = async (id, title, content, userId) => {
  const { error } = updatePostSchema.validate({ title, content });
  if (error) {
    const e = new Error('Some required fields are missing');
    e.name = 'InvalidValue';
    throw e;
  }

  await validatePostUser(id, userId);
};

module.exports = {
  validateNewUser,
  validateNewCategory,
  validateNewPost,
  validateUpdatePost,
};