const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Bookmarks = Schema ({
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

const BookmarksModel = mongoose.model('Bookmarks', Bookmarks);

module.exports = BookmarksModel;