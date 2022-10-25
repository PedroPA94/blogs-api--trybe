const { User } = require('../models');
const { validateNewUser } = require('../validations/validateInputs');

const getByEmail = (email) => User.findOne({ where: { email } });

const createUser = async (newUser) => {
  const validation = await validateNewUser(newUser);
  if (validation.type) return validation;

  const createdUser = await User.create({ ...newUser });
  return { type: null, message: createdUser };
};

module.exports = {
  getByEmail,
  createUser,
};