// wait for DOM to load before running JS
$(document).on('ready', function() {

  // base API route
  var baseUrl = '/api/posts';

  // array to hold post data from API
  var allPosts = [];

  // element to display list of posts
  var $postsList = $('#posts-list');

  // form to create new post
  var $createpost = $('#create-post');

  // compile handlebars template
  var source = $('#posts-template').html();
  var template = Handlebars.compile(source);

  // helper function to render all posts to view
  // note: we empty and re-render the collection each time our post data changes
  function render() {
    console.log('rendering ', allPosts)
    // empty existing posts from view
    $postsList.empty();

    // pass `allPosts` into the template function
    var postsHtml = template({ posts: allPosts });

    // append html to the view
    $postsList.append(postsHtml);
  };

  // ajax GET all posts on page load
  $.ajax({
    url: baseUrl,
    method: 'GET',
    success: getAllPostsSuccess
  });

  function getAllPostsSuccess(data) {
    // set `allPosts` to post data from API
    allPosts = data.posts;
    // render all posts to view
    render();
  }

  // listen for submit even on new post form
  $createpost.on('submit', function (event) {
    event.preventDefault();

    // serialze form data
    var newpost = $(this).serialize();

    // ajax POST request to create new post
    $.ajax({
      method: 'POST',
      url: baseUrl,
      data: newpost,
      success: createPostSuccess
    });

    // reset the form
    $createpost[0].reset();
    $createpost.find('input').first().focus();
  });

  function createPostSuccess(data) {
    // add new post to `allPosts`
    allPosts.push(data);
    // render all posts to view
    render();
  }

  // add event-handlers for individual posts
  // note the use of an extra argument in jQuery's `on` method
  // to narrow down the targets within $postsList where we want to listen

  // for update: submit event on any `.update-post` form inside $postsList
  $postsList.on('submit', '.update-post', function (event) {
    event.preventDefault();

    // find the post's id (stored in HTML as `data-id`)
    var postId = $(this).closest('.post').attr('data-id');

    // serialze form data
    var updatedPostData = $(this).serialize();

    // PUT request to update post
    $.ajax({
      type: 'PUT',
      url: baseUrl + '/' + postId,
      data: updatedPostData,
      success: updatePostSuccess
    });
  });

  function updatePostSuccess(data) {
    // find the post to update by its id
    var postToUpdate = allPosts.filter(function (p) {
      return p._id === postId;
    })[0];
    // replace post to update with newly updated version (data)
    allPosts.splice(allPosts.indexOf(postToUpdate), 1, data);
    // render all posts to view
    render();
  }

  // for adding a comment to a post: submit event on `.add-comment` form
  $postsList.on('submit', '.add-comment', function (event) {
    // Why do we do this?!
    event.preventDefault();

    // Find the post's id (stored in HTML as `data-id`).
    var postId = $(this).closest('.post').attr('data-id');

    var comment = $(this).serialize();

    // Create a new comment for a Post.
    $.ajax({
      method: 'POST',
      url: baseUrl + "/" + postId + "/comments",
      data: comment,
      success: function addCommentSuccess(data) {
          // Find the post we are caching on the FE, could I do this using reduce instead?
          var post = allPosts.filter(function (p) {
            return p._id === postId;
          })[0];
          // the server sends back the whole post; replace the old one
          allPosts.splice(allPosts.indexOf(post), 1, data);

          // Render all posts to view.
          render();
        }
    });
  });


  // for delete: click event on `.delete-post` button
  $postsList.on('click', '.delete-post', function (event) {
    event.preventDefault();

    // find the post's id (stored in HTML as `data-id`)
    var postId = $(this).closest('.post').attr('data-id');

    // DELETE request to delete post
    $.ajax({
      type: 'DELETE',
      url: baseUrl + '/' + postId,
      success: function deleteSuccess(data) {
          // find the post to delete by its id
          var postToDelete = allPosts.filter(function (post) {
            return post._id == postId;
          })[0];
          // remove deleted post from array of all posts
          allPosts.splice(allPosts.indexOf(postToDelete), 1);
          // render all posts to view
          render();
        }
    });
  });

});
