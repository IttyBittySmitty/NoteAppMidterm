import User from '../models/userModel.js';
import { body, validationResult } from 'express-validator';

export const registerForm = (req, res) => {
  res.render('register', { title: 'Register' });
};

export const loginForm = (req, res) => {
  res.render('login', { title: 'Login' });
};

export const validateRegister = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('You must supply a name!'),
  body('email')
    .isEmail()
    .withMessage('That Email is not valid!')
    .normalizeEmail({
      gmail_remove_dots: false,
      remove_extension: false,
      gmail_remove_subaddress: false
    }),
  body('password')
    .notEmpty()
    .withMessage('Password Cannot be Blank!'),
  body('password-confirm')
    .notEmpty()
    .withMessage('Confirmed Password cannot be blank!')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Oops! Your passwords do not match');
      }
      return true;
    }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.flash('error', errors.array().map(err => err.msg));
      res.render('register', { 
        title: 'Register', 
        body: req.body, 
        flashes: req.flash() 
      });
      return;
    }
    next();
  }
];

export const register = async (req, res, next) => {
  const user = new User({ email: req.body.email, name: req.body.name });
  await User.register(user, req.body.password);
  next();
}; 