//COMMENTS DB model
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
  body: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: false
  },
  time: {
    type: Date,
    require: true
  }
})

var Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
