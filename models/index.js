// MODEL Wrangler
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/express-microblog');

module.exports.Comment = require('./comment.js');
module.exports.Post = require('./post.js');
