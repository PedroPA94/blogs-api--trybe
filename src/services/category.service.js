const { Category } = require('../models');
const { validateNewCategory } = require('../validations/validateInputs');

const createCategory = async (name) => {
  validateNewCategory(name);
  return Category.create({ name });
};

const getCategories = async () => Category.findAll();

module.exports = {
  createCategory,
  getCategories,
};