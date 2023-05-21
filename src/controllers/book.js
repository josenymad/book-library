const { Book } = require('../models');

exports.addBook = async (req, res) => {
    const newBook = await Book.create(req.body);

    res.status(201).json(newBook);
};