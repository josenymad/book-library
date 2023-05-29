const {
  addItem,
  getItem,
  getAllItems,
  updateItem,
  deleteItem,
} = require('./helper');

exports.addAuthor = (req, res) => addItem(res, 'author', req.body);

exports.getAllAuthors = (_, res) => getAllItems(res, 'author');

exports.getAuthor = (req, res) => getItem(res, 'author', req.params.id);

exports.updateAuthor = (req, res) =>
  updateItem(res, 'author', req.params.id, req.body);

exports.deleteAuthor = (req, res) => deleteItem(res, 'author', req.params.id);
