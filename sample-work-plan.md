# Sample Work Plan

It's hard to know how to approach a full-stack project when you've only been working with some of these tools for a few days.  

<img src="http://3.bp.blogspot.com/_Eiwce13X738/TRIoYJgWTUI/AAAAAAAAJEk/PGOtRyA304k/s1600/How_to_Draw_Owl.jpg" alt="two steps to draw an owl - draw a circle, draw the rest of the owl">

This work plan is intended to give you a sample way you might approach the problem.

##Plan your app's routes and data structures.

Reference Lesson: Express Routes and Params, Todo Lab, Intro Mongoose


##Start the server.

Reference Lesson: Express Hello World

1. Initialize your app with `npm init`. Give it the entry point `server.js`.

1. Use `npm install --save` to add express, body-parser, and mongoose.

1. Create your server file from the Terminal (`touch server.js`). At the top of your server.js file, require the express and body-parser modules to get started.  Use `express()` to create your `app` object.

1. At the bottom of your server.js file, use `app.listen` to set up your server to listen on a port. We usually use port 3000.

1. Run `node server.js`, `npm start`, or `nodemon` in the Terminal to start your server. If you gave `app.listen` a callback with a log message, you should see the log message in your Terminal.

1. Go to localhost:3000/ to see another message that lets you know your server is listening (but a bit unhappy).

1. In your server code, between the `require`s and the `app.listen`, start a section for routes!  Create a route to handle GET requests at the `/` path. Use a simple `res.send` to send a message that the route is working. Restart your server, reload the page, and you should see the message you sent as a response. Yay!

1. Add and commit your changes, and make a push to your github account.

##Add client-side code.

Reference Lesson: <a href="https://github.com/sf-wdi-22-23/modules/tree/master/w03-intro-backend-with-express/d1-dawn-express-hello-world" >Express Hello World</a>

1. Create a folder called `views` in the root directory of your express app.  Add an `index.html` in the `views` folder.  

1. In your server code, after your `require`s, start a section for routes.

1. Update your app's `GET /` route to render index.html as its response.

