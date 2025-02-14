const Users = require("../models/userModel");
const { customError } = require("../utils/customError");
const { generateToken } = require("../utils/generateToken");
const { validateUserInfo } = require("../utils/validate");

// @desc User registration
// POST/api/users/registration
// @access public

const registerUser = async (req, res, next) => {
  try {
    const userInfo = req.body;

    const { error, value } = validateUserInfo(userInfo);

    if (error) {
      throw customError(400, error?.message);
    }

    const [existingUserName, existingUserEmail] = await Promise.all([
      Users.findOne({ userName: value.userName }),
      Users.findOne({ email: value.email }),
    ]);
    if (existingUserName) {
      throw customError(400, "Username already taken");
    }
    if (existingUserEmail) {
      throw customError(400, "User email already registered");
    }

    const newUser = await Users.create(value);
    const userWithoutPassword = newUser.toObject();
    delete userWithoutPassword.password;
    const response = {
      ...userWithoutPassword,
      token: generateToken(userWithoutPassword._id),
    };

    res.status(200).send({ message: "User registered", data: response });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// @desc User login
// POST/api/users/login
// @access public
const loginUser = async (req, res, next) => {
  try {
    const { email, userName, password } = req.body;
    if (!email && !userName) {
      throw customError(400, "Email or username is required");
    }

    const user = await Users.findOne({ $or: [{ userName }, { email }] });

    console.log(user);

    if (user && (await user.matchPassword(password))) {
      const userWithoutPassword = user?.toObject();
      delete userWithoutPassword.password;

      const response = {
        ...userWithoutPassword,
        token: generateToken(userWithoutPassword._id),
      };

      res
        .status(200)
        .send({ message: "User login successfull", data: response });
    } else {
      throw customError(400, "Invalid credentails");
    }
  } catch (error) {
    next(error);
  }
};

// @desc Search user by username or email
// POST/api/users/search?q=''
// @access private
const searchUser = async (req, res, next) => {
  try {
    const { q } = req.query;
    if (!q) {
      throw customError(400, "Search query is required.");
    }

    const user = await Users.findOne({
      $or: [{ email: { $regex: new RegExp(`^${q}`, "i") } }, { userName: q }],
    }).select("-password");

    if (!user) {
      throw customError(404, "User not found");
    }

    res.status(200).send({ message: "User found", data: user });
  } catch (error) {
    next(error);
  }
};

module.exports = { registerUser, loginUser, searchUser };
