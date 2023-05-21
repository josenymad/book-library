const { Reader } = require('../models');

exports.addReader = async (req, res) => {
  const newReader = await Reader.create(req.body);

  res.status(201).json(newReader);
};

exports.getAllReaders = async (_, res) => {
  const readers = await Reader.findAll();

  res.status(200).json(readers);
};

exports.getReader = async (req, res) => {
  const readerId = req.params.id;
  const reader = await Reader.findByPk(readerId);

  if (reader) {
    res.status(200).json(reader);
  } else {
    res.status(404).json({ error: 'The reader could not be found.' });
  }
};

exports.updateReader = async (req, res) => {
  const readerId = req.params.id;
  const updateData = req.body;
  const [updatedRows] = await Reader.update(updateData, {
    where: { id: readerId },
  });

  if (updatedRows) {
    res.status(200).json(updatedRows);
  } else {
    res.status(404).json({ error: 'The reader could not be found.' });
  }
};

exports.deleteReader = async (req, res) => {
  const readerId = req.params.id;
  const deletedRows = await Reader.destroy({ where: { id: readerId } });

  if (deletedRows) {
    res.status(204).json(deletedRows);
  } else {
    res.status(404).json({ error: 'The reader could not be found.' });
  }
};
