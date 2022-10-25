const jwt = require('jsonwebtoken');
const { UserService } = require('../services');
require('dotenv');

const login = async (req, res) => {
  const { email, password } = req.body;
  const secret = process.env.JWT_SECRET;

  if (!email || !password) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  const user = await UserService.getByEmail(email);

  if (!user || user.password !== password) {
    return res.status(400).json({ message: 'Invalid fields' });
  }

  const jwtConfig = {
    expiresIn: '1d',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ data: { email } }, secret, jwtConfig);

  res.status(200).json({ token });
};

module.exports = {
  login,
};