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

const deleteUser = async (id) => User.destroy({ where: { id } });

module.exports = {
  createUser,
  getUsers,
  getUserById,
  deleteUser,
};