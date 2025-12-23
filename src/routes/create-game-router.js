const { Router } = require('express');
const { createGamePageGet } = require('../controllers/create-game-controller');

const createGameRouter = Router();

createGameRouter.get('/', createGamePageGet);

module.exports = createGameRouter