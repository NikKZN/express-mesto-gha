const { celebrate, Joi } = require('celebrate');

const regex = /(http|https):\/\/(www\.)+(\/[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*$)?/;

const signupValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(4),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(regex),
  }),
});

const signinValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports = {
  signupValidation,
  signinValidation,
};
