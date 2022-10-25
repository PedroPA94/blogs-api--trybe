const jwt = require('jsonwebtoken');
require('dotenv');

module.exports = (payload) => {
  const jwtConfig = {
    expiresIn: '1d',
    algorithm: 'HS256',
  };  
  const secret = process.env.JWT_SECRET;

  const token = jwt.sign({ data: { ...payload } }, secret, jwtConfig);

  return token;
};