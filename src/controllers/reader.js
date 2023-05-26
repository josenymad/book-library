const {
  addItem,
  getItem,
  getAllItems,
  updateItem,
  deleteItem,
} = require('./helper');

exports.addReader = (req, res) => addItem(res, 'reader', req.body);

exports.getAllReaders = (_, res) => getAllItems(res, 'reader');

exports.getReader = (req, res) => getItem(res, 'reader', req.params.id);

exports.updateReader = (req, res) =>
  updateItem(res, 'reader', req.params.id, req.body);

exports.deleteReader = (req, res) => deleteItem(res, 'reader', req.params.id);
