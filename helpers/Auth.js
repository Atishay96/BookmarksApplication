const __ = require('../helpers/Response').default;

class Auth{
  async authMiddleware(req, res) {
    try {
      
    } catch (err) {
      __.errorInternal(err, res);
    }
  }
}

Auth = new Auth();
module.exports = Auth;