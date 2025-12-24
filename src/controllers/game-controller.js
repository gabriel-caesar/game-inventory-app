const {
  getAllGenres,
  createNewGame,
  getGame,
  updateGame,
  deleteGame,
} = require('../db/queries');
const { body, validationResult, matchedData } = require('express-validator');

const validateGame = [
  body('game_name')
    .trim()
    .matches(/^[A-Za-z\d\s]+$/)
    .withMessage('Game name needs to have only letters and numbers')
    .isLength({ min: 4, max: 35 })
    .withMessage('Game name needs to be between 4 and 35 letters long'),
  body('developer')
    .trim()
    .matches(/^[A-Za-z\s]+$/)
    .withMessage('Developer name needs to have only letters and numbers')
    .isLength({ min: 4, max: 35 })
    .withMessage('Developer name needs to be between 4 and 35 letters long'),
  body('genre_id')
    .trim()
    .custom((val) => val !== 'null')
    .withMessage('Please, choose a game genre'),
];

exports.createGamePageGet = async (req, res) => {
  res.render('create-game', {
    title: 'Create game',
    genres: await getAllGenres(),
    errors: [],
    matchedData: {},
  });
};

exports.createGamePost = [
  validateGame,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render('create-game', {
        title: 'Create game',
        errors: errors.array(),
        genres: await getAllGenres(),
        matchedData: req.body,
      });
    }
    const { game_name, developer, genre_id } = matchedData(req);
    await createNewGame(game_name, genre_id, developer);
    res.redirect('/');
  },
];

exports.updateGameGet = async (req, res) => {
  const { id } = req.params;
  const gameQuery = await getGame(id);
  const game = gameQuery[0];
  if (!game) throw new Error(`Couldn't get game`);
  res.render('update-game', {
    title: `Update ${game.name}`,
    game: game,
    genres: await getAllGenres(),
    matchedData: [],
    errors: [],
  });
};

exports.updateGamePost = [
  validateGame,
  async (req, res) => {
    const { id } = req.params;
    const gameQuery = await getGame(id);
    const game = gameQuery[0];
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render('update-game', {
        title: `Update ${game.name}`,
        game: game,
        genres: await getAllGenres(),
        matchedData: req.body,
        errors: errors.array(),
      });
    }
    const { game_name, developer, genre_id } = matchedData(req);
    await updateGame(game_name, genre_id, developer, id);
    res.redirect('/');
  },
];

exports.deleteGamePost = async (req, res) => {
  const { id } = req.params;
  await deleteGame(id);
  res.redirect('/');
}
