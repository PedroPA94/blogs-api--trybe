const { User } = require('../models');
const { validateNewUser } = require('../validations/validateInputs');

const createUser = async (newUser) => {
  await validateNewUser(newUser);
  return User.create({ ...newUser });
};

const getUsers = async () => User.findAll({ attributes: { exclude: 'password' } });

const getUserById = async (id) => User.findOne({
  where: { id },
  attributes: { exclude: 'password' },
});

module.exports = {
  createUser,
  getUsers,
  getUserById,
};