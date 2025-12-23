const { Router } = require('express');
const { createGenrePageGet } = require('../controllers/create-genre-controller');

const createGenreRouter = Router();

createGenreRouter.get('/', createGenrePageGet);

module.exports = createGenreRouter