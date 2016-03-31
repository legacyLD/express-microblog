//POSTS DB Model
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Comment = require("./comment.js");

var PostSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  mood: {
    type: String,
    required: false
  },
  tags: {
    type: [String],
    required: false
  },
  // adding embedded comments relationship to Post
  comments: {
    type: [Comment.schema],
    required: false
  }
})

var Post = mongoose.model("Post", PostSchema);

module.exports = Post;
