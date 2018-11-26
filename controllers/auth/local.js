/**
 * Controller responsible for handling the logic for Local login
 * (standard login with password, forgot & register)
 */

 'use strict';

 const passport          = require('passport');
 const bcrypt            = require('bcrypt');
 const saltRounds        = 10;
 const hat               = require('hat');
 const login             = require('connect-ensure-login');
 const User              = require('../../models').User;
 const tokenUrl          = require('../../services/tokenUrl');
 const emailService      = require('../../services/email');

 /**
  * Render the index.html or index-with-code.js depending on if query param has code or not
  * @param   {Object} req - The request
  * @param   {Object} res - The response
  * @returns {undefined}
  */
 exports.index = (req, res) => {
   if (req.user) {
     res.redirect('/account');
   } else {
     res.redirect('/login');
   }
 };

/**
 * Render the login.html
 * @param   {Object} req - The request
 * @param   {Object} res - The response
 * @returns {undefined}
 */

exports.login = (req, res) => {
  res.render('auth/login');
};

exports.register = (req, res) => {
  res.render('auth/register');
};

exports.forgot = (req, res) => {
  res.render('auth/forgot');
};

exports.reset = (req, res) => {
  res.render('auth/reset', {
    token: req.query.token
  });
};

exports.postRegister = (req, res, next) => {
  const errors = [];
  const { email } = req.body;

  //if (req.user) {
//    errors.push('Er bestaat al een account voor deze email');
//  }

  if (errors.length === 0) {
    password = bcrypt.hashSync(password, saltRounds);

    new User({ firstName, lastName, email, password })
    .save()
    .then(() => {
      res.redirect('/login');
    })
    .catch((err) => { next(err) });
  } else {
    req.flash('error', { errors });
    res.redirect('/register');
  }
}

/**
 * Authenticate normal login page using strategy of authenticate
 */
exports.postLogin = [
  passport.authenticate('local', { successReturnToOrRedirect: '/', failureRedirect: '/login' }),
];

exports.postReset = (req, res, next) => {

}

exports.postForgot = (req, res, next) => {

}