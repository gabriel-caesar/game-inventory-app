const { Router } = require('express');
const {
  createGenrePageGet,
  createGenrePost,
  viewGenreGet,
  updateGenrePageGet,
  updateGenrePost,
  deleteGenrePost,
} = require('../controllers/genre-controller');

const genreRouter = Router();

genreRouter.get('/create', createGenrePageGet);
genreRouter.post('/create', createGenrePost);
genreRouter.get('/view', viewGenreGet);
genreRouter.get('/update/:id', updateGenrePageGet);
genreRouter.post('/update/:id', updateGenrePost);
genreRouter.post('/delete/:id', deleteGenrePost);
genreRouter.get('/', (req, res) => res.redirect('/'));

module.exports = genreRouter;
