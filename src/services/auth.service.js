const { User } = require('../models');

const validateInputs = (email, password) => {
  if (!email || !password) {
    const e = new Error('Some required fields are missing');
    e.name = 'MissingValue';
    throw e;
  }
};

const validateUser = async (email, password) => {
  const user = await User.findOne({ where: { email } });

  if (!user || user.password !== password) {
    const e = new Error('Invalid fields');
    e.name = 'InvalidValue';
    throw e;
  }

  return user;
};

const validateLogin = async (email, password) => {
  validateInputs(email, password);
  const { password: _, ...restOfUser } = await validateUser(email, password);
  return restOfUser;
};

module.exports = {
  validateLogin,
};