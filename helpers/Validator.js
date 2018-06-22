const __ = require('./Response');

class Validator{
  Validate(req, res, next, arrayOfStrings){
      req.error = '';
      console.log(req.body);
      arrayOfStrings.map((v, i) => {
          if (req.body[v] === null || req.body[v] === undefined || req.body[v] === '') {
              req.error = "Bad Values";
              console.log('Param missing => ' + v);
          }
      })
      if (req.error) {
          __.badValues(res);
      } else {
          next();
      }
  }
}

Validator = new Validator();
module.exports = Validator;