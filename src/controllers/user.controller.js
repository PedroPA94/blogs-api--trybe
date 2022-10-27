const { userService } = require('../services');
const generateUserToken = require('../utils/generateUserToken');

const createUser = async (req, res) => {
  const newUser = req.body;

  const { password: _, ...user } = await userService.createUser(newUser);

  const token = generateUserToken({ email: user.email });

  res.status(201).json({ token });
};

const getUsers = async (_req, res) => {
  const users = await userService.getUsers();
  res.status(200).json(users);
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await userService.getUserById(id);

  if (user === null) {
    const e = new Error('User does not exist');
    e.name = 'UserNotFound';
    throw e;
  }

  res.status(200).json(user);
};

const deleteUser = async (req, res) => {
  const { id } = req.user;
  const deleted = await userService.deleteUser(id);
  if (deleted !== 1) throw new Error();
  res.status(204).end();
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  deleteUser,
};