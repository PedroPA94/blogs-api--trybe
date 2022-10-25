const { UserService } = require('../services');
const generateUserToken = require('../utils/generateUserToken');

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  const user = await UserService.getByEmail(email);

  if (!user || user.password !== password) {
    return res.status(400).json({ message: 'Invalid fields' });
  }

  const token = generateUserToken({ email });

  res.status(200).json({ token });
};

module.exports = {
  login,
};