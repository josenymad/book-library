const {
  addItem,
  getItem,
  getAllItems,
  updateItem,
  deleteItem,
} = require('./helper');

exports.addAuthor = (req, res) => addItem(res, 'author', req.body);

exports.getAllAuthors = (req, res) =>
  getAllItems(res, 'author', req.query.with, req.query.also);

exports.getAuthor = (req, res) =>
  getItem(res, 'author', req.params.id, req.query.with, req.query.also);

exports.updateAuthor = (req, res) =>
  updateItem(res, 'author', req.params.id, req.body);

exports.deleteAuthor = (req, res) => deleteItem(res, 'author', req.params.id);
