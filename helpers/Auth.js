const __ = require('../helpers/Response').default;
require('dotenv').config();

class Auth{
  async authMiddleware(req, res) {
    try {
      let token = req.headers['authtoken'];
			if(!token){
				return __.sessionExpired(res);
			}
			let temp = jwt.verify(token, process.env.randomKey);
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