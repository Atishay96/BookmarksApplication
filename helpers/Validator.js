const __ = require('./Response');

class Validator{
  Validate(req, res, next, array){
      req.error = '';
      arrayOfStrings.map((v, i) => {
          if (req.body[v] === null || req.body[v] === undefined || req.body[v] === '') {
              req.error = "Bad Values";
              console.log('Param missing => ' + req.body[v]);
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