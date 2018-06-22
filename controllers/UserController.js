const __ = require('../helpers/Response');
const jwt = require('jsonwebtoken');
//models
const User = require('../models/User');
const Bookmarks = require('../models/Bookmarks');

class UserController {
  async login(req, res) {
    try {
      let user = await User.findOne({
        email: req.body.email.toLowerString()
      });
      if (!user)
        return __.notFound(res, 'No User Registered with this email');
      let verifyPassword = await user.verifyPassword(req.body.password);
      console.log('password -> ' + verifyPassword);
      if (!verifyPassword)
        return __.notAuthorized(res, 'Wrong Password');
      user.lastLoggedIn = new Date();
      let userNew = await user.save();
      let tempNew = {
        _id: userNew._id,
        lastLoggedIn: userNew.lastLoggedIn
      }
      //generating token
      let token = jwt.sign(tempNew, process.env.randomKey);
      let final = {
        token,
        name
      }
      return __.success(res, token, 'Successfully logged in');
    } catch (err) {
      __.errorInternal(err, res);
    }
  }
  async signUp(req, res) {
    try {
      let check = await User.findOne({
        email: req.body.email.toLowerString()
      }).select('email').lean();
      if (check)
        return __.notAuthorized(res, 'Email is already taken. Please try with some other email');
      let temp = {
        email: req.body.email,
        name: req.body.name
      };
      let userData = new User(temp);
      userData.password = await userData.generateHash(req.body.password);
      let userNew = await userData.save();
      let tempNew = {
        _id: userNew._id,
        lastLoggedIn: userNew.lastLoggedIn
      }
      //generating token
      let token = jwt.sign(tempNew, process.env.randomKey);
      userNew = userNew.toObject();
      userNew.authToken = token;
      delete userNew['password'];
      let final = {
        token,
        name
      }
      return __.success(res, token, "Successfully Signed up");
    } catch (err) {
      __.errorInternal(err, res);
    }
  }
  async getAllBookmarks(req, res, status) {
    try {
      let bookmarks = await Bookmarks.find({ user: req.user._id }).select('name bookmarks').sort({ createdAt: -1 }).lean();
      let message = 'List displayed';
      if(status === 1) message = 'Bookmark succesfully added';
      if(status === 2) message = 'Bookmark succesfully updated';
      if(status === 3) message = 'Bookmark succesfully deleted';
      return __.success(res, bookmarks, message);
    } catch (err) {
      __.errorInternal(err, res);
    }
  }
  async addBookmark(req, res){
    try {
      if(req.body._id){
        return this.editBookmark(req, res);
      }
      let temp = {};
      temp.name = req.body.name;
      temp.user = req.user._id;
      let book = await Bookmarks.create(temp);
      return this.getAllBookmarks(req, res, 1);
    } catch(err) {
      __.errorInternal(err, res);
    }
  }
  async editBookmark(req, res){
    try {
      let book = await Bookmarks.findOneAndUpdate({ _id: req.body._id }, { name: req.body.name });
      if(!book)
        return __.notFound(res, 'Wrong Book id');
      return this.getAllBookmarks(req, res, 2);
    } catch(err) {
      __.errorInternal(err, res);
    }
  }
  async deleteBookmark(req, res){
    try {
      let book = await Bookmarks.findOne({ _id: req.body._id }, { name: req.body.name }).remove().exec();
      return this.getAllBookmarks(req, res, 3);
    } catch(err) {
      __.errorInternal(err, res);
    }
  }
}

UserController = new UserController();
module.exports = UserController;