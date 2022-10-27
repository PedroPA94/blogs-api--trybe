const errorTypes = {
  MissingValue: 400,
  InvalidValue: 400,
  UserAlreadyRegistered: 409,
  TokenNotFound: 401,
  JsonWebTokenError: 401,
  UserNotFound: 404,
  CategoryNotFound: 400,
};

module.exports = (err, _req, res, _next) => {
  const { name, message } = err;
  const status = errorTypes[name] || 500;

  return res.status(status).json({ message: message || 'Algo inesperado aconteceu!' });
};