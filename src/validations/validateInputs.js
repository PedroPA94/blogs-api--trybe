const { User, Category } = require('../models');
const { newUserSchema, categoryNameSchema, newPostSchema } = require('./schema');

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

module.exports = {
  validateNewUser,
  validateNewCategory,
  validateNewPost,
};