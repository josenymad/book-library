const { Book } = require('../models');

exports.addBook = async (req, res) => {
  const newBook = await Book.create(req.body);

  res.status(201).json(newBook);
};

exports.getAllBooks = async (_, res) => {
  const books = await Book.findAll();

  res.status(200).json(books);
};

exports.getBook = async (req, res) => {
  const bookId = req.params.id;
  const book = await Book.findByPk(bookId);

  if (book) {
    res.status(200).json(book);
  } else {
    res.status(404).json({ error: 'The book could not be found.' });
  }
};

exports.updateBook = async (req, res) => {
  const bookId = req.params.id;
  const updateData = req.body;
  const [updatedRows] = await Book.update(updateData, {
    where: { id: bookId },
  });

  if (updatedRows) {
    res.status(200).json(updatedRows);
  } else {
    res.status(404).json({ error: 'The book could not be found.' });
  }
};

exports.deleteBook = async (req, res) => {
  const bookId = req.params.id;
  const deletedRows = await Book.destroy({ where: { id: bookId } });

  if (deletedRows) {
    res.status(204).json(deletedRows);
  } else {
    res.status(404).json({ error: 'The book could not be found.' });
  }
};
