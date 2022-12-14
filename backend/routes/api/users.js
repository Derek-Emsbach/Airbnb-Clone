const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { User, Spot, Review, Booking, Image, sequelize, } = require('../../db/models');
const { Op } = require("sequelize");


const router = express.Router();

const validateSignup = [
  check('firstName')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a first name.'),
  check('lastName')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a last name.'),
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];

// Sign up
router.post(
  '/',
  validateSignup,
  async (req, res) => {
    const { firstName, lastName, email, username, password} = req.body;

    const checkUserName = await User.findOne({ where: {username} })
    const checkEmail = await User.findOne({ where: {email} })

    if(checkUserName) {
      return res.status(403).json({
        "message": "User already exists",
        "statusCode": 403,
        "errors": {
          username: "User with that username already exists"
        }
      })
    }

    if(checkEmail) {
      return res.status(403).json({
        "message": "User already exists",
        "statusCode": 403,
        "errors": {
          "email": "User with that email already exists"
        }
      })
    }


    const user = await User.signup({ firstName, lastName, email, username, password });

   
    await setTokenCookie(res, user);

    return res.json({
      user
    });
  }
);





module.exports = router;
