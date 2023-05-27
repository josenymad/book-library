const {
  addItem,
  getItem,
  getAllItems,
  updateItem,
  deleteItem,
} = require('./helper');

exports.addGenre = (req, res) => addItem(res, 'genre', req.body);

exports.getAllGenres = (_, res) => getAllItems(res, 'genre');

exports.getGenre = (req, res) => getItem(res, 'genre', req.params.id);

exports.updateGenre = (req, res) =>
  updateItem(res, 'genre', req.params.id, req.body);

exports.deleteGenre = (req, res) => deleteItem(res, 'genre', req.params.id);
