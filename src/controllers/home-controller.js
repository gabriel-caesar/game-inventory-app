const { getAllGenres, getAllGames, getGamesByGenre } = require('../db/queries');

exports.homePageGet = async (req, res) => {
  res.render('home', {
    title: 'Home page',
    games: await getAllGames(),
    genres: await getAllGenres(),
    header: 'All games',
    filter: '',
  });
};

exports.homePageGenreGet = async (req, res) => {
  const { genre } = req.query;
  const games = genre === 'All' ? await getAllGames() : await getGamesByGenre(genre);
  if (!games) return res.status(400).redirect('/');
  res.render('home', {
    title: 'Home page',
    games: games,
    genres: await getAllGenres(),
    header: `${genre} games`,
    filter: genre,
  });
}
