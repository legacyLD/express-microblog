// MODEL Wrangler
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/express-microblog');

module.exports.Post = require('./post.js');
