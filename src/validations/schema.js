const Joi = require('joi');

const newUserSchema = Joi.object({
  displayName: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  image: Joi.string(),
});

const categoryNameSchema = Joi.object({
  name: Joi.string().required(),
});

const newPostSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  categoryIds: Joi.array().items(Joi.number().integer()).required(),
});

module.exports = {
  newUserSchema,
  categoryNameSchema,
  newPostSchema,
};