const { Book, Reader } = require('../models');

const getModel = (model) => {
  const models = {
    book: Book,
    reader: Reader,
  };

  return models[model];
};

exports.addItem = async (res, model, item) => {
  const Model = getModel(model);

  try {
    const newItem = await Model.create(item);

    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.getItem = async (res, model, itemId) => {
  const Model = getModel(model);
  const item = await Model.findByPk(itemId);

  if (item) {
    res.status(200).json(item);
  } else {
    res.status(404).json({ error: `The ${model} could not be found.` });
  }
};

exports.getAllItems = async (res, model) => {
  const Model = getModel(model);
  const items = await Model.findAll();

  res.status(200).json(items);
};

exports.updateItem = async (res, model, itemId, updateData) => {
  const Model = getModel(model);
  const [updatedRows] = await Model.update(updateData, {
    where: { id: itemId },
  });

  if (updatedRows) {
    res.status(200).json(updatedRows);
  } else {
    res.status(404).json({ error: `The ${model} could not be found.` });
  }
};

exports.deleteItem = async (res, model, itemId) => {
  const Model = getModel(model);
  const deletedRows = await Model.destroy({ where: { id: itemId } });

  if (deletedRows) {
    res.status(204).json(deletedRows);
  } else {
    res.status(404).json({ error: `The ${model} could not be found.` });
  }
};
