const express = require('express');
const { addBook } = require('../controllers/book');

const bookRouter = express.Router();

bookRouter.route('/').post(addBook);

module.exports = bookRouter;