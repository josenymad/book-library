const { Book, Reader, Genre, Author } = require('../models');

const getModel = (model) => {
  const models = {
    book: Book,
    reader: Reader,
    genre: Genre,
    author: Author,
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

  if (Object.hasOwn(object.dataValues, 'Reader')) {
    delete object.Reader.dataValues.password;
  }

  return object;
};

exports.addItem = async (res, model, item) => {
  try {
    const Model = getModel(model);
    const newItem = await Model.create(item);

    res.status(201).json(removePassword(newItem));
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.getItem = async (
  res,
  model,
  itemId,
  firstAssociation,
  secondAssociation
) => {
  try {
    const Model = getModel(model);
    const FirstAssociation = getModel(firstAssociation);
    const SecondAssociation = getModel(secondAssociation);
    let item;

    if (firstAssociation && secondAssociation) {
      item = await Model.findByPk(itemId, {
        include: [{ model: FirstAssociation }, { model: SecondAssociation }],
      });
    }

    if (firstAssociation && !secondAssociation) {
      item = await Model.findByPk(itemId, {
        include: [{ model: FirstAssociation }],
      });
    }

    if (!firstAssociation && !secondAssociation) {
      item = await Model.findByPk(itemId);
    }

    res.status(200).json(removePassword(item));
  } catch (error) {
    res.status(404).json(get404error(model));
  }
};

exports.getAllItems = async (
  res,
  model,
  firstAssociation,
  secondAssociation
) => {
  try {
    const Model = getModel(model);
    const FirstAssociation = getModel(firstAssociation);
    const SecondAssociation = getModel(secondAssociation);
    let items;

    if (firstAssociation && secondAssociation) {
      items = await Model.findAll({
        include: [{ model: FirstAssociation }, { model: SecondAssociation }],
      });
    }

    if (firstAssociation && !secondAssociation) {
      items = await Model.findAll({ include: [{ model: FirstAssociation }] });
    }

    if (!firstAssociation && !secondAssociation) {
      items = await Model.findAll();
    }

    items.forEach((item) => {
      removePassword(item);
    });

    res.status(200).json(items);
  } catch (error) {
    res.status(404).json(get404error(model));
  }
};

exports.updateItem = async (res, model, itemId, updateData) => {
  try {
    const Model = getModel(model);
    const [updatedRows] = await Model.update(updateData, {
      where: { id: itemId },
    });

    if (updatedRows) {
      res.status(200).json(updatedRows);
    } else {
      res.status(404).json(get404error(model));
    }
  } catch (error) {
    res.status(400).json(error);
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
