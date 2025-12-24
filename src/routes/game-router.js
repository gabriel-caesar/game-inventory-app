const { Router } = require('express');
const {
  createGamePageGet,
  createGamePost,
  updateGameGet,
  updateGamePost,
  deleteGamePost,
} = require('../controllers/game-controller');

const gameRouter = Router();

gameRouter.get('/create', createGamePageGet);
gameRouter.post('/create', createGamePost);
gameRouter.get('/update/:id', updateGameGet);
gameRouter.post('/update/:id', updateGamePost);
gameRouter.post('/delete/:id', deleteGamePost);
gameRouter.get('/', (req, res) => res.redirect('/'));

module.exports = gameRouter;
