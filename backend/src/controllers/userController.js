const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const asyncHandler = require('express-async-handler'); // This is a wrapper to catch errors from async functions
const logger = require('../../config/logger');
const colors = require('colors');
// @desc   Register a new user
// @route  POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
      res.status(400);
    throw new Error('Please fill in all fields');
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
      res.status(400);
    throw new Error('User already exists');
  }

  // Hash  password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
      const user = await User.create({
          username,
          email,
          password: hashedPassword,
      });

      if (user) {
        res.cookie('userToken', generateToken(user.id), {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
          sameSite: 'none',
          secure: true,
        })

        res.status(201).json({
        _id: user.id,
        username: user.username,
        email: user.email,
    });
  } else {
      res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc   Authenticate user & get token
// @route  POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // check if user email
  const user = await User.findOne({ email }).select('+password'); // Explicitly include the password field

  // check if user and password match
  if (user && (await bcrypt.compare(password, user.password))) {
    res.cookie('userToken', generateToken(user.id), {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
      sameSite: 'lax',
      secure: none,
    })

    logger.debug('userController -> res.cookie.userToken -> : ', res.cookie.userToken);

    res.json({
      _id: user.id,
      username: user.username,
      email: user.email,
    });

  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie(`userToken`, null,  { httpOnly: true, expires: new Date(0) })
  res.status(200).json({ message: 'User logged out successfully' });
})

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc   Get user data
// @route  GET /api/users/me
// @access Private
const getMe = asyncHandler(async (req, res) => {
  const { _id, username, email } = await User.findById(req.user._id);

  res.status(200).json({
    _id,
    username,
    email,
  });
});

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getMe,
};

