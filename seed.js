var mongoose = require('mongoose');
var db = require('./models');


db.Post.remove({}, function RemoveAllPosts(err, removedPosts) {
  if (err) { return console.log(err); }
  //success
  console.log("Successfully removed all posts: ", removedPosts);
})
