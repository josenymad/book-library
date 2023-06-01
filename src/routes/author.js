const express = require('express');
const {
  addAuthor,
  getAllAuthors,
  getAuthor,
  updateAuthor,
  deleteAuthor,
} = require('../controllers/author');

const authorRouter = express.Router();

authorRouter.route('/').post(addAuthor).get(getAllAuthors);

authorRouter.route('/?').get(getAllAuthors);

authorRouter
  .route('/:id')
  .get(getAuthor)
  .patch(updateAuthor)
  .delete(deleteAuthor);

authorRouter.route('/:id/?').get(getAuthor);

module.exports = authorRouter;
