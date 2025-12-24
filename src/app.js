const express = require('express');
const path = require('node:path');
const homeRouter = require('./routes/home-router');
const gameRouter = require('./routes/game-router');
const genreRouter = require('./routes/genre-router');

const app = express();

// makes possible getting form data through req.body
app.use(express.urlencoded({ extended: true }));
app.use('/', homeRouter);
app.use('/game', gameRouter);
app.use('/genre', genreRouter);

// setting up ejs
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// connecting the CSS to the app
const assetsPath = path.join(__dirname, 'public');
app.use(express.static(assetsPath));

const PORT = 3000;
app.listen(PORT, error => {
  if (error) throw new Error(error);
  console.log('Server running on localhost:3000');
})