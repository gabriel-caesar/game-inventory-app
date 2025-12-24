const { body, validationResult, matchedData } = require('express-validator');
const {
  createNewGenre,
  getAllGenres,
  getGenre,
  updateGenre,
  deleteGenre,
} = require('../db/queries');
const { normalizeString } = require('../utils/functions');

const validateGenre = [
  body('genre_name')
    .trim()
    .matches(/^[A-Za-z\s]+$/)
    .withMessage('Genre name needs to have only letters')
    .isLength({ min: 4, max: 25 })
    .withMessage('Genre name needs to be between 4 and 25 letters long'),
];

exports.createGenrePageGet = async (req, res) => {
  res.render('create-genre', { title: 'Create genre', errors: [], genres: [] });
};

exports.createGenrePost = [
  validateGenre,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render('create-genre', {
        title: 'Create genre',
        errors: errors.array(),
        genres: [],
      });
    }
    const { genre_name } = matchedData(req);
    const normalizedGenreName = normalizeString(genre_name); // formats the name appropriately
    await createNewGenre(normalizedGenreName);
    res.redirect('/');
  },
];

exports.viewGenreGet = async (req, res) => {
  res.render('view-genres', {
    title: 'View genres',
    genres: await getAllGenres(),
  });
};

exports.updateGenrePageGet = async (req, res) => {
  const { id } = req.params;
  const genreQuery = await getGenre(id);
  const genre = genreQuery[0];
  if (!genre) throw new Error(`Couldn't get genre with id ${id}`);
  res.render('update-genre', {
    title: `Update ${genre.name}`,
    errors: [],
    genre: genre,
  });
};

exports.updateGenrePost = [
  validateGenre,
  async (req, res) => {
    const { id } = req.params;
    const genreQuery = await getGenre(id);
    const genre = genreQuery[0];
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render('update-genre', {
        title: `Update ${genre.name}`,
        errors: errors.array(),
        genre: genre,
      });
    }
    const { genre_name } = matchedData(req);
    const normalizedGenreName = normalizeString(genre_name); // formats the name appropriately
    await updateGenre(normalizedGenreName, id);
    res.redirect('/genre/view');
  },
];

exports.deleteGenrePost = async (req, res) => {
  const { id } = req.params;
  await deleteGenre(id);
  res.redirect('/');
}