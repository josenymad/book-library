const { Book, Reader, Genre } = require('../models');

const getModel = (model) => {
  const models = {
    book: Book,
    reader: Reader,
    genre: Genre,
  };

  return models[model];
};

const get404error = (model) => {
  return { error: `The ${model} could not be found.` };
};

const removePassword = (object) => {
  if (Object.hasOwn(object.dataValues, 'password')) {
    delete object.dataValues.password;
  }

  return object;
};

exports.addItem = async (res, model, item) => {
  const Model = getModel(model);

  try {
    const newItem = await Model.create(item);

    res.status(201).json(removePassword(newItem));
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.getItem = async (res, model, itemId) => {
  const Model = getModel(model);
  const item = await Model.findByPk(itemId);

  if (item) {
    res.status(200).json(removePassword(item));
  } else {
    res.status(404).json(get404error(model));
  }
};

exports.getAllItems = async (res, model) => {
  const Model = getModel(model);
  const items = await Model.findAll();

  items.forEach((item) => {
    removePassword(item);
  });

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
    res.status(404).json(get404error(model));
  }
};

exports.deleteItem = async (res, model, itemId) => {
  const Model = getModel(model);
  const deletedRows = await Model.destroy({ where: { id: itemId } });

  if (deletedRows) {
    res.status(204).json(deletedRows);
  } else {
    res.status(404).json(get404error(model));
  }
};
