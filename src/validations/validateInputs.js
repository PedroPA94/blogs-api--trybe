const { User } = require('../models');
const { newUserSchema, categoryNameSchema } = require('./schema');

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

module.exports = {
  validateNewUser,
  validateNewCategory,
};