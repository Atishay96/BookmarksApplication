const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Bookmarks = Schema ({
  name:{
    type: String,
    required: true
  },
  user:{
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  tags:[{
    type: String
  }]
},{
	timestamps:true
});

const BookmarksModel = mongoose.model('Bookmarks', Bookmarks);

module.exports = BookmarksModel;