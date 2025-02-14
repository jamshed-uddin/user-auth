const Joi = require("joi");
const User = require("../models/userModel");

const registerUser = async (req, res, next) => {
  try {
    const userInfo = req.body;
    const validate = Joi.object({
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
      gender: Joi.string()
        .valid("male", "female", "other")
        .required()
        .messages({
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

    const { error, value } = validate(userInfo);
    if (error) {
      throw error;
    }

    const newUser = await User.create(value);
    res.status(200).send({ message: "User registered", data: newUser });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

const searchUser = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

module.exports = { registerUser, loginUser, searchUser };
