module.exports = (connection, DataTypes) => {
  const schema = {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      notEmpty: true,
      validate: {
        notNull: {
          msg: 'Please enter a book title.',
        },
        notEmpty: {
          msg: 'Book title cannot be empty.',
        },
      },
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
      notEmpty: true,
      validate: {
        notNull: {
          msg: 'Please enter an author.',
        },
        notEmpty: {
          msg: 'Author name cannot be empty.',
        },
      },
    },
    genre: { type: DataTypes.STRING },
    isbn: { type: DataTypes.STRING },
  };

  const BookModel = connection.define('Book', schema);

  return BookModel;
};
