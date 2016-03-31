var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

// configure bodyParser (for receiving form data)
app.use(bodyParser.urlencoded({extended: true}));

// serve static files from public folder
app.use(express.static(__dirname + '/public'));
// app.set('views', __dirname + '/views');

// we can access Post and Comment by calling db.Post and db.Comment respectively
var db = require('./models');


app.get('/', function homePage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// API ROUTES

// get all posts
app.get('/api/posts', function getAllPosts(req, res) {
  // find all posts in db
  db.Post.find({}, function findAllPosts(err, allPosts) {
    //err
    if (err) {return console.log(err)};
    //success
    console.log("Successfully returned all posts: ", allPosts);
    res.json({ posts: allPosts });

  });
});

// create new post
app.post('/api/posts', function createNewPost(req, res) {
  // create new post with form data (`req.body`)
  var newPost = new db.Post(req.body);

  // save new post in db
  newPost.save(function (err, savedPost) {
    //err
    if (err) { return console.log(err); }
    //success
    console.log("Successfully saved a new post: ", savedPost);
    res.json(savedPost);

  });
});

// get one post
app.get('/api/posts/:id', function getOnePost(req, res) {
  // get post id from url params (`req.params`)
  var postId = req.params.id;

  // find post in db by id
  db.Post.findOne({ _id: postId }, function (err, foundPost) {
    if (err) { return console.log(err); }
    //success
    console.log("Successfully found a single post: ", foundPost);
    res.json(foundPost);
  });
});

// update post
app.put('/api/posts/:id', function (req, res) {
  // get post id from url params (`req.params`)
  var postId = req.params.id;

  // find post in db by id
  db.Post.findOne({ _id: postId }, function (err, foundPost) {
    if (err) { return console.log(err); }
    //success
    // update the posts's attributes
    foundPost.title = req.body.title;
    foundPost.body = req.body.body;


    // save updated post in db
    foundPost.save(function (err, savedPost) {
      if (err) { return console.log(err); }
      //success
      console.log("Successfully updated a post: ", savedPost);
      res.json(savedPost);
    });

  });
});

// delete post
app.delete('/api/posts/:id', function (req, res) {
  // get post id from url params (`req.params`)
  var postId = req.params.id;

  // find post in db by id and remove
  db.Post.findOneAndRemove({ _id: postId }, function (err, deletedPost) {
    // err
    if (err) { return console.log(err); }
    // success
    console.log("Succesffully removed the post: " , deletedPost);
    res.json(deletedPost);

  });
});

// Create a comment associated with a post.
app.post('/api/posts/:post_id/comments', function createComment(req, res) {
  // Get post id from url params (`req.params`), notice the name is changed?
  var postId = req.params.post_id;

  // Create new comment with form data (`req.body`).
  var newComment = new db.Comment(req.body);

  // Save new comment in db.
  newComment.save(function addCommentToPost(err, savedComment) {
    if (err) { return console.log(err)}
      // Find a post by that ID and then update it to include the new comment. Why would I add it as a set instead of push to it as an array?

    db.Post.findOne( { _id: postId }, function pushComment(err, foundPost) {
      if (err) { return console.log(err); }
      foundPost.comments.push(savedComment);

      foundPost.save(function sendPostBack(err, commentedPost) {
        if (err) { return console.log(err); }
        console.log("Successfully added Comment to Post: ",commentedPost);
        console.log("Created at: " + commentedPost._id);
        res.status(201).json(commentedPost);

      })

    });

  });
});


// listen on port 3000
app.listen(3000, function() {
  console.log('server started');
});
