const Joi = require("joi");

const validateUserInfo = (userInfo) => {
  const userSchema = Joi.object({
    userName: Joi.string().required().messages({
      "string.base": "Username must be a string",
      "string.empty": "Username is required",
    }),
    email: Joi.string().email().required().messages({
      "string.base": "Email must be a string",
      "string.email": "Please provide a valid email address",
      "string.empty": "Email is required",
    }),
    fullName: Joi.string().required().messages({
      "string.base": "Full name must be a string",
      "string.empty": "Full name is required",
    }),
    password: Joi.string().min(6).required().messages({
      "string.base": "Password must be a string",
      "string.empty": "Password is required",
      "string.min": "Password must be at least 6 character long",
    }),
    gender: Joi.string().valid("male", "female", "other").required().messages({
      "string.base": "Gender must be a string",
      "string.empty": "Gender is required",
      "any.only":
        "Gender must be one of the following values: male, female, other",
    }),
    dateOfBirth: Joi.date().required().messages({
      "date.base": "Date of birth must be a valid date",
      "date.empty": "Date of birth is required",
    }),
    country: Joi.string().required().messages({
      "string.base": "Country must be a string",
      "string.empty": "Country is required",
    }),
  });

  return userSchema.validate(userInfo);
};

module.exports = { validateUserInfo };
