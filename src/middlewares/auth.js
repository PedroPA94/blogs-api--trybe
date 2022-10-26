require('dotenv');
const jwt = require('jsonwebtoken');

module.exports = (req, _res, next) => {
  const { authorization: token } = req.headers;
  const secret = process.env.JWT_SECRET;

  if (!token) {
    const e = new Error('Token not found');
    e.name = 'TokenNotFound';
    throw e;
  }

  try {
    jwt.verify(token, secret);
    next();
  } catch (e) {
    e.message = 'Expired or invalid token';
    next(e);
  }
};