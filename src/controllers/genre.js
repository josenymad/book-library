const {
  addItem,
  getItem,
  getAllItems,
  updateItem,
  deleteItem,
} = require('./helper');

exports.addGenre = (req, res) => addItem(res, 'genre', req.body);

exports.getAllGenres = (req, res) =>
  getAllItems(res, 'genre', req.query.with, req.query.also);

exports.getGenre = (req, res) =>
  getItem(res, 'genre', req.params.id, req.query.with, req.query.also);

exports.updateGenre = (req, res) =>
  updateItem(res, 'genre', req.params.id, req.body);

exports.deleteGenre = (req, res) => deleteItem(res, 'genre', req.params.id);
