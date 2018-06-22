const __ = require('../helpers/Response');
const jwt = require('jsonwebtoken');

//models
const User = require('../models/User');

class UserController{
  async login(req, res) {
    try {
      let user = await User.findOne({ email : req.body.email.toLowerString() });
      if (!user)
        return __.notFound(res, 'No User Registered with this email');
      let verifyPassword = await user.verifyPassword(req.body.password);
      console.log('password -> ' + verifyPassword);
      if(!verifyPassword)
        return __.notAuthorized(res, 'Wrong Password');      
      user.lastLoggedIn = new Date();
      let userNew = await user.save();
      let tempNew = {
        _id: userNew._id,
        lastLoggedIn: userNew.lastLoggedIn
      }
      //generating token
      let token = jwt.sign(tempNew, process.env.randomKey);
      let final = {token, name}
      return __.success(res, token, 'Successfully logged in');
    } catch(err) {
      __.errorInternal(err, res);
    }
  }
  async signUp(req, res) {
    try {
      let check = await User.findOne({email: req.body.email.toLowerString()}).select('email').lean();
      if(check)
        return __.notAuthorized(res, 'Email is already taken. Please try with some other email');
        let temp = { email: req.body.email, name: req.body.name };      
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
        let final = {token, name}
        return __.success(res, token, "Successfully Signed up");
    } catch(err) {
      __.errorInternal(err, res);
    }
  }
}

UserController = new UserController();