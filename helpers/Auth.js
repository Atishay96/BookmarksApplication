const __ = require('../helpers/Response');
const jwt = require('jsonwebtoken');
require('dotenv').config();

//models
const User = require('../models/User');

class Auth{
  async authMiddleware(req, res, next) {
    try {
      let token = req.headers['authtoken'];
			if(!token || token === 'null'){
				return __.sessionExpired(res);
      }
      console.log(token);
      let temp = jwt.verify(token, process.env.randomKey);
      console.log(temp)
			let user = await User.findOne({_id:temp._id, lastLoggedIn: temp.lastLoggedIn});
			if(!user) {
				return __.sessionExpired(res);
			}
      console.log('User Logged in. email ->' + user.email);
      req.user = user;
			next();
    } catch (err) {
      __.errorInternal(err, res);
    }
  }
}

Auth = new Auth();
module.exports = Auth;