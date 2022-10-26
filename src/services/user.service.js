const { User } = require('../models');
const { validateNewUser } = require('../validations/validateInputs');

const createUser = async (newUser) => {
  await validateNewUser(newUser);
  return User.create({ ...newUser });
};

module.exports = {
  createUser,
};