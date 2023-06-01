const {
  addItem,
  getItem,
  getAllItems,
  updateItem,
  deleteItem,
} = require('./helper');

exports.addReader = (req, res) => addItem(res, 'reader', req.body);

exports.getAllReaders = (req, res) =>
  getAllItems(res, 'reader', req.query.with, req.query.also);

exports.getReader = (req, res) =>
  getItem(res, 'reader', req.params.id, req.query.with, req.query.also);

exports.updateReader = (req, res) =>
  updateItem(res, 'reader', req.params.id, req.body);

exports.deleteReader = (req, res) => deleteItem(res, 'reader', req.params.id);
