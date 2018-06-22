const express = require('express');
const app = express.Router();
const UserController = require('../controllers/UserController');
const Auth = require('../helpers/Auth');
const Validator = require('../helpers/Validator');

//for loggin in the user
app.post('/login', (req, res, next) => { Validator.Validate(req, res, next, ['email', 'password']) }, (req, res) => {
    UserController.login(req, res);
});

//for signing up the user
app.post('/signUp', (req, res, next) => { Validator.Validate(req, res, next, ['email', 'password', 'name']) }, (req, res) => {
  UserController.signUp(req, res);
})

module.exports = app;