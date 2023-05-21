const express = require('express');
const {
  addBook,
  getAllBooks,
  getBook,
  updateBook,
  deleteBook,
} = require('../controllers/book');

const bookRouter = express.Router();

bookRouter.route('/').post(addBook).get(getAllBooks);

bookRouter.route('/:id').get(getBook).patch(updateBook).delete(deleteBook);

module.exports = bookRouter;
