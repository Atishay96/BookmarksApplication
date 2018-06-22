const express = require('express');
const app = express.Router();
const UserController = require('../controllers/UserController');
const Auth = require('../helpers/Auth');
const Validator = require('../helpers/Validator');
const __ = require('../helpers/Response');
//for loggin in the user
app.post('/login', (req, res, next) => {
  Validator.Validate(req, res, next, ['email', 'password'])
}, (req, res) => {
  UserController.login(req, res);
});

//for signing up the user
app.post('/signUp', (req, res, next) => {
  Validator.Validate(req, res, next, ['email', 'password', 'name'])
}, (req, res) => {
  UserController.signUp(req, res);
})

//get all bookmarks
app.get('/bookmarks', Auth.authMiddleware, (req, res) => {
  UserController.getAllBookmarks(req, res);
})

// add/edit bookmark
app.put('/bookmark', Auth.authMiddleware, (req, res, next) => {
  Validator.Validate(req, res, next, ['url', 'title', 'tags'])
}, (req, res) => {
  UserController.addBookmark(req, res);
})

// delete bookmark
app.post('/deleteBookmark', Auth.authMiddleware, (req, res, next) => {
  Validator.Validate(req, res, next, ['_id'])
}, (req, res) => {
  UserController.deleteBookmark(req, res);
})

//search tags
app.post('/searchTags', Auth.authMiddleware, (req, res) => {
  UserController.searchTags(req, res);
})


app.get('/verifyToken', Auth.authMiddleware, (req, res) => {
  return __.message(res, 200, "Token Valid");
})
module.exports = app;