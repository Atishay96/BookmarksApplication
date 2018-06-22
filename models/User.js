const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
const Users = Schema ({
  name:{
    type: String,
    default: ''
  },
	email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
   required: true
  },
  bookmarks:[{
    type: Schema.Types.ObjectId,
    ref: ''
  }],
  lastLoggedIn: {
    type: Date,
    default: new Date()
  }
},{
	timestamps:true
});

Users.methods.generateHash = (password)=>{
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

Users.methods.verifyPassword = function(password){
  let user = this;
  return bcrypt.compareSync(password, user.password);
};

const UserModel = mongoose.model('User', Users);


module.exports = UserModel;