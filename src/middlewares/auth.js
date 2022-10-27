require('dotenv');
const jwt = require('jsonwebtoken');
const { userService } = require('../services');

module.exports = async (req, _res, next) => {
  const { authorization: token } = req.headers;
  const secret = process.env.JWT_SECRET;

  if (!token) {
    const e = new Error('Token not found');
    e.name = 'TokenNotFound';
    throw e;
  }

  try {
    const { data } = jwt.verify(token, secret);
    const user = await userService.getUserById(data.user.dataValues.id);
    req.user = user.dataValues;
    next();
  } catch (e) {
    e.message = 'Expired or invalid token';
    next(e);
  }
};