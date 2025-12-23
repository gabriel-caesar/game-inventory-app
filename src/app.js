const express = require('express');
const path = require('node:path');
const homeRouter = require('./routes/home-router');
const createGameRouter = require('./routes/create-game-router');
const createGenreRouter = require('./routes/create-genre-router');

const app = express();

app.use('/', homeRouter);
app.use('/create-game', createGameRouter);
app.use('/create-genre', createGenreRouter);

// setting up ejs
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// connecting the CSS to the app
const assetsPath = path.join(__dirname, 'public');
app.use(express.static(assetsPath));

// makes possible getting form data through req.body
app.use(express.urlencoded({ extended: true }));

const PORT = 3000;
app.listen(PORT, error => {
  if (error) throw new Error(error);
  console.log('Server running on localhost:3000');
})