2. Create a folder called `public` in the root directory of your Express app.  Add a main javascript file (we've usually called ours `app.js`) and a main css file (like `styles.css`). Put some sanity check code in each, like a log message in `app.js` and a fun background in `styles.css`.

3. In your server code's config section, configure your app to serve the static assets from your `public` directory with `express.static`. This makes everything in `public` available to your client side just as if it were in the same directory as `index.html`.

1. Restart your server, and check out your page in the browser. You should see your sanity check style and message. But if you see an error in your console, recheck the `href` for the `<link>` for your css, or the `src` for your `<script>` for your javascript.

1. If you haven't yet, make a new git commit. Give it a descriptive commit message like `"start client-side code"`.

##Improve the view.

Reference Lesson: Handlebars Templating

1. Add your app's basic structure to `index.html`. If you didn't make a wireframe before, now is definitely the time!

1. Add a template to your `index.html` to display the posts. You can start with hard-coded html and sample data to test out what the structure will look like when it's filled in, then translate to a Handlebars template.

1. Add code to your client-side javascript to select the source for your template, and compile it with `Handlebars.compile`.  Test out the `template` function you generate by having it temporarily render some sample data.


##Add event listeners.

Reference Lessons: DOM Events, AJAX/Giphy

1. In your client-side JavaScript, create the main event handlers you expect to need. For example, you'll probably want a `submit` event handler for any forms.  You can start by having each event handler log a simple message like "new post form submitted!"  Remember to check your selectors in the console before you add event handlers.

1. You'll eventually need event listeners for delete buttons, update forms, etc. These kinds of elements might get added to the DOM after the DOM initially loads, but you can use event delegation to set listeners up on them from the start. That means: add the event listener to a DOM element higher in the DOM tree (like the list of posts or the document itself), and use a selector to filter down which DOM elements actually trigger the function (more info can be found in the [jQuery `on` method documentation](http://api.jquery.com/on/#direct-and-delegated-events)).

1. Add an AJAX request to each event handler that needs one. Your requests should use a RESTful route (HTTP method + path). The request for your new post form should send along the form data required. See some examples from <a href="http://api.jquery.com/jquery.ajax/#entry-examples" > the jQuery docs</a>.

1. The request for your delete buttons probably doesn't have an `id` to use yet. Update your template in `index.html` so that each post has its id stored with it in the HTML.  Try adding a `data-` attribute in the HTML and retrieving it with [jQuery's `.data` method](https://api.jquery.com/data/#data2).

1. In the `success` method of your AJAX requests, just `console.log` the server's response for now. If you're following this plan in order, setting up the server routes is next.

1. If you haven't yet, make a new git commit. Give it a descriptive commit message.

##Add routes to the server.

Reference Reading: REST Reading and exercises

1. Since your client-side event handlers are going to make AJAX requests, let's tell the server to expect those kinds of requests.  In the routes section of your server code, add skeletons for all of the RESTful routes listed in the requirements in the README.

1. Don't fully fill in the function that says how the server should respond to each type of request, just start with a comment that says how the route *will* respond when you're done, and a `res.status(200).send('message')` with a more helpful message!  Note what if any data you expect to access from `req.params`, `req.body`, or `req.query`.

1. You've probably planned to take some form data from `req.body`, so `require` and configure body-parser near where you set up your `app` variable.

1. Test your routes to see that you get back the messages you expect.

1. Make another new commit.

##Move data to the database.

Reference Lesson: Intro Mongoose

We could get by with all our database code in `server.js`. But, as our apps grow and get more complex, we'll want to make our code more modular. The examples we've seen, with `/models/index.js` and `models/book.js` (etc.) are built to be modular and work well as we grow.  This plan follows that format.

1. Create a `models` directory in the root directory of your Express project. Inside the `models` directory, create an `index.js` file. The `index.js` file should require mongoose and connect to your app's mongo database.

1. Create a `post.js` file in the `models` directory. In the `post.js` file, set up a schema and a model for posts. Set `post.js`'s `module.exports` to be the Post model.

1. Modify `models/index.js` to have it incorporate your Post model.  It will need to:
    - require your model from the other file
    - add your model to `index.js`'s `module.exports`, probably as just one part of the exports object

1. Optional: Create a `seed.js` file. In this file, create a simple array of seed data that matches the format you laid out in your schema. Then, use the post model to remove all posts from the database and create all the posts from your seed data again. Because the seed file needs to manipulate data in your database, it will need to require your models: `var db = require("./models")`.

1. This seems like a great time for a commit.

##Connect database to server routes.

Reference: Intro Mongoose

1. In your server code, with the other `require`s, add one to bring in your database models: `var db = require("./models")`. When we `require` a whole folder, Node looks for an `index.js` in that folder and basically requires it.  So, requiring the models folder should make your post model (and any other models you eventually add) available on a `db` object. For example, the Post model is `db.Post`. (It also runs all of the code in your `index.js` - including the line there that connects us to the database.)

1. Modify your `GET '/'` route to  `console.log` all of the post data from the database. (Make sure you have `mongod` running.) Test this in Postman. Since your browser automatically makes a GET request when you visit a url, you could also test this by going to `localhost:3000/` in your browser. Check the Terminal for your server-side console log.

1. Update your `GET '/api/posts'` route to send the data from your database. Test in your browser and see if you get a console log of the response.

1. Once that's working, make a new commit! Give it a descriptive message like "sending data from database" or "full stack woohoo.".

1. Fill in the `POST '/api/posts'` skeleton API route you created earlier. Test it with Postman.

1. One by one, fill in the other skeleton routes you created. **Test each route with Postman** before you try to request it from your client.

1. Make another new commit if you haven't yet.

##Use server responses on the client!

At this point, the server should be sending the data you need, but if you're following the instructions in order, you're just logging those responses to the console in the browser.

1. Modify the code in your new post form submit event handler so that it takes the server's response and uses it to add a new post to the page with jQuery and HTML strings.

1. Reminder: make a new commit.

1. Modify the code in your delete button click event handler so that it uses jQuery to delete the post from the page once it successfully gets the server's response.

1. Make a new commit.
