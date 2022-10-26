const { authService } = require('../services');
const generateUserToken = require('../utils/generateUserToken');

const validateLogin = async (req, res) => {
  const { email, password } = req.body;

  const user = await authService.validateLogin(email, password);

  const token = generateUserToken({ user });

  res.status(200).json({ token });
};

module.exports = {
  validateLogin,
};