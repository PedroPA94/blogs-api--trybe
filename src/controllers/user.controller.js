const { UserService } = require('../services');
const errorMap = require('../utils/errorMap');
const generateUserToken = require('../utils/generateUserToken');

const createUser = async (req, res) => {
  const newUser = req.body;

  const { type, message } = await UserService.createUser(newUser);
  if (type) return res.status(errorMap.mapError(type)).json({ message });

  const token = generateUserToken({ email: message.email });

  res.status(201).json({ token });
};

module.exports = {
  createUser,
};