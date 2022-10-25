const { User } = require('../models');
const { newUserSchema } = require('./schema');

const validateNewUser = async (newUser) => {
  const { error } = newUserSchema.validate(newUser);
  if (error) return { type: 'INVALID_VALUE', message: error.message };

  const existingUser = await User.findOne({ where: { email: newUser.email } });
  if (existingUser !== null) {
    return { type: 'USER_ALREADY_REGISTERED', message: 'User already registered' };
  }

  return { type: null, message: '' };
};

module.exports = {
  validateNewUser,
};