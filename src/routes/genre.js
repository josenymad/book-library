const express = require('express');
const {
  addGenre,
  getAllGenres,
  getGenre,
  updateGenre,
  deleteGenre,
} = require('../controllers/genre');

const genreRouter = express.Router();

genreRouter.route('/').post(addGenre).get(getAllGenres);

genreRouter.route('/?').get(getAllGenres);

genreRouter.route('/:id').get(getGenre).patch(updateGenre).delete(deleteGenre);

genreRouter.route('/:id/?').get(getGenre);

module.exports = genreRouter;
