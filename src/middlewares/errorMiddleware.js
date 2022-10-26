const errorTypes = {
  MissingValue: 400,
  InvalidValue: 400,
  UserAlreadyRegistered: 409,
};

module.exports = (err, _req, res, _next) => {
  const { name, message } = err;
  const status = errorTypes[name] || 500;

  return res.status(status).json({ message: message || 'Algo inesperado aconteceu!' });
};