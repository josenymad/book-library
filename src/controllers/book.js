const {
  addItem,
  getItem,
  getAllItems,
  updateItem,
  deleteItem,
} = require('./helper');

exports.addBook = (req, res) => addItem(res, 'book', req.body);

exports.getAllBooks = (_, res) => getAllItems(res, 'book');

exports.getBook = (req, res) => getItem(res, 'book', req.params.id);

exports.updateBook = (req, res) =>
  updateItem(res, 'book', req.params.id, req.body);

exports.deleteBook = (req, res) => deleteItem(res, 'book', req.params.id);
