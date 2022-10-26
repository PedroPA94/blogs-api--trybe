const { userService } = require('../services');
const generateUserToken = require('../utils/generateUserToken');

const createUser = async (req, res) => {
  const newUser = req.body;

  const { password: _, ...user } = await userService.createUser(newUser);

  const token = generateUserToken({ email: user.email });

  res.status(201).json({ token });
};

module.exports = {
  createUser,
};