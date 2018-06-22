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

//get all bookmarks
app.get('/bookmarks', (req, res) => {
  UserController.getAllBookmarks(req, res);
})

// add/edit bookmark
app.put('/bookmark', (req, res) => {
  UserController.addBookmark(req, res);
})

// delete bookmark
app.delete('/bookmark', (req, res) => {
  UserController.deleteBookmark(req, res);
})

module.exports = app;