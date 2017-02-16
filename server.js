var express = require('express'),
    bodyParser = require('body-parser');
    // db = require('models');

var app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function homepage (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});
/*
 * JSON API Endpoints
 */
// app.get('/api', controllers.api.index);
// app.get('/api/albums', controllers.albums.index);
// app.get('/api/albums/:albumId', controllers.albums.show);
// app.post('/api/albums', controllers.albums.create);
// app.delete('/api/albums/:albumId', controllers.albums.destroy);
// app.put('/api/albums/:albumId', controllers.albums.update);
// app.post('/api/albums/:albumId/songs', controllers.albumsSongs.create);
// app.get('/api/albums', controllers.albums.index);
// app.get('/api/albums/:albumId', controllers.albums.show);
// app.post('/api/albums', controllers.albums.create);
// app.delete('/api/albums/:albumId', controllers.albums.destroy);
// app.post('/api/albums/:albumId/songs', controllers.albumsSongs.create);
// app.get('/api/albums', controllers.albums.index);
// app.get('/api/albums/:albumId', controllers.albums.show);
// app.post('/api/albums', controllers.albums.create);
// app.delete('/api/albums/:albumId', controllers.albums.destroy);
// app.put('/api/albums/:albumId', controllers.albums.update);
// app.get('/api/albums/:albumId/songs', controllers.albumsSongs.index);
// app.post('/api/albums/:albumId/songs', controllers.albumsSongs.create);
// app.delete('/api/albums/:albumId/songs/:songId', controllers.albumsSongs.destroy);
// app.put('/api/albums/:albumId/songs/:songId', controllers.albumsSongs.update);

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});
