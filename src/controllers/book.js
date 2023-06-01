const {
  addItem,
  getItem,
  getAllItems,
  updateItem,
  deleteItem,
} = require('./helper');

exports.addBook = (req, res) => addItem(res, 'book', req.body);

exports.getAllBooks = (req, res) =>
  getAllItems(res, 'book', req.query.with, req.query.also);

exports.getBook = (req, res) =>
  getItem(res, 'book', req.params.id, req.query.with, req.query.also);

exports.updateBook = (req, res) =>
  updateItem(res, 'book', req.params.id, req.body);

exports.deleteBook = (req, res) => deleteItem(res, 'book', req.params.id);